import { test } from 'node:test';
import assert from 'node:assert/strict';
import config from '../portal.config';
import { createClient } from '../src/api/client';
import { fingerprint, validateSnapshot, digest, type Snapshot } from './snapshot';

test('snapshot rejects stale scope, host and format', () => {
  const saved: Snapshot = { version: 1, base: 'https://example.org', scope: fingerprint(config), syncedAt: new Date().toISOString(), responses: { '/': {} } };
  assert.doesNotThrow(() => validateSnapshot(saved, saved.base, config));
  assert.throws(() => validateSnapshot({ ...saved, scope: '{}' }, saved.base, config));
  assert.throws(() => validateSnapshot(saved, 'https://different.org', config));
  assert.throws(() => validateSnapshot({ ...saved, version: 2 } as unknown as Snapshot, saved.base, config));
  assert.throws(() => validateSnapshot({ ...saved, responses: {} }, saved.base, config));
  assert.equal(digest('same'), digest('same'));
  assert.notEqual(digest('same'), digest('changed'));
});
test('saved transport pages lists, deduplicates requests and retries failures without live fetch', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Upstream access forbidden'); };
  try {
    const calls: string[] = [];
    let fail = true;
    const client = createClient('https://example.org', async (url) => {
      calls.push(url);
      if (url.includes('/retry') && fail) { fail = false; throw new Error('temporary'); }
      if (url.includes('/projects')) return { data: { total: 201, rows: [{ id: new URL(url).searchParams.get('offset') }] } };
      return { data: [] };
    });
    const result = await client.allProjects('dpwh', { q: 'Catanduanes' });
    assert.equal(result.rows.length, 2);
    assert.equal(result.truncated, false);
    await client.allProjects('dpwh', { q: 'Catanduanes' });
    assert.equal(calls.length, 2);
    await assert.rejects(client.json('/retry'));
    await client.json('/retry');
    assert.equal(calls.length, 4);
    assert.match(client.href('/districts'), /^https:\/\/example.org/);
    assert.deepEqual((await client.gaaPrograms('01', 'Catanduanes')).rows, []);
  } finally { globalThis.fetch = original; }
});
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { validateArchive } from './snapshot';

test('committed archive replays every query, excluded row detail and GAA page with network forbidden', async () => {
  const saved: Snapshot = JSON.parse(readFileSync('data/bettergov/snapshot.json', 'utf8'));
  const original = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('Unexpected upstream fetch'); };
  try {
    const { scope, gaa } = await validateArchive(saved, saved.base, config);
    assert.ok(scope.projects.length > 0);
    assert.ok(gaa.rows.length > 0);
    assert.equal(new Set(scope.projects.map((p) => p.key)).size, scope.projects.length);
    for (const query of scope.queries) {
      assert.equal(query.rows.length, query.total);
      assert.equal(query.kept, query.rows.filter((p) => !query.region || p.region_key == null || p.region_key === query.region).length);
    }
    const incomplete = structuredClone(saved);
    delete incomplete.responses[Object.keys(incomplete.responses)[0]];
    await assert.rejects(validateArchive(incomplete, incomplete.base, config), /Incomplete snapshot/);
  } finally { globalThis.fetch = original; }
});
test('failed refresh exits nonzero and preserves the last successful snapshot byte for byte', () => {
  const before = readFileSync('data/bettergov/snapshot.json');
  const child = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e',
    "globalThis.fetch = async () => new Response('{}', {status: 400}); await import('./scripts/data-sync.ts');"],
    { cwd: process.cwd(), env: { ...process.env, VITE_API_BASE: 'https://failure.invalid' }, encoding: 'utf8' });
  assert.equal(child.status, 1, child.stderr);
  assert.match(child.stderr, /Non-retryable HTTP 400/);
  assert.deepEqual(readFileSync('data/bettergov/snapshot.json'), before);
});
