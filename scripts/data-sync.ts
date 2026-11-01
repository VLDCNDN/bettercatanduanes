import { mkdir, rename, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import config from '../portal.config';
import { createClient } from '../src/api/client';
import { DEFAULT_API, configProblems } from '../src/config';
import { resolveScope } from '../src/lib/scope';
import { resolveGaa } from '../src/lib/gaa';
import { fingerprint, validateArchive, type Snapshot } from './snapshot';

const base = (process.env.VITE_API_BASE || loadEnv('production', process.cwd(), 'VITE_').VITE_API_BASE || config.api || DEFAULT_API).replace(/\/+$/, '');
const responses: Record<string, unknown> = {};
let active = 0;
const queue: (() => void)[] = [];
async function download(url: string) {
  if (active >= 2) await new Promise<void>((resolve) => queue.push(resolve));
  else active++;
  try {
    for (let attempt = 0; attempt < 3; attempt++) {
      let delay = 1000 * 2 ** attempt;
      try {
        const res = await fetch(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
        if (res.ok) {
          const body = await res.json();
          if (!body || typeof body !== 'object' || !('data' in body) || !body.meta) throw new Error(`Invalid response: ${url}`);
          responses[url] = body;
          return body;
        }
        if (res.status !== 429 && res.status < 500) throw new Error(`Non-retryable HTTP ${res.status}: ${url}`);
        const retry = res.headers.get('retry-after');
        if (retry) delay = Math.max(delay, /^\d+$/.test(retry) ? Number(retry) * 1000 : Date.parse(retry) - Date.now());
        await res.body?.cancel();
        if (delay > 60000) throw new Error(`Server requests a later retry; refresh again later: ${url}`);
        if (attempt === 2) throw new Error(`HTTP ${res.status}: ${url}`);
      } catch (error) {
        if (attempt === 2 || (error instanceof Error && /Non-retryable|later retry|Invalid response/.test(error.message))) throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    throw new Error(`Download failed: ${url}`);
  } finally {
    const next = queue.shift();
    if (next) next(); else active--;
  }
}
async function main() {
  const problems = configProblems(config);
  if (problems.length) throw new Error(problems.join('\n'));
  const client = createClient(base, download);
  await client.overview();
  const scope = await resolveScope(client, config);
  for (const q of scope.queries) {
    if (q.truncated || q.rows.length !== q.total || (q.kind === 'office' && !q.total)) throw new Error(`Incomplete query: ${q.label}`);
  }
  if (scope.excluded.some((x) => !x.project)) throw new Error('Unmatched project exclusion');
  const districts = new Set(config.scope.districts ?? []);
  for (const q of scope.queries) for (const office of q.officeLens?.offices ?? []) for (const d of office.districts) districts.add(d.id);
  for (const id of districts) await client.district(id);
  const gaa = await resolveGaa(client, config);
  if (gaa.queries.some((q) => q.truncated || q.fetched !== q.matched) || gaa.excluded.some((x) => !x.row)) throw new Error('Incomplete GAA results or unmatched exclusion');
  const projects = new Map(scope.queries.flatMap((q) => q.rows.map((p) => [`${p.dataset}:${p.id}`, p] as const)));
  await Promise.all([...projects.values()].map((p) => client.project(p.dataset, p.id)));
  // Replay every browser traversal from the archive before publishing it.
  const saved = createClient(base, async (url) => {
    if (!(url in responses)) throw new Error(`Missing saved response: ${url}`);
    return responses[url];
  });
  await resolveScope(saved, config);
  await resolveGaa(saved, config);
  const snapshot: Snapshot = { version: 1, base, scope: fingerprint(config), syncedAt: new Date().toISOString(), responses };
  await validateArchive(snapshot, base, config);
  await mkdir('data/bettergov', { recursive: true });
  const path = 'data/bettergov/snapshot.json';
  await writeFile(path + '.tmp', JSON.stringify(snapshot, null, 2) + '\n');
  await rename(path + '.tmp', path);
  console.log(`Saved ${Object.keys(responses).length} responses, ${projects.size} project details. Review, build, and deploy to publish.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
