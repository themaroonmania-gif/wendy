import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Providers() {
  const location = useLocation();
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });
  const [filtered, setFiltered] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('/data/providers.json')
      .then(r => r.json())
      .then(setProviders)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(providers);
      return;
    }
    const term = search.toLowerCase();
    setFiltered(providers.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.title?.toLowerCase().includes(term) ||
      p.issues?.some(i => i.toLowerCase().includes(term) || term.includes(i.toLowerCase())) ||
      p.ageGroups?.some(a => a.toLowerCase().includes(term) || term.includes(a.toLowerCase())) ||
      p.specialties?.some(s => s.toLowerCase().includes(term) || term.includes(s.toLowerCase()))
    ));
  }, [search, providers]);

  // Animate grid items when filtered changes
  useEffect(() => {
    if (filtered.length > 0 && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.provider-card');
      gsap.fromTo(cards, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [filtered]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
            <div>
              <p className="hero-eyebrow">Our Team</p>
              <h1 style={{ marginBottom: '1rem' }}>Meet our clinicians.</h1>
              <p className="hero-desc">
                Over 30 licensed psychologists, counselors, and associates — each bringing specialized expertise to your care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="finder-input-group" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            <Search size={20} color="var(--text-muted)" style={{marginLeft: '0.5rem'}} />
            <input
              type="text"
              className="finder-input"
              placeholder="Search by name, specialty, or concern..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search providers"
            />
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Showing {filtered.length} of {providers.length} clinicians
          </p>
          
          <div className="providers-grid" ref={gridRef}>
            {filtered.map(p => (
              <article key={p.id} className="provider-card">
                <img src={p.imageUrl} alt={p.name} className="provider-image" loading="lazy" />
                <div className="provider-info">
                  <h3 className="provider-name">{p.name}</h3>
                  <p className="provider-title">{p.title}</p>
                  {p.supervisedBy && <p className="provider-supervisor">Supervised by {p.supervisedBy}</p>}
                  <div className="tags">
                    {p.accepting && <span className="tag accepting">Accepting Clients</span>}
                    {p.telehealth && <span className="tag telehealth">Telehealth</span>}
                    {p.ageGroups?.map((ag, idx) => <span key={ag + idx} className="tag age">{ag}</span>)}
                    {p.issues?.map((issue, idx) => <span key={issue + idx} className="tag">{issue}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {filtered.length === 0 && providers.length > 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <p>No clinicians match your search. Try a broader term like "anxiety" or "teens".</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
