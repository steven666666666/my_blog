import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NAV = [
  { to: '/',      label: '首页' },
  { to: '/blog',  label: '文章' },
  { to: '/tags',  label: '标签' },
  { to: '/about', label: '关于' },
];

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* ── Nav ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 'var(--nav-h)',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'var(--white)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.2s',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '0 1.25rem',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            color: 'var(--ink)',
            letterSpacing: '0.01em',
          }}>
            Blog
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }} className="desktop-nav">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                style={({ isActive }) => ({
                  padding: '0.35rem 0.75rem',
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  color: isActive ? 'var(--ink)' : 'var(--muted)',
                  background: isActive ? 'var(--subtle)' : 'transparent',
                  fontWeight: isActive ? '400' : '300',
                  transition: 'all 0.15s',
                })}>
                {label}
              </NavLink>
            ))}
            <Link to="/search" aria-label="搜索" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: '50%',
              color: 'var(--muted)', transition: 'color 0.15s',
              marginLeft: '0.25rem',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              <SearchIcon />
            </Link>
          </nav>

          {/* Mobile */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="mobile-menu-btn"
            style={{
              background: 'none', border: 'none',
              color: 'var(--ink)', fontSize: '1.3rem', lineHeight: 1,
              display: 'none',
            }}
            aria-label="菜单"
          >
            {menuOpen ? '×' : '≡'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--white)',
            padding: '0.5rem 1.25rem 1rem',
          }} className="mobile-dropdown">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block', padding: '0.65rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.95rem',
                  color: isActive ? 'var(--ink)' : 'var(--body)',
                })}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/search"
              style={{ display: 'block', padding: '0.65rem 0', fontSize: '0.95rem', color: 'var(--body)' }}>
              搜索
            </NavLink>
          </div>
        )}
      </header>

      {/* ── Page ── */}
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        <Outlet />
      </div>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 1.25rem',
        textAlign: 'center',
        fontSize: '0.825rem',
        color: 'var(--muted)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 300,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>© {new Date().getFullYear()} Blog</span>
          <span>Built with React · Deployed on Vercel</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
