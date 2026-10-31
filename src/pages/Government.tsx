import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Landmark, MapPin } from 'lucide-react';
import { useTitle } from '../lib/use-title';
import { governmentMunicipalities, governmentSource, provincialLeaders } from '../data/government-profile';
import '../styles/government.css';

export default function Government() {
  useTitle('Government of Catanduanes · BetterCatanduanes');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return <main id="main-content" tabIndex={-1} className="page main government-page" lang="en">
    <header className="page-head">
      <p className="eyebrow">Catanduanes</p>
      <h1>Government of Catanduanes</h1>
      <p className="lede">Get to know the province, its listed officials, and the 11 municipalities of Catanduanes.</p>
    </header>

    <section id="government-officials" className="section" aria-labelledby="officials-title">
      <h2 id="officials-title" className="section-h">Listed officials</h2>
      <p className="muted">Names from the article’s infobox; not yet confirmed against an official directory.</p>
      <ul className="government-officials">
        {provincialLeaders.map(leader => <li key={leader.id}>
          <article className="government-official" aria-labelledby={`official-${leader.id}`}>
            <img src={leader.image} alt={`Portrait of ${leader.name}`} width={leader.imageWidth} height={leader.imageHeight} loading="lazy" decoding="async" />
            <div className="government-official-copy">
              <p className="label">{leader.role}</p>
              <h3 id={`official-${leader.id}`}>{leader.name}</h3>
              <p className="government-location muted"><MapPin size={14} aria-hidden="true" /> Catanduanes</p>
            </div>
          </article>
        </li>)}
      </ul>
    </section>

    <section id="government-representation" className="section" aria-labelledby="representation-title">
      <h2 id="representation-title" className="section-h">Representation</h2>
      <div className="government-representation">
        <article>
          <Landmark size={24} aria-hidden="true" />
          <p className="label">Provincial government</p>
          <h3>Sangguniang Panlalawigan</h3>
          <p>The article lists two provincial board districts: West (1st District) and East (2nd District).</p>
        </article>
        <article>
          <Landmark size={24} aria-hidden="true" />
          <p className="label">House of Representatives</p>
          <h3>Lone Legislative District of Catanduanes</h3>
          <p>One congressional district covers the whole province. This is separate from the two provincial board districts.</p>
        </article>
      </div>
    </section>

    <section id="government-municipalities" className="section" aria-labelledby="municipalities-title">
      <h2 id="municipalities-title" className="section-h">Municipalities</h2>
      <p className="muted">Choose a town to see its location and local information on the map.</p>
      <ul className="government-towns">
        {governmentMunicipalities.map(town => <li key={town.id}>
          <Link to={`/?municipality=${town.id}#map`} aria-label={`View ${town.name} on the map`}>
            <MapPin size={20} aria-hidden="true" />
            <span><strong>{town.name}</strong><small>{town.barangays} barangays{town.id === 'virac' && ' · Provincial capital'}</small></span>
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
      <p className="fine">Source: <a href={`${governmentSource.url}#Administrative_divisions`}>Wikipedia · Administrative divisions</a></p>
    </section>

    <section id="government-sources" className="government-sources" aria-labelledby="sources-title">
      <h2 id="sources-title" className="section-h">About the source</h2>
      <p>Selected information from the Catanduanes article by Wikipedia contributors. Summarized and translated for this portal.</p>
      <p className="fine"><a href={governmentSource.url}>Read the article</a> · <a href={governmentSource.revisionUrl}>Source revision</a> · <a href={governmentSource.licenseUrl}>CC BY-SA 4.0</a></p>
      <p>This is not an official directory. For current officials, contacts, and transactions, consult the provincial government.</p>
      <a className="button" href="https://provinceofcatanduanes.gov.ph/">Official provincial website <ArrowUpRight size={17} aria-hidden="true" /></a>
      <h3 className="sub-h">Photos and credits</h3>
      <ul className="government-photo-credits">
        {provincialLeaders.map(leader => <li key={leader.id}>
          <strong>{leader.name}</strong>{' · '}
          <a href={leader.imageSource} aria-label={`Photo source for ${leader.name}`}>{leader.imageCredit}</a>
        </li>)}
      </ul>
    </section>
  </main>;
}
