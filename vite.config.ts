import { readFileSync } from 'node:fs';
import { digest, prepareSnapshot, type Snapshot } from './scripts/snapshot';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import portal from './portal.config';
import { DEFAULT_API, shortNameOf } from './src/config';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The portal's name and description in the HTML itself, for link previews and search engines. */
function portalHtml(api: string): Plugin {
  const title = `${portal.name} · FY 2027 budget projects`;
  const description = `Every FY 2027 project for ${shortNameOf(portal)} in the NEP and the House bill (House Bill 10858), with the source page for each, and the enacted budgets 2020–2026. Data from the BetterGov.ph Budget API.`;
  const url = portal.siteUrl
    ? `<link rel="canonical" href="${escape(portal.siteUrl)}" />\n    <meta property="og:url" content="${escape(portal.siteUrl)}" />`
    : '';
  return {
    name: 'portal-html',
    transformIndexHtml: (html) =>
      html
        .replaceAll('%PORTAL_TITLE%', escape(title))
        .replaceAll('%PORTAL_NAME%', escape(portal.name))
        .replaceAll('%PORTAL_DESCRIPTION%', escape(description))
        .replaceAll('%PORTAL_API%', escape(api))
        .replaceAll('%PORTAL_URL_META%', url),
  };
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const api = (env.VITE_API_BASE || portal.api || DEFAULT_API).replace(/\/+$/, '');
  let snapshot: Snapshot;
  try { snapshot = JSON.parse(readFileSync('data/bettergov/snapshot.json', 'utf8')); }
  catch { throw new Error('Missing BetterGov snapshot. Run pnpm data:sync.'); }
  const prepared = await prepareSnapshot(snapshot, api, portal);
  const assets = new Map<string, string>();
  const responses: Record<string, string> = {};
  for (const [url, body] of Object.entries(snapshot.responses)) {
    const content = JSON.stringify(body);
    const file = `data/bettergov/${digest(content)}.json`;
    assets.set(file, content);
    responses[url] = '/' + file;
  }
  const preparedFiles: Record<string, string> = {};
  for (const [key, body] of Object.entries(prepared)) {
    const content = JSON.stringify(body);
    const file = `data/bettergov/${digest(content)}.json`;
    assets.set(file, content);
    preparedFiles[key] = '/' + file;
  }
  const savedData: Plugin = {
    name: 'bettergov-snapshot',
    generateBundle() {
      for (const [fileName, source] of assets) this.emitFile({ type: 'asset', fileName, source });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? '').split('?')[0].slice(1);
        const body = assets.get(path);
        if (body === undefined) {
          if (path.startsWith('data/bettergov/')) { res.statusCode = 404; res.end(); return; }
          next(); return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(body);
      });
    },
  };
  return {
    define: { __BETTERGOV_SNAPSHOT__: JSON.stringify({ syncedAt: snapshot.syncedAt, responses, prepared: preparedFiles }) },
    plugins: [react(), portalHtml(api), savedData],
    server: {
      host: '0.0.0.0',
      // Reserved in ~/projects/ports.md (transparency-portal). strictPort so a
      // collision fails loudly instead of moving the URL.
      port: 5132,
      strictPort: true,
      allowedHosts: ['dev.neonplayground.com'],
    },
    preview: { host: '0.0.0.0', port: 5132, strictPort: true },
  };
});
