import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import horizontalLogo from '../../branding/horizontal/horizontal-blue.svg';
const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'Government', href: '/government' },
  { label: 'About', href: '/about' },
];
export default function SiteHeader() {
  const { pathname } = useLocation();
  const menu = useRef<HTMLDetailsElement>(null);
  const today = new Date();
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  }).format(today);
  const dateValue = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(today);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };
  const links = navigation.map(({ label, href }) => {
    const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
    return <Link key={href} to={href} aria-current={active ? 'page' : undefined} onClick={closeMenu}>{label}</Link>;
  });
  return <header className="site-header">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <div className="site-utility"><div className="page utility-inner">
      <time dateTime={dateValue}>{dateLabel}</time>
      <a href="https://provinceofcatanduanes.gov.ph/" target="_blank" rel="noopener noreferrer">Official Catanduanes website <span aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a>
    </div></div>
    <div className="page header-inner">
      <Link to="/" className="site-brand" aria-label="BetterCatanduanes Home" onClick={closeMenu}>
        <img src={horizontalLogo} alt="" width="280" height="94" />
      </Link>
      <nav className="desktop-navigation" aria-label="Main navigation">{links}</nav>
      <details ref={menu} className="mobile-navigation" onKeyDown={(event) => {
        if (event.key === 'Escape') { closeMenu(); menu.current?.querySelector('summary')?.focus(); }
      }}>
        <summary><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg><span className="sr-only">Open menu</span></summary>
        <nav aria-label="Mobile navigation">{links}</nav>
      </details>
    </div>
  </header>;
}
