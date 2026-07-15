import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, ChevronDown, CheckCircle2, Clock, MapPin, 
  Stethoscope, Users, HeartHandshake, BrainCircuit, 
  ShieldAlert, Sparkles, User, FileText, ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONCERNS = [
  { id: 'anxiety', label: 'Anxiety & Stress', icon: Sparkles, description: 'Including panic, perfectionism, and overwhelm. Our clinicians use evidence-based approaches to help you find calm.' },
  { id: 'depression', label: 'Depression & Mood', icon: User, description: 'Persistent low mood, motivation issues, and grief. We help you reconnect with meaning, energy, and hope.' },
  { id: 'relationships', label: 'Relationships', icon: HeartHandshake, description: 'Couples therapy, family systems, communication, and intimacy concerns. Strengthen your connections.' },
  { id: 'trauma', label: 'Trauma', icon: ShieldAlert, description: 'PTSD, complex trauma, and EMDR-informed care. Healing happens at your pace, in a space built for safety.' },
  { id: 'child', label: 'Child & Adolescent', icon: Users, description: 'Behavioral and emotional concerns, school challenges, and ADHD. Specialized care for young minds.' },
  { id: 'neurodiversity', label: 'Neurodiversity', icon: BrainCircuit, description: 'Autism, ADHD, and identity-affirming care. We celebrate neurological differences with practical support.' },
  { id: 'assessment', label: 'Assessment & Testing', icon: FileText, description: 'Psychological and psychoeducational evaluations performed by doctoral-level clinicians.' },
  { id: 'transitions', label: 'Identity & Growth', icon: CheckCircle2, description: 'Personal empowerment, career changes, identity exploration, and self-esteem. Navigate change with clarity.' },
];

