import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { municipalityFeatures } from '../../data/map';

interface Props {
  activeId: string;
  selectedId: string;
  onPreview: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export default function MunicipalityMap({
  activeId,
  selectedId,
  onPreview,
  onSelect,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const height = width < 360 ? 490 : 650;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setWidth(entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const areas = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [
        [22, 32],
        [width - 22, height - 28],
      ],
      municipalityFeatures
    );
    const path = geoPath(projection);
    return municipalityFeatures.features.map(feature => ({
      ...feature.properties,
      path: path(feature) ?? "",
      point: path.centroid(feature),
    }));
  }, [width, height]);

  function choose(event: MouseEvent, id: string) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    onSelect(id);
  }

  return (
    <div className="municipality-map" ref={containerRef}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ height }}
        aria-labelledby="municipality-map-title municipality-map-description"
      >
        <title id="municipality-map-title">Map of Catanduanes</title>
        <desc id="municipality-map-description">
          Select a municipality to see its population, barangay count, and officials. You can also use the names below the map.
        </desc>
        <text className="municipality-map-north" x="20" y="24">
          NORTH
        </text>
        {areas.map(area => {
          const compactName = width < 420 && area.name.startsWith('San ');
          return (
            <a
              key={area.id}
              href={`?municipality=${area.id}`}
              className={`municipality-map-area${activeId === area.id ? ' is-active' : ""}`}
              aria-label={`Select ${area.name}`}
              aria-current={selectedId === area.id ? 'location' : undefined}
              onClick={event => choose(event, area.id)}
              onFocus={() => onPreview(area.id)}
              onPointerEnter={event => {
                if (event.pointerType === 'mouse') onPreview(area.id);
              }}
            >
              <path d={area.path} />
              <text
                className="municipality-map-label"
                x={area.point[0]}
                y={area.point[1]}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: width < 420 ? 11 : 13 }}
              >
                {compactName ? (
                  <>
                    <tspan x={area.point[0]} dy="-.5em">
                      San
                    </tspan>
                    <tspan x={area.point[0]} dy="1.1em">
                      {area.name.slice(4)}
                    </tspan>
                  </>
                ) : (
                  area.name
                )}
              </text>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
