import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Printer } from 'lucide-react';

export default function Contact() {
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(leftColRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(rightColRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  return (
    <section className="section" style={{ minHeight: '85vh', paddingTop: '0' }}>
      <div className="container" style={{ marginBottom: '4rem' }}>
        <img 
          src="https://addisontherapy.com/assets/botanical-BXPGwzMW.jpg" 
          alt="Botanical art" 
          className="office-hero-photo"
          style={{ marginTop: 0, height: '40vh', objectFit: 'cover' }}
        />
      </div>
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column */}
          <div ref={leftColRef}>
            <p className="hero-eyebrow">Contact Us</p>
            <h1 style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>We're here to help.</h1>
            <p className="hero-desc" style={{ marginBottom: '3rem' }}>
              Reach out to our intake team to get matched with a clinician, or to ask any questions about our practice.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>Main Office (Addison)</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    16970 Dallas Parkway, Building 300<br/>
                    Dallas, TX 75248
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone color="var(--accent)" style={{ flexShrink: 0 }} />
                <a href="tel:2145563739" style={{ color: 'var(--text-secondary)' }}>(214) 556-3739</a>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail color="var(--accent)" style={{ flexShrink: 0 }} />
                <a href="mailto:reception@addisontherapy.com" style={{ color: 'var(--text-secondary)' }}>reception@addisontherapy.com</a>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Printer color="var(--accent)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)' }}>Fax: (214) 501-1318</span>
              </div>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div ref={rightColRef} style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Send us a message</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Name</label>
                <input type="text" className="finder-input" style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} placeholder="Jane Doe" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Email</label>
                <input type="email" className="finder-input" style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} placeholder="jane@example.com" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>How can we help?</label>
                <textarea className="finder-input" style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', minHeight: '120px', resize: 'vertical' }} placeholder="I'm looking for..."></textarea>
              </div>
              <button className="nav-cta" style={{ border: 'none', cursor: 'pointer', padding: '1rem', width: '100%' }}>Send Request</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