export default function Home() {
  const navigate = useNavigate();
  const [finderOpen, setFinderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const heroPhotoRef = useRef(null);
  const kineticRef = useRef(null);
  const philosophyBgRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // 1. Hero Photo load reveal (clip-path)
    gsap.to(heroPhotoRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      duration: 1.4,
      ease: "power3.inOut",
      delay: 0.2
    });

    // 2. Kinetic Text Scroll Reveal
    const words = kineticRef.current.querySelectorAll('span');
    gsap.to(words, {
      scrollTrigger: {
        trigger: kineticRef.current,
        start: "top 80%",
      },
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.4)"
    });

    // 3. Card Grid Stagger
    gsap.fromTo(cardsRef.current, 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      }
    );

    // 4. Philosophy BG Reveal
    gsap.to(philosophyBgRef.current, {
      scrollTrigger: {
        trigger: philosophyBgRef.current,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 1,
      },
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSelectConcern = (c) => {
    setSearchQuery(c.label);
    setFinderOpen(false);
    // Navigate with the search query param
    setTimeout(() => {
      navigate(`/providers?search=${encodeURIComponent(c.label)}`);
    }, 500);
  };

  const filteredConcerns = CONCERNS.filter(c => 
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <p className="hero-eyebrow">Psychologist-led group practice</p>
              <h1>Compassionate, specialized mental health care.</h1>
              <p className="hero-desc" style={{ marginBottom: '2.5rem' }}>
                For children, adolescents, adults, couples, and families in Addison and across Texas.
              </p>

              {/* Concern Finder */}
              <div className="concern-finder-wrapper" style={{ padding: '1.5rem', maxWidth: '520px' }}>
                <label className="concern-finder-label">What's on your mind?</label>
                <div className="finder-input-group">
                  <Search className="finder-icon" size={20} color="var(--text-muted)" style={{marginLeft: '0.5rem'}} />
                  <input 
                    type="text" 
                    className="finder-input" 
                    placeholder="Search concerns or specialties..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setFinderOpen(true);
                    }}
                    onFocus={() => setFinderOpen(true)}
                  />
                  <button className="finder-btn" aria-label="Search">
                    <ArrowRight size={20} />
                  </button>
                  
                  {finderOpen && (
                    <div className="finder-dropdown">
                      {filteredConcerns.map(c => {
                        const Icon = c.icon;
                        return (
                          <div key={c.id} className="finder-option" onClick={() => handleSelectConcern(c)}>
                            <Icon size={16} />
                            {c.label}
                          </div>
                        );
                      })}
                      {filteredConcerns.length === 0 && (
                        <div className="finder-option" style={{ color: 'var(--text-muted)' }}>No matches found.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              {/* Office Photo */}
              <img 
                ref={heroPhotoRef}
                src="https://addisontherapy.com/__l5e/assets-v1/91133b6a-cd19-4bc9-b0df-095aac151487/ata-office-interior.jpg" 
                alt="Addison Therapy Associates Office" 
                className="office-hero-photo"
                style={{ marginTop: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[1, 2, 3].map((set) => (
            <div key={set} style={{ display: 'flex', gap: '4rem' }}>
              <div className="marquee-item"><Clock size={20} /> 1-2 Business Day Response</div>
              <div className="marquee-item"><Stethoscope size={20} /> 30+ Licensed Clinicians</div>
              <div className="marquee-item"><MapPin size={20} /> 4 DFW Locations</div>
              <div className="marquee-item"><CheckCircle2 size={20} /> Major Insurances Accepted</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Kinetic Section & Cards */}
      <section className="section bg-primary">
        <div className="container">
          <div className="kinetic-text-wrapper">
            <h2 className="kinetic-line" ref={kineticRef}>
              <span className="kinetic-word"><span>care</span></span>
              <span className="kinetic-word" style={{color: 'var(--accent)'}}><span>·</span></span>
              <span className="kinetic-word"><span>matched</span></span>
              <span className="kinetic-word" style={{color: 'var(--accent)'}}><span>·</span></span>
              <span className="kinetic-word"><span>to</span></span>
              <span className="kinetic-word"><span>you</span></span>
            </h2>
          </div>

          <div className="concern-cards-grid">
            {CONCERNS.map((c, i) => {
              const Icon = c.icon;
              return (
                <div 
                  key={c.id} 
                  className="concern-card" 
                  ref={el => cardsRef.current[i] = el}
                  onClick={() => navigate(`/providers?search=${encodeURIComponent(c.label)}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Icon className="concern-card-icon" size={32} />
                  <h3>{c.label}</h3>
                  <p>{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Practice Philosophy */}
      <section className="philosophy-section">
        <img 
          ref={philosophyBgRef}
          src="https://addisontherapy.com/__l5e/assets-v1/a0e4608f-c552-43b5-b0ee-82d78201d886/ata-office-sofa.jpg" 
          alt="Comfortable therapy office" 
          className="philosophy-bg"
        />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="philosophy-content">
            <p className="hero-eyebrow">— The Practice</p>
            <h2 style={{ marginBottom: '1.5rem' }}>A practice, <em style={{fontStyle: 'italic', fontWeight: 400}}>not a directory.</em></h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              Addison Therapy Associates is a group practice in the older sense of the word — clinicians who actually work together. We share consultation, supervision, case collaboration, and a common standard of care.
            </p>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              The result is something quietly rare: deep specialization without fragmentation. A team where the parts know each other, and the work is held collectively.
            </p>
            <Link to="/about" className="nav-cta">About Our Approach</Link>
          </div>
        </div>
      </section>

      {/* 5. Process / How It Works */}
      <section className="section bg-primary">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p className="hero-eyebrow">How It Works</p>
            <h2>Simple, thoughtful matching.</h2>
          </div>
          
          <div className="process-grid">
            <div className="process-step reveal visible">
              <div className="process-number">1</div>
              <h3>Request a Match</h3>
              <p>Tell us what you're dealing with via our secure online form or by calling our office directly.</p>
            </div>
            <div className="process-step reveal visible" style={{ transitionDelay: '100ms' }}>
              <div className="process-number">2</div>
              <h3>Connect with Intake</h3>
              <p>Our intake team reviews your request within 1-2 business days to find the right clinical fit.</p>
            </div>
            <div className="process-step reveal visible" style={{ transitionDelay: '200ms' }}>
              <div className="process-number">3</div>
              <h3>Begin Therapy</h3>
              <p>Schedule your first session, complete paperwork online, and begin your work with a trusted clinician.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Band (Lemonade Style) */}
      <section className="cta-band">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Request a therapist match and our intake team will respond within 1–2 business days.</p>
          <a href="https://addisontherapy.com" className="cta-btn-large" target="_blank" rel="noopener noreferrer">
            Request a Match
          </a>
        </div>
      </section>
    </>
  );
}
