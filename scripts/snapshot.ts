import { createClient } from '../src/api/client';
import { resolveScope } from '../src/lib/scope';
import { resolveGaa } from '../src/lib/gaa';
import { createHash } from 'node:crypto';
import type { PortalConfig } from '../src/config';

export interface Snapshot {
  version: 1;
  base: string;
  scope: string;
  syncedAt: string;
  responses: Record<string, unknown>;
}
export const fingerprint = (config: PortalConfig) => JSON.stringify(config.scope);
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');
export function validateSnapshot(value: Snapshot, base: string, config: PortalConfig) {
  if (value.version !== 1 || value.base !== base || value.scope !== fingerprint(config) ||
      !Number.isFinite(Date.parse(value.syncedAt)) || !Object.keys(value.responses ?? {}).length) {
    throw new Error('Missing or incompatible BetterGov snapshot. Run pnpm data:sync.');
  }
}

/** Replay all runtime requests without allowing a network fallback. */
export async function validateArchive(snapshot: Snapshot, base: string, config: PortalConfig) {
  validateSnapshot(snapshot, base, config);
  const client = createClient(base, async (url) => {
    if (!(url in snapshot.responses)) throw new Error(`Incomplete snapshot: ${url}. Run pnpm data:sync.`);
    return snapshot.responses[url];
  });
  await client.overview();
  const scope = await resolveScope(client, config);
  const gaa = await resolveGaa(client, config);
  if (scope.queries.some((q) => q.truncated || q.rows.length !== q.total || (q.kind === 'office' && !q.total)) ||
      scope.excluded.some((x) => !x.project) || gaa.queries.some((q) => q.truncated || q.fetched !== q.matched) ||
      gaa.excluded.some((x) => !x.row)) throw new Error('Incomplete snapshot results. Run pnpm data:sync.');
  const districts = new Set(config.scope.districts ?? []);
  const projects = new Map(scope.queries.flatMap((q) => q.rows.map((p) => [`${p.dataset}:${p.id}`, p] as const)));
  for (const q of scope.queries) for (const office of q.officeLens?.offices ?? []) for (const d of office.districts) districts.add(d.id);
  for (const id of districts) await client.district(id);
  for (const p of projects.values()) {
    const detail = await client.project(p.dataset, p.id);
    if (detail.data.id !== p.id || detail.data.dataset !== p.dataset || !detail.data.labels) throw new Error(`Invalid project detail: ${p.id}`);
  }
  return { scope, gaa };
}
