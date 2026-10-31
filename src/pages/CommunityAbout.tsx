import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTitle } from '../lib/use-title';
import '../styles/community-about.css';

export default function CommunityAbout() {
  useTitle('About · BetterCatanduanes');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return <main id="main-content" tabIndex={-1} className="page main about-page" lang="en">
    <header className="page-head about-intro">
      <p className="eyebrow">For the people of Catanduanes</p>
      <h1>About BetterCatanduanes</h1>
      <p className="lede">BetterCatanduanes is an independent civic-information portal for Catanduanes. We organize public information into accessible pages, directories, maps, and statistical views to help people better understand their province.</p>
      <p className="about-notice">This is a community initiative, not an official government website.</p>
    </header>

    <section className="about-section" aria-labelledby="inspiration-title">
      <h2 id="inspiration-title">Built on BetterGov.ph</h2>
      <div className="about-copy">
        <p>BetterCatanduanes is a community civic-information portal built on public data made available through <a href="https://bettergov.ph/">BetterGov.ph</a> and shaped by our work on the <a href="https://github.com/jmacj/better-lgu-directory">BetterLGU directory</a>.</p>
        <p>We organize that information for Catanduanes residents through directories, maps, and statistical views, while keeping sources and limitations visible.</p>
      </div>
    </section>

    <section className="about-section" aria-labelledby="role-title">
      <h2 id="role-title">Role of the portal</h2>
      <div className="about-role-copy about-copy">
        <div className="about-role">
          <h3>What we do</h3>
          <p>We organize public information, including data from BetterGov.ph, into directories, maps, and statistical views for Catanduanes residents. We link to sources, explain where the information comes from, and make gaps and limitations visible.</p>
        </div>
        <div className="about-role">
          <h3>Our limits</h3>
          <p>We operate independently and do not speak for government offices or replace their official websites. We do not create or alter official records, or present unsupported assumptions as facts.</p>
          <p>For government applications, payments, complaints, or emergencies, contact the responsible office directly. This portal does not receive or process these requests.</p>
        </div>
      </div>
    </section>

    <section className="about-section" aria-labelledby="information-title">
      <h2 id="information-title">Where the information comes from</h2>
      <div className="about-copy">
        <p>Our public budget data comes through BetterGov.ph. We organize it for Catanduanes and keep links to its sources so you can check the information yourself.</p>
        <p>Other pages link to the sources they use. Information can change or be incomplete, so check the linked source for details. For an explanation of the budget figures, visit About the data.</p>
      </div>
      <ul className="about-links">
        <li><Link to="/transparency/about-the-data">About the data</Link></li>
        <li><a href="https://provinceofcatanduanes.gov.ph/">Official Catanduanes website <ArrowUpRight size={15} aria-hidden="true" /></a></li>
      </ul>
    </section>

    <section id="take-part" className="about-section about-take-part" aria-labelledby="take-part-title">
      <h2 id="take-part-title">Take part</h2>
      <div className="about-copy">
        <p>Help improve the portal by reporting outdated information, suggesting reliable sources, improving explanations, or contributing code. When suggesting a correction, include the page link and a supporting source where possible.</p>
        <p>This channel is for website feedback and contributions.</p>
      </div>
      <a className="button" href="https://github.com/VLDCNDN/bettercatanduanes">Contribute on GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
    </section>
  </main>;
}
