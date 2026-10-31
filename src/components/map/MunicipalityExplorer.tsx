import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import MunicipalityMap from './MunicipalityMap';
import {
  boundarySource,
  getMunicipality,
  googleMapsUrl,
  municipalities,
} from '../../data/map';
import '../../styles/community-map.css';

export default function MunicipalityExplorer({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? 'h1' : 'h2';
  const DetailHeading = standalone ? 'h2' : 'h3';
  const [query, setQuery] = useSearchParams();
  const selected = getMunicipality(query.get('municipality'));
  const [previewId, setPreviewId] = useState<string | null>(null);
  const preview = previewId ? getMunicipality(previewId) : selected;

  function select(id: string) {
    setPreviewId(null);
    setQuery(
      previous => {
        const next = new URLSearchParams(previous);
        next.set('municipality', id);
        return next;
      },
      { preventScrollReset: true }
    );
  }

  return (
    <section
      id="map"
      className="map-page page"
      lang="en"
      aria-labelledby="map-title"
    >
      <header className="map-page-heading">
        <div>
          <p className="section-label">Catanduanes · 11 municipalities</p>
          <Heading id="map-title">Get to know every town.</Heading>
          <p className="map-page-intro">
            People and communities close to home. Hover over or select a town to explore its information.
          </p>
        </div>
        <a
          className="button map-google-link"
          href={googleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${'Catanduanes'} on Google Maps`}
        >
          <MapPin size={17} aria-hidden="true" />
          View on Google Maps
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </header>

      <div
        className="map-explorer"
        onPointerLeave={() => setPreviewId(null)}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPreviewId(null);
          }
        }}
      >
        <MunicipalityMap
          activeId={preview.id}
          selectedId={selected.id}
          onPreview={setPreviewId}
          onSelect={select}
        />
        <aside
          className="map-municipality-detail"
          aria-label={"Municipality information"}
        >
          <p className="section-label">
            {preview.id === "virac"
              ? "Provincial capital"
              : "Municipality of Catanduanes"}
          </p>
          <DetailHeading>{preview.name}</DetailHeading>
          <div className="map-municipality-stats">
            <div>
              <span>Population</span>
              <strong>
                {preview.population.toLocaleString(
                  "en-PH"
                )}
              </strong>
              <small>1 July 2024 · POPCEN</small>
            </div>
            <div>
              <span>Barangays</span>
              <strong>{preview.barangayCount}</strong>
              <small>PSGC · 31 July 2025</small>
            </div>
          </div>
          <dl className="map-officials">
            <div>
              <dt>Mayor</dt>
              <dd>{preview.officials.mayor ?? "Not yet verified"}</dd>
            </div>
            <div>
              <dt>Vice Mayor</dt>
              <dd>{preview.officials.viceMayor ?? "Not yet verified"}</dd>
            </div>
          </dl>
          <a
            className="button button-blue map-town-google"
            href={googleMapsUrl(preview.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${preview.name} on Google Maps`}
          >
            <MapPin size={17} aria-hidden="true" />
            View on Google Maps
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <p className="map-source-line">
            {"Source:"}{' '}
            <a href={preview.psaUrl} target="_blank" rel="noopener noreferrer">
              Philippine Statistics Authority
            </a>
            {' · '}
            <a
              href={preview.officials.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {preview.officials.sourceLabel}
            </a>
          </p>
        </aside>
      </div>

      <nav
        className="map-municipality-list"
        aria-label={"Select a municipality"}
      >
        {municipalities.map(municipality => (
          <button
            key={municipality.id}
            type="button"
            aria-pressed={selected.id === municipality.id}
            onClick={() => select(municipality.id)}
          >
            {municipality.name}
          </button>
        ))}
      </nav>
      <p className="map-boundary-note">
        {"Boundaries:"}{' '}
        <a href={boundarySource.url} target="_blank" rel="noopener noreferrer">
          Philippines JSON Maps · James Faeldon
        </a>
        .{' '}
        {"Simplified map for exploration, not for determining legal boundaries."}
      </p>
      <p role="status" className="sr-only">
        {`Selected town: ${selected.name}`}
      </p>
    </section>
  );
}
