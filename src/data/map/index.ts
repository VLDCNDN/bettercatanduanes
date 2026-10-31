import { geoArea } from 'd3-geo';
import type { FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import rawMunicipalities from './municipalities.json';
import rawBoundaries from './municipal-boundaries.json';

export interface Barangay {
  psgc: string;
  name: string;
  /** Verbatim published annual date/range; null means not yet verified. */
  fiestaDate: string | null;
  fiestaSource: string | null;
  fiestaCheckedAt: string | null;
}

export interface Municipality {
  id: string;
  name: string;
  psgc: string;
  profileUrl: string;
  population: number;
  populationAsOf: string;
  psaUrl: string;
  barangayCount: number;
  barangaysAsOf: string;
  officials: {
    mayor: string | null;
    viceMayor: string | null;
    term: string;
    asOf: string;
    sourceUrl: string;
    originalSourceUrl: string;
    sourceLabel: string;
    checkedAt: string;
  };
  barangayRosterSource: string;
  barangays: Barangay[];
}

export const municipalities: Municipality[] = rawMunicipalities;

export function getMunicipality(id: string | null): Municipality {
  return (
    municipalities.find(municipality => municipality.id === id) ??
    municipalities.find(municipality => municipality.id === "virac")!
  );
}

export function googleMapsUrl(municipality?: string): string {
  const url = new URL('https://www.google.com/maps/search/');
  url.searchParams.set('api', '1');
  url.searchParams.set(
    'query',
    municipality
      ? `${municipality}, Catanduanes, Philippines`
      : 'Catanduanes, Philippines'
  );
  return url.toString();
}

export type MunicipalFeatures = FeatureCollection<
  Polygon | MultiPolygon,
  { id: string; name: string }
>;

export const municipalityFeatures = structuredClone(
  rawBoundaries
) as MunicipalFeatures;

// RFC 7946 exterior rings use the opposite winding from d3-geo's convention.
// Normalize each polygon independently so outlying islands remain small areas.
for (const feature of municipalityFeatures.features) {
  const polygons =
    feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;
  for (const polygon of polygons) {
    if (geoArea({ type: 'Polygon', coordinates: [polygon[0]] }) > 2 * Math.PI) {
      for (const ring of polygon) ring.reverse();
    }
  }
}

export const boundarySource = {
  url: rawBoundaries.sourceUrl,
  attribution: rawBoundaries.attribution,
};
