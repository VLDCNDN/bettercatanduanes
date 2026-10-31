import { Music2, Sprout } from 'lucide-react';
import { cultureHighlights, historyMilestones } from '../../data/home';

const cultureIcons = { abaca: Sprout, pantomina: Music2 };

export default function HistoryCulture() {

  return (
    <section
      className="portal-section home-tint home-history"
      aria-labelledby="history-title"
    >
      <div className="page">
        <h2 id="history-title">History and culture</h2>
        <p className="history-intro">
          Explore the milestones that shaped the province and the traditions Catandunganons continue to keep alive.
        </p>
        <div className="history-culture-grid">
          <div>
            <h3 id="history-milestones-title">
              Milestones through time
            </h3>
            <ol
              className="history-timeline"
              role="list"
              aria-labelledby="history-milestones-title"
            >
              {historyMilestones.map(milestone => (
                <li key={milestone.year}>
                  <time dateTime={milestone.year}>{milestone.year}</time>
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                  <a className="history-source" href={milestone.sourceUrl}>
                    {milestone.sourceLabel}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 id="culture-highlights-title">Living heritage</h3>
            <div
              className="culture-highlights"
              role="group"
              aria-labelledby="culture-highlights-title"
            >
              {cultureHighlights.map(highlight => {
                const Icon = cultureIcons[highlight.id];
                return (
                  <article className="culture-card" key={highlight.id}>
                    <div className="culture-card-heading">
                      <Icon aria-hidden="true" focusable="false" />
                      <h4>{highlight.title}</h4>
                    </div>
                    <p className="culture-metric">
                      <strong>{highlight.metric}</strong>{' '}
                      <span>{highlight.metricLabel}</span>
                    </p>
                    <p>{highlight.description}</p>
                    <a className="history-source" href={highlight.sourceUrl}>
                      {highlight.sourceLabel}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
