interface SnapshotManifest { syncedAt: string; responses: Record<string, string> }
declare const __BETTERGOV_SNAPSHOT__: SnapshotManifest;
export const snapshotInfo = __BETTERGOV_SNAPSHOT__;
export async function snapshotTransport(url: string): Promise<unknown> {
  const file = snapshotInfo.responses[url];
  if (!file) throw new Error('This record is unavailable in the saved data. You can view the original record on BetterGov.');
  const response = await fetch(file);
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Saved data is unavailable. Please try again.');
  return response.json();
}
