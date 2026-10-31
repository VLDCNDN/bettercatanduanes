import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import logo from '../../branding/horizontal/horizontal-white.svg';

const sections = [
  { title: 'Explore', links: [['Home', '/'], ['Transparency', '/transparency'], ['Government', '/government'], ['About', '/about']] },
  { title: 'The project', links: [['About this project', '/about'], ['Hotlines', '/#hotlines']] },
  { title: 'Official sources', links: [['Provincial government', 'https://provinceofcatanduanes.gov.ph/'], ['Provincial office directory', 'https://provinceofcatanduanes.gov.ph/department-heads/'], ['BetterGov.ph', 'https://bettergov.ph/'], ['BetterLGU community', 'https://lgu.bettergov.ph/']] },
];

export default function CommunityFooter() {
  return <footer className="community-footer">
    <div className="page">
      <div className="community-footer-grid">
        <div className="community-footer-identity">
          <Link to="/" aria-label="BetterCatanduanes Home"><img src={logo} alt="BetterCatanduanes.org" width="190" height="64" /></Link>
          <p>A volunteer-run portal for Catanduanes. Find information, access government services, and stay updated with the latest news about the province.</p>
          <a href="https://github.com/VLDCNDN/bettercatanduanes" aria-label="GitHub repository" target="_blank" rel="noopener noreferrer"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.59 9.59 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg></a>
        </div>
        {sections.map(section => <div key={section.title}>
          <h2 className="label">{section.title}</h2>
          <ul>{section.links.map(([label, href]) => <li key={href}>{href.startsWith('https://')
            ? <a href={href}>{label} <ExternalLink size={12} aria-hidden="true" /></a>
            : <Link to={href}>{label}</Link>}</li>)}</ul>
        </div>)}
      </div>
      <div className="community-footer-bottom">
        <p>An independent community initiative. Not an official government website.</p>
        <span>For the people of Catanduanes.</span>
      </div>
    </div>
  </footer>;
}
