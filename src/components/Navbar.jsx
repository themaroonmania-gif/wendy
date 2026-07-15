import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/providers', label: 'Our Team' },
    { to: '/fees', label: 'Fees & Insurance' },
    { to: '/locations', label: 'Locations' },
    { to: '/join', label: 'Careers' },
  ];

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src="https://addisontherapy.com/__l5e/assets-v1/3d8b6ec5-5c0b-47a6-bf07-e2af47ce003a/ata-logo.jpg" alt="Addison Therapy Associates Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <span>Addison Therapy Associates</span>
      </NavLink>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        <li>
          <a href="https://addisontherapy.com" className="nav-cta" target="_blank" rel="noopener noreferrer">
            Request a Match
          </a>
        </li>
      </ul>

      {/* Mobile Toggle Button */}
      <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        {mobileOpen ? <X size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
      </button>
    </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            {links.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li style={{ marginTop: '2rem' }}>
              <a href="https://addisontherapy.com" className="nav-cta" target="_blank" rel="noopener noreferrer" style={{ width: '100%', textAlign: 'center' }}>
                Request a Match
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
