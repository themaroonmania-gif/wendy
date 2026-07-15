import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, CheckCircle2, Navigation, Users } from 'lucide-react';

export default function JoinTeam() {
  const contentRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    // Reveal photo on load
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        duration: 1.4,
        ease: "power3.inOut",
        delay: 0.1
      });
    }

    gsap.fromTo(contentRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '900px' }}>
            <div>
              <p className="hero-eyebrow">Careers at ATA</p>
              <h1>Thoughtful clinicians deserve thoughtful support.</h1>
              <p className="hero-desc">
                We are a collaborative group practice built around the belief that meaningful clinical work happens when clinicians feel supported, respected, and empowered to practice authentically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <img 
            ref={photoRef}
            src="https://addisontherapy.com/assets/office-CpyIgP0_.jpg" 
            alt="A calm therapy office with two upholstered chairs" 
            className="office-hero-photo"
            style={{ marginTop: 0, height: '60vh' }}
          />
        </div>
      </section>

      <section className="section bg-primary" style={{ paddingTop: '2rem' }}>
        <div className="container" ref={contentRef}>
          
          <div className="hero-grid" style={{ marginBottom: '4rem', alignItems: 'stretch' }}>
            <div style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Independence without isolation.</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                ATA sits in the middle of two extremes. Not a solo practice where clinicians feel isolated. Not a large corporate practice where clinicians feel like a number.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                We intentionally built a practice that combines professional autonomy with meaningful clinical support. You control your schedule, while we provide the infrastructure and collegial support.
              </p>
            </div>

            <div style={{ background: 'var(--bg-section-alt)', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-dark)' }}>What makes ATA different</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'You control your schedule and caseload',
                  'Consistent referrals and administrative support',
                  'Consultation with experienced colleagues',
                  'Opportunities to develop specialty areas',
                  '1099 contractor structure for true autonomy'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 color="var(--accent)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>How to join us</h2>
            <div className="concern-cards-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="concern-card" style={{ textAlign: 'center' }}>
                <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>01</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Send CV</h3>
                <p style={{ fontSize: '0.9rem' }}>Email your CV, licensure, and location preference.</p>
              </div>
              <div className="concern-card" style={{ textAlign: 'center' }}>
                <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>02</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Initial call</h3>
                <p style={{ fontSize: '0.9rem' }}>A first conversation with our leadership to assess fit.</p>
              </div>
              <div className="concern-card" style={{ textAlign: 'center' }}>
                <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>03</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Deep dive</h3>
                <p style={{ fontSize: '0.9rem' }}>Discussing caseload, interests, and contractor details.</p>
              </div>
              <div className="concern-card" style={{ textAlign: 'center' }}>
                <span className="hero-eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>04</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Meet the team</h3>
                <p style={{ fontSize: '0.9rem' }}>See the space and meet colleagues before deciding.</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--accent)', color: '#fff', borderRadius: 'var(--radius-lg)' }}>
            <Mail size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.8 }} />
            <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Interested in learning more?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'rgba(255,255,255,0.85)' }}>
              We welcome inquiries from psychologists, LPCs, LCSWs, LMFTs, and associates. Email us your CV to start a conversation.
            </p>
            <a href="mailto:wbates@addisontherapy.com" className="nav-cta" style={{ background: '#fff', color: 'var(--accent)' }}>
              Email Dr. Bates
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
