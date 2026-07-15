import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const CONCERNS = [
  'Anxiety & Stress',
  'Depression & Mood',
  'Relationships',
  'Trauma & PTSD',
  'Child & Adolescent',
  'Neurodiversity (ADHD/Autism)',
  'Assessment & Testing',
  'Identity & Growth'
];

const THERAPISTS = [
  {
    id: 1,
    name: 'Dr. Wendy Bates',
    title: 'Licensed Psychologist & Practice Owner',
    image: '/wendy_bates.jpg',
    specialties: ['Anxiety & Stress', 'Relationships', 'Identity & Growth', 'Assessment & Testing'],
    desc: 'Expertise in collaborative care, complex assessment, and deep exploratory work.'
  },
  {
    id: 2,
    name: 'Dr. James Harrison',
    title: 'Clinical Psychologist',
    image: '/james_harrison.jpg',
    specialties: ['Trauma & PTSD', 'Depression & Mood', 'Anxiety & Stress'],
    desc: 'Specializes in EMDR-informed care and somatic approaches to trauma.'
  },
  {
    id: 3,
    name: 'Sarah Jenkins, LPC',
    title: 'Licensed Professional Counselor',
    image: '/sarah_jenkins.jpg',
    specialties: ['Child & Adolescent', 'Neurodiversity (ADHD/Autism)', 'Relationships'],
    desc: 'Passionate about neurodiversity-affirming care and family systems.'
  }
];

function App() {
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleConcern = (concern) => {
    setSelectedConcerns(prev => 
      prev.includes(concern) 
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  const matchedTherapists = useMemo(() => {
    if (selectedConcerns.length === 0) return THERAPISTS;

    return THERAPISTS.map(therapist => {
      const matchCount = therapist.specialties.filter(s => selectedConcerns.includes(s)).length;
      return {
        ...therapist,
        matchCount,
        matchPercentage: Math.round((matchCount / selectedConcerns.length) * 100)
      };
    })
    .filter(t => t.matchCount > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [selectedConcerns]);

  if (!mounted) return null;

  return (
    <div className="container">
      <header className="header">
        <div className="logo">Addison Therapy Associates</div>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Services</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Our Team</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Contact</span>
        </div>
      </header>

      <main className="main-layout">
        <div className="hero-content">
          <h1 className="hero-title">
            Therapy should begin with <i>understanding</i>.
          </h1>
          <p className="hero-subtitle">
            Skip the directory scrolling. Select the areas where you're seeking support, and we'll instantly match you with the clinicians in our practice best suited to guide you.
          </p>
          
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>What brings you here today?</h3>
            <div className="concerns-grid">
              {CONCERNS.map(concern => (
                <button
                  key={concern}
                  onClick={() => toggleConcern(concern)}
                  className={`concern-chip ${selectedConcerns.includes(concern) ? 'active' : ''}`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-panel">
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #c7a977)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
            Your Recommended Match
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
            {selectedConcerns.length === 0 
              ? "Select concerns to see personalized matches." 
              : `Found ${matchedTherapists.length} provider${matchedTherapists.length !== 1 ? 's' : ''} matching your needs.`}
          </p>

          <div className="results-section">
            {matchedTherapists.length > 0 ? (
              matchedTherapists.map((therapist, index) => (
                <div 
                  key={therapist.id} 
                  className="therapist-card"
                  style={{ animationDelay: `${index * 0.1}s`, animation: 'slideUp 0.5s ease-out forwards', opacity: 0, transform: 'translateY(20px)' }}
                >
                  <img src={therapist.image} alt={therapist.name} className="therapist-avatar" />
                  <div className="therapist-info">
                    <h3>{therapist.name}</h3>
                    <p style={{ color: 'var(--accent-color)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>{therapist.title}</p>
                    <p>{therapist.desc}</p>
                  </div>
                  {selectedConcerns.length > 0 && (
                    <div className="match-score">
                      {therapist.matchPercentage}% Match
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                No exact matches found for this specific combination. Our intake coordinator can help guide you.
              </div>
            )}
          </div>

          <button style={{ 
            marginTop: '2.5rem', 
            width: '100%', 
            padding: '1.25rem', 
            background: '#fff', 
            color: 'var(--bg-color)', 
            border: 'none', 
            borderRadius: '16px', 
            fontSize: '1.05rem', 
            fontWeight: '600', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 20px rgba(255,255,255,0.1)'
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 25px rgba(255,255,255,0.2)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.1)'; }}
          >
            Request Consultation <ArrowRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
