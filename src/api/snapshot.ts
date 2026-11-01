import type { PreparedPortal, PreparedGaa } from './prepared';
interface SnapshotManifest { syncedAt: string; prepared: { portal: string; gaa: string }; responses: Record<string, string> }
declare const __BETTERGOV_SNAPSHOT__: SnapshotManifest;
export const snapshotInfo = __BETTERGOV_SNAPSHOT__;
export async function snapshotTransport(url: string): Promise<unknown> {
  const file = snapshotInfo.responses[url];
  if (!file) throw new Error('This record is unavailable in the saved data. You can view the original record on BetterGov.');
  return readJson(file);
}
async function readJson(file: string): Promise<unknown> {
  const response = await fetch(file);
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Saved data is unavailable. Please try again.');
  return response.json();
}

// Share requests across components; failed loads can be retried.
let portal: Promise<PreparedPortal> | undefined;
let gaa: Promise<PreparedGaa> | undefined;
export function loadPreparedPortal(): Promise<PreparedPortal> {
  if (!portal) {
    portal = readJson(snapshotInfo.prepared.portal) as Promise<PreparedPortal>;
    portal.catch(() => { portal = undefined; });
  }
  return portal;
}
export function loadPreparedGaa(): Promise<PreparedGaa> {
  if (!gaa) {
    gaa = readJson(snapshotInfo.prepared.gaa) as Promise<PreparedGaa>;
    gaa.catch(() => { gaa = undefined; });
  }
  return gaa;
}
