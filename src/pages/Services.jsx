import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Sparkles, User, HeartHandshake, ShieldAlert, Users, BrainCircuit, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { id: 'anxiety', label: 'Anxiety & Stress', icon: Sparkles, description: 'Including panic, perfectionism, and overwhelm. Our clinicians use evidence-based approaches to help you find calm.', color: 'var(--accent)' },
  { id: 'depression', label: 'Depression & Mood', icon: User, description: 'Persistent low mood, motivation issues, and grief. We help you reconnect with meaning, energy, and hope.', color: 'var(--teal)' },
  { id: 'relationships', label: 'Relationships', icon: HeartHandshake, description: 'Couples therapy, family systems, communication, and intimacy concerns. Strengthen your connections.', color: 'var(--warm)' },
  { id: 'trauma', label: 'Trauma', icon: ShieldAlert, description: 'PTSD, complex trauma, and EMDR-informed care. Healing happens at your pace, in a space built for safety.', color: 'var(--accent-dark)' },
  { id: 'child', label: 'Child & Adolescent', icon: Users, description: 'Behavioral and emotional concerns, school challenges, and ADHD. Specialized care for young minds.', color: 'var(--teal)' },
  { id: 'neurodiversity', label: 'Neurodiversity', icon: BrainCircuit, description: 'Autism, ADHD, and identity-affirming care. We celebrate neurological differences with practical support.', color: 'var(--accent)' },
  { id: 'assessment', label: 'Assessment & Testing', icon: FileText, description: 'Psychological and psychoeducational evaluations performed by doctoral-level clinicians.', color: 'var(--warm)' },
  { id: 'transitions', label: 'Identity & Growth', icon: CheckCircle2, description: 'Personal empowerment, career changes, identity exploration, and self-esteem. Navigate change with clarity.', color: 'var(--accent-dark)' },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const items = listRef.current.querySelectorAll('.service-list-item');
    gsap.fromTo(items, 
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" }
    );
    
    gsap.fromTo(previewRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const activeService = SERVICES[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section className="section" style={{ minHeight: '85vh', paddingBottom: '4rem' }}>
      <div className="container">
        <p className="hero-eyebrow" style={{ marginBottom: '2rem' }}>Therapy Services</p>
        
        <div className="hero-grid" style={{ alignItems: 'flex-start' }}>
          
          {/* Left: Interactive List */}
          <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {SERVICES.map((s, idx) => (
              <div 
                key={s.id} 
                className={`service-list-item ${idx === activeIndex ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  borderLeft: `3px solid ${idx === activeIndex ? s.color : 'transparent'}`,
                  background: idx === activeIndex ? 'var(--bg-section-alt)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
                }}
              >
                <h2 style={{ fontSize: '2rem', margin: 0, color: idx === activeIndex ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {s.label}
                </h2>
              </div>
            ))}
          </div>

          {/* Right: Sticky Preview Pane */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <div 
              ref={previewRef}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '4rem 3rem',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '400px'
              }}
            >
              <ActiveIcon size={48} color={activeService.color} style={{ marginBottom: '2rem' }} />
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{activeService.label}</h3>
              <p style={{ fontSize: '1.15rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                {activeService.description}
              </p>
              
              <Link 
                to={`/providers?search=${encodeURIComponent(activeService.label)}`} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  color: activeService.color,
                  textDecoration: 'none',
                  fontSize: '1.05rem'
                }}
              >
                Find clinicians for {activeService.label.toLowerCase()} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
