import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, Building2, Info } from 'lucide-react';
import { categories, filterDirectory, sources, type Office, type Service } from '../data/services';
import { governmentMunicipalities } from '../data/government-profile';
import SourceLink from '../components/services/SourceLink';
import { useTitle } from '../lib/use-title';

export default function Services() {
  useTitle('Services · BetterCatanduanes');
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = categories.some(c => c.id === params.get('category')) ? params.get('category')! : '';
  const municipality = governmentMunicipalities.find(town => town.id === params.get('municipality'));
  const view = ['guides', 'offices'].includes(params.get('view') ?? '') ? params.get('view')! : 'all';
  const filtered = filterDirectory({ query, category, view });
  const guides = filtered.filter((entry): entry is Service => entry.kind === 'guide');
  const contacts = filtered.filter((entry): entry is Office => entry.kind === 'office');
  const baseEntries = filterDirectory({ query, category });
  const guideCount = baseEntries.filter(entry => entry.kind === 'guide').length;
  const officeCount = baseEntries.length - guideCount;
  const selectedCategory = categories.find(item => item.id === category);

  function changeFilter(key: string, value: string, replace = false) {
    setParams(current => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace, preventScrollReset: true });
  }

  const detailSearch = params.size ? `?${params.toString()}` : '';

  return <main id="main-content" tabIndex={-1} className="page main services-page" lang="en">
    <header className="page-head services-heading">
      <h1>Services & information</h1>
      <p className="lede">Find the right office, understand a public service, and read the official source behind it.</p>
      <p className="services-intro-note">Starting with provincial services and published office contacts. Municipal guides will be added as official information becomes available.</p>
    </header>

    <div className="services-controls" role="search" aria-label="Find public services">
      <div className="services-search-field">
        <label htmlFor="services-search">Find a service or office</label>
        <div className="services-search-input"><Search size={19} aria-hidden="true" />
          <input id="services-search" type="search" value={query} placeholder="Try professional tax, hospital, or PESO" onChange={event => changeFilter('q', event.target.value, true)} />
        </div>
      </div>
      <div>
        <label htmlFor="services-municipality">Municipality</label>
        <select id="services-municipality" value={municipality?.id ?? ''} onChange={event => changeFilter('municipality', event.target.value)}>
          <option value="">All municipalities</option>
          {governmentMunicipalities.map(town => <option key={town.id} value={town.id}>{town.name}</option>)}
        </select>
      </div>
    </div>

    {municipality && <p className="services-coverage" role="status"><Info size={18} aria-hidden="true" /><span>Municipality-specific guides for {municipality.name} are not yet available here. Showing published provincial information; check each service’s eligibility with the office.</span></p>}

    <div className="services-layout">
      <aside className="services-sidebar" aria-label="Service categories">
        <h2>Browse by category</h2>
        <div className="services-mobile-category">
          <label htmlFor="services-category" className="sr-only">Category</label>
          <select id="services-category" value={category} onChange={event => changeFilter('category', event.target.value)}>
            <option value="">All categories</option>
            {categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
        <div className="services-category-list">
          <button type="button" aria-pressed={!category} onClick={() => changeFilter('category', '')}>All categories</button>
          {categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => changeFilter('category', item.id)}>{item.name}</button>)}
        </div>
        <div className="services-sidebar-source">
          <BookOpen size={20} aria-hidden="true" />
          <h3>Always a source</h3>
          <p>Every entry links to an official publication. Its year and any information needing confirmation stay visible.</p>
          <SourceLink href={sources.treasurer.landingUrl}>Provincial Citizen’s Charter</SourceLink>
        </div>
      </aside>

      <div className="services-results">
        {selectedCategory && <div className="services-category-heading"><h2>{selectedCategory.name}</h2><p>{selectedCategory.description}</p></div>}
        <div className="services-views" role="group" aria-label="Information type">
          {[
            { id: 'all', label: 'All information', count: baseEntries.length },
            { id: 'guides', label: 'Service guides', count: guideCount },
            { id: 'offices', label: 'Offices & hospitals', count: officeCount },
          ].map(item => <button key={item.id} type="button" aria-pressed={view === item.id} onClick={() => changeFilter('view', item.id === 'all' ? '' : item.id)}>{item.label}<span>{item.count}</span></button>)}
        </div>
        <div className="services-result-summary">
          <p role="status">{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}{query.trim() && <> matching “{query.trim()}”</>}</p>
          {(query || category || municipality || view !== 'all') && <button type="button" onClick={() => setParams({}, { preventScrollReset: true })}>Clear filters</button>}
        </div>

        {guides.length > 0 && <section className="services-guides" aria-labelledby="service-guides-title">
          <div className="services-section-heading"><BookOpen size={19} aria-hidden="true" /><h2 id="service-guides-title">Service guides</h2></div>
          <p className="services-section-note">Summaries of the 2024 provincial Treasurer’s charter. Confirm current requirements, fees, and processing times with the office.</p>
          <ul className="services-guide-list">
            {guides.map(service => <li key={service.id}>
              <article>
                <p className="services-entry-type">Provincial Treasurer’s Office</p>
                <h3><Link to={`/services/${service.id}${detailSearch}`}>{service.title}<ArrowRight size={18} aria-hidden="true" /></Link></h3>
                <p>{service.description}</p>
                <div className="services-entry-source"><SourceLink href={service.sourceUrl} /><span>2024 charter · {service.pages.includes('–') ? 'pages' : 'page'} {service.pages}</span><span className="services-review-label">Current details need confirmation</span></div>
              </article>
            </li>)}
          </ul>
        </section>}

        {contacts.length > 0 && <section className="services-office-section" aria-labelledby="office-contacts-title">
          <div className="services-section-heading"><Building2 size={19} aria-hidden="true" /><h2 id="office-contacts-title">Offices & hospitals</h2></div>
          <p className="services-section-note">Contacts published in the province’s 2025 directory, recorded on 3 November 2026. These are office listings; hours, service eligibility, and emergency response availability have not been confirmed.</p>
          <ul className="services-office-list">
            {contacts.map(office => <li key={office.id}>
              <article aria-labelledby={`contact-${office.id}`}>
                <h3 id={`contact-${office.id}`}>{office.title}</h3>
                <dl className="services-contact-data">
                  <div><dt>Phone</dt><dd>{office.phone ?? 'Not listed in the source'}</dd></div>
                  <div><dt>Email</dt><dd>{office.email ?? 'Not listed in the source'}</dd></div>
                </dl>
                {office.note && <p className="services-contact-note"><Info size={15} aria-hidden="true" /><span>{office.note}</span></p>}
                <div className="services-entry-source"><SourceLink href={sources.offices.url} /><span>2025 directory · listing page {office.page}</span>{office.noteSource && <SourceLink href={office.noteSource.url}>{office.noteSource.label}</SourceLink>}</div>
              </article>
            </li>)}
          </ul>
        </section>}

        {filtered.length === 0 && <section className="services-empty" aria-labelledby="services-empty-title">
          <BookOpen size={28} aria-hidden="true" />
          <h2 id="services-empty-title">No published entries for this selection</h2>
          <p>{query.trim() ? 'Try another search or change the filters.' : 'We are still collecting official information for this category.'} A missing guide does not mean the service is unavailable.</p>
          {view === 'guides' && officeCount > 0 && <button type="button" className="button" onClick={() => changeFilter('view', 'offices')}>See {officeCount} published office {officeCount === 1 ? 'contact' : 'contacts'}</button>}
          <SourceLink href={sources.offices.url}>Browse the official provincial directory</SourceLink>
        </section>}

        <aside className="services-about-sources">
          <h2>About this information</h2>
          <p>This is an independent guide to official publications. A source’s year describes the document, not a new verification by the office. We have not confirmed current fees, opening hours, or application availability.</p>
          <p>Provincial information is shown across municipalities. Municipal and barangay procedures may differ. The responsible government office handles all transactions.</p>
          <div className="services-source-references"><SourceLink href={sources.treasurer.landingUrl}>Provincial Citizen’s Charter</SourceLink><SourceLink href={sources.offices.url}>Provincial office directory</SourceLink></div>
        </aside>
      </div>
    </div>
  </main>;
}
