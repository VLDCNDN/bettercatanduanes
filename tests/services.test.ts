import assert from 'node:assert/strict';
import test from 'node:test';
import { categories, offices, services, filterDirectory, sources } from '../src/data/services.ts';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Services from '../src/pages/Services.tsx';
import ServiceDetail from '../src/pages/ServiceDetail.tsx';

function renderPage(path: string) {
  return renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] },
    createElement(Routes, null,
      createElement(Route, { path: '/services', element: createElement(Services) }),
      createElement(Route, { path: '/services/:id', element: createElement(ServiceDetail) }),
    )));
}

test('directory exposes sources and honest town coverage even when a category has no guide', () => {
  const html = renderPage('/services?category=health&municipality=bato');
  assert.match(html, /Bato Maternity/);
  assert.match(html, /2025 directory/);
  assert.match(html, /Official source/);
  assert.match(html, /Municipality-specific guides for Bato/);
  assert.match(html, /department-heads\//);
  assert.doesNotMatch(html, /href="tel:/);
  const empty = renderPage('/services?category=civil-registry');
  assert.match(empty, /No published entries/);
  assert.match(empty, /not mean the service is unavailable/);
});

test('detail routes retain historical provenance and handle unknown service IDs', () => {
  const html = renderPage('/services/professional-tax?category=property-tax');
  assert.match(html, /2024, first edition/);
  assert.match(html, /#page=14/);
  assert.match(html, /Requirements in the 2024 charter/);
  assert.match(html, /Confirm with the office/);
  assert.doesNotMatch(html, /does not include obtaining prerequisite documents/);
  assert.doesNotMatch(html, /Verified current/);
  assert.match(renderPage('/services/unknown-service'), /Service guide not found/);
});

test('contact discrepancies link to both official publications being compared', () => {
  const html = renderPage('/services?category=emergency&view=offices');
  assert.match(html, /href="https:\/\/provinceofcatanduanes\.gov\.ph\/"/);
  assert.match(html, /department-heads\//);
  assert.match(html, /Homepage contact listing/);
  assert.ok(offices.find(office => office.id === 'governor')!.noteSource);
});

test('published catalog keeps source editions and exact document pages', () => {
  assert.equal(categories.length, 8);
  assert.equal(services.length, 9);
  assert.equal(offices.length, 41);
  assert.equal(sources.treasurer.edition, '2024, first edition');
  assert.equal(sources.offices.edition, '2025 directory');
  assert.equal(sources.treasurer.recordedAt, '2026-11-03');
  assert.equal(new Set([...services, ...offices].map(entry => entry.id)).size, 50);
  for (const service of services) {
    assert.match(service.sourceUrl, /^https:\/\/provinceofcatanduanes\.gov\.ph\/.*\.pdf#page=\d+$/);
    assert.ok(service.requirements.length);
    assert.ok(service.eligibility);
  }
  assert.match(services.find(s => s.id === 'professional-tax')!.sourceUrl, /#page=14$/);
  assert.match(services.find(s => s.id === 'property-transfer-tax')!.sourceUrl, /#page=15$/);
});

test('search finds resident terms and office contacts without ignoring category/type filters', () => {
  assert.deepEqual(filterDirectory({ query: '  professional TAX ', view: 'guides' }).map(s => s.id), ['professional-tax']);
  assert.deepEqual(filterDirectory({ query: 'PESO', category: 'education-employment', view: 'offices' }).map(s => s.id), ['provincial-peso']);
  assert.equal(filterDirectory({ query: 'professional', category: 'health', view: 'guides' }).length, 0);
  assert.equal(filterDirectory({ query: 'no such office' }).length, 0);
});

test('province-level entries stay visible for every municipality without inventing local guides', () => {
  assert.equal(filterDirectory({ municipality: 'bato', view: 'guides' }).length, 9);
  assert.equal(filterDirectory({ municipality: 'virac', view: 'guides' }).length, 9);
  assert.equal(filterDirectory({ municipality: 'pandan', view: 'offices' }).length, 41);
  assert.equal(filterDirectory({ category: 'civil-registry' }).length, 0);
  assert.equal(filterDirectory({ category: 'invalid-category', view: 'guides' }).length, 9);
});

test('questionable published contacts are preserved and flagged, not silently repaired', () => {
  const agriculture = offices.find(o => o.id === 'provincial-agriculture')!;
  assert.equal(agriculture.email, 'opag2_catanduanesyahoo.com');
  assert.ok(agriculture.note);
  for (const id of ['provincial-health', 'provincial-general-services', 'provincial-assessor', 'provincial-tourism', 'provincial-pdrrmo', 'governor']) {
    assert.ok(offices.find(o => o.id === id)!.note, id);
  }
  assert.equal(offices.find(o => o.id === 'provincial-accounting')!.phone, undefined);
});
