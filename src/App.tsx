import CommunityHome from './pages/CommunityHome';
import CommunityAbout from './pages/CommunityAbout';
import CommunityFooter from './components/CommunityFooter';
import { useEffect, useRef } from 'react';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Masthead } from './components/Chrome';
import SiteHeader from './components/SiteHeader';
import ScrollToTop from './components/ScrollToTop';
import { configProblems } from './config';
import { usePortal } from './lib/portal-context';
import About from './pages/About';
import Home from './pages/Home';
import Project from './pages/Project';
import Enacted from './pages/Enacted';
import Government from './pages/Government';

function CommunityLayout() {
  return <><Outlet /><CommunityFooter /></>;
}

function TransparencyLayout() {
  const { config } = usePortal();
  const problems = import.meta.env.DEV ? configProblems(config) : [];
  return <>
    {problems.length > 0 && <div className="page config-warning" role="alert">
      <strong>portal.config.ts needs attention</strong> (shown in development only):
      <ul>{problems.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>}
    <Outlet />
    <Footer />
  </>;
}

function LegacyRedirect({ offices = false }: { offices?: boolean }) {
  const { pathname, search, hash } = useLocation();
  return <Navigate replace to={{ pathname: offices ? '/transparency' : `/transparency${pathname}`, search, hash: hash || (offices ? '#offices' : '') }} />;
}

export default function App() {
  const { pathname } = useLocation();
  const header = useRef<HTMLDivElement>(null);
  const transparency = pathname === '/transparency' || pathname.startsWith('/transparency/');
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const updateHeight = () => document.documentElement.style.setProperty('--sticky-header-height', `${element.getBoundingClientRect().height}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--sticky-header-height');
    };
  }, []);
  return <>
    <ScrollToTop />
    <div ref={header} className="sticky-header">
      <SiteHeader />
      {transparency && <Masthead />}
    </div>
    <Routes>
      <Route element={<CommunityLayout />}>
      <Route path="/" element={<CommunityHome />} />
      <Route path="/government" element={<Government />} />
      <Route path="/about" element={<CommunityAbout />} />
      </Route>
      <Route path="/transparency" element={<TransparencyLayout />}>
        <Route index element={<Home />} />
        <Route path="gaa" element={<Enacted />} />
        <Route path="about-the-data" element={<About />} />
        <Route path="projects/:dataset/:id" element={<Project />} />
      </Route>
      <Route path="/districts" element={<LegacyRedirect offices />} />
      <Route path="/gaa" element={<LegacyRedirect />} />
      <Route path="/projects/:dataset/:id" element={<LegacyRedirect />} />
      <Route path="*" element={<main id="main-content" tabIndex={-1} className="page main">
        <p className="state">This page does not exist. <Link to="/transparency">See every project</Link></p>
      </main>} />
    </Routes>
  </>;
}
