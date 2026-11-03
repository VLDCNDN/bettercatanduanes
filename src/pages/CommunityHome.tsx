import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTitle } from '../lib/use-title';
import {
  Siren,
  ShieldCheck,
  Flame,
  Anchor,
  HeartPulse,
  Shield,
  CloudSun,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Hero from '../components/community/Hero';
import MunicipalityExplorer from '../components/map/MunicipalityExplorer';
import HistoryCulture from '../components/community/HistoryCulture';
import {
  homeSources,
  hotlines,
  hotlineRecordedAt,
} from '../data/home';
import '../styles/community.css';

const hotlineIcons = {
  pdrrmo: Siren,
  pnp: ShieldCheck,
  bfp: Flame,
  'coast-guard': Anchor,
  'red-cross': HeartPulse,
  army: Shield,
  pagasa: CloudSun,
} satisfies Record<(typeof hotlines)[number]['id'], LucideIcon>;

export default function CommunityHome() {
  useTitle('Welcome to BetterCatanduanes.org');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  return (
    <main id="main-content" tabIndex={-1} className="home-page portal-home" lang="en">
      <Hero />
      <section className="page" aria-labelledby="home-services-title">
        <div className="home-services-link">
          <div><h2 id="home-services-title">Find a public service</h2><p>Browse provincial guides and office contacts, with links to their official sources.</p></div>
          <Link to="/services">Explore services <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <MunicipalityExplorer />
      <HistoryCulture />
      <section
        id="hotlines"
        tabIndex={-1}
        className="portal-section"
        aria-labelledby="hotlines-title"
      >
        <div className="page">
          <h2 id="hotlines-title">Catanduanes hotlines</h2>
          <ul className="hotline-list">
            {hotlines.map(item => {
              const Icon = hotlineIcons[item.id];
              return (
                <li key={item.id}>
                  <span className="hotline-icon" aria-hidden="true">
                    <Icon focusable="false" />
                  </span>
                  <div className="hotline-office">
                    <h3>{item.office}</h3>
                    <p>{item.description}</p>
                  </div>
                  <a className="hotline-number" href={item.tel}>
                    <span className="sr-only">{item.office}: </span>
                    {item.phone}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="home-source">
            {"Sources"}:{' '}
            <a href={homeSources.hotlines}>
              Provincial Government of Catanduanes
            </a>
            {' · '}
            {"List recorded"}:{' '}
            <time dateTime={hotlineRecordedAt}>{hotlineRecordedAt}</time>
          </p>
        </div>
      </section>
    </main>
  );
}
