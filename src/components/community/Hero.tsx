import { UsersRound, Landmark, House, MapPin, type LucideIcon } from 'lucide-react';
import { homeSources, provinceFacts } from '../../data/home';

const factIcons = {
  Population: UsersRound,
  'Number of municipalities': Landmark,
  'Number of barangays': House,
  Capital: MapPin,
} satisfies Record<(typeof provinceFacts)[number]['label'], LucideIcon>;

export default function Hero() {
  return (
    <section className="portal-hero" aria-labelledby="portal-title">
      <div className="page">
        <h1 id="portal-title">
          <span>Better</span>{' '}
          <span>Catanduanes</span>
        </h1>
        <p className="portal-hero-intro">
          Local information, government services, and public spending in one place.
          {' '}Built by volunteers for the people of Catanduanes.
        </p>
        <div className="hero-glance">
          <dl className="province-facts">
            {provinceFacts.map(fact => {
              const Icon = factIcons[fact.label];
              return (
                <div key={fact.label}>
                  <dt>
                    <Icon className="fact-icon" aria-hidden="true" focusable="false" />
                    <span>{fact.label}</span>
                  </dt>
                  <dd>{fact.value}</dd>
                  <dd className="fact-reference">
                    {fact.label === 'Population' ? (
                      <>1 July 2024 · <a href={homeSources.population}>2024 POPCEN</a></>
                    ) : (
                      <a href={homeSources.psgc}>{fact.reference}</a>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
