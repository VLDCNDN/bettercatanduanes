import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Info } from 'lucide-react';
import { categories, offices, services, sources } from '../data/services';
import { useTitle } from '../lib/use-title';
import SourceLink from '../components/services/SourceLink';

export default function ServiceDetail() {
  const { id } = useParams();
  const { search } = useLocation();
  const service = services.find(entry => entry.id === id);
  useTitle(`${service?.title ?? 'Service guide not found'} · BetterCatanduanes`);
  const backUrl = `/services${search}`;
  if (!service) return <main id="main-content" tabIndex={-1} className="page main services-page">
    <header className="page-head"><h1>Service guide not found</h1><p className="lede">This guide is not in our published collection.</p></header>
    <Link to={backUrl}>Browse services and office contacts</Link>
  </main>;
  const office = offices.find(entry => entry.id === service.officeId);
  const category = categories.find(entry => entry.id === service.categoryIds[0]);

  return <main id="main-content" tabIndex={-1} className="page main services-page service-detail" lang="en">
    <Link to={backUrl} className="services-back"><ArrowLeft size={17} aria-hidden="true" />Back to services</Link>
    <header className="page-head"><p className="services-entry-type">{category?.name}</p><h1>{service.title}</h1><p className="lede">{service.description}</p></header>
    <div className="service-detail-layout">
      <article className="service-detail-content">
        <p className="services-coverage"><Info size={19} aria-hidden="true" /><span>This guide summarizes a <strong>2024 publication</strong>. Confirm current requirements, charges, and processing arrangements before transacting.</span></p>
        <section aria-labelledby="service-eligibility-title"><h2 id="service-eligibility-title">Who this is for</h2><p>{service.eligibility}</p><SourceLink href={service.sourceUrl}>Eligibility in the official charter</SourceLink></section>
        <section aria-labelledby="service-requirements-title"><h2 id="service-requirements-title">Requirements in the 2024 charter</h2><ul>{service.requirements.map(requirement => <li key={requirement}>{requirement}</li>)}</ul><SourceLink href={service.sourceUrl}>Read the official requirements</SourceLink></section>
        <section aria-labelledby="service-steps-title"><h2 id="service-steps-title">Steps in the published procedure</h2><ol className="service-steps">{service.steps.map(step => <li key={step}>{step}</li>)}</ol><SourceLink href={service.sourceUrl}>Read the official procedure</SourceLink></section>
        <section aria-labelledby="service-fees-title"><h2 id="service-fees-title">Fees & processing time</h2><p><strong>Confirm with the office.</strong> The 2024 charter includes published charges and processing durations. We have not confirmed whether they still apply. Ask whether obtaining prerequisite documents, waiting, or approvals by other offices add time.</p><SourceLink href={service.sourceUrl}>See the published fees and timing</SourceLink></section>
        <section aria-labelledby="service-office-title"><h2 id="service-office-title">Office to contact</h2><h3>Provincial Treasurer’s Office</h3>{office && <dl className="services-contact-data"><div><dt>Published phone</dt><dd>{office.phone}</dd></div><div><dt>Published email</dt><dd>{office.email}</dd></div></dl>}<p className="services-section-note">From the 2025 directory. Confirm the location, opening hours, and accepted payment methods directly with the office.</p><SourceLink href={sources.offices.url}>Official office directory · 2025</SourceLink></section>
      </article>
      <aside className="service-source-panel" aria-labelledby="service-source-title">
        <BookOpen size={23} aria-hidden="true" /><h2 id="service-source-title">Official source</h2>
        <p>{sources.treasurer.publisher}</p>
        <SourceLink href={service.sourceUrl}>{sources.treasurer.title}</SourceLink>
        <dl><div><dt>Document edition</dt><dd>{sources.treasurer.edition}</dd></div><div><dt>Source {service.pages.includes('–') ? 'pages' : 'page'}</dt><dd>{service.pages}</dd></div><div><dt>Source recorded</dt><dd><time dateTime={sources.treasurer.recordedAt}>3 November 2026</time></dd></div><div><dt>Current details</dt><dd>Not yet confirmed with the office</dd></div></dl>
        <SourceLink href={sources.treasurer.landingUrl}>Find this document on the official site</SourceLink>
        <p className="service-source-disclaimer">BetterCatanduanes summarizes the publication. The government office provides the service.</p>
      </aside>
    </div>
  </main>;
}
