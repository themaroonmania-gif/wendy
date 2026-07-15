import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <section className="section bg-primary" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
        <div className="container">
          <Link to="/resources" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontWeight: 500 }}>
            <ArrowLeft size={18} /> Back to Resource Center
          </Link>
          
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="hero-eyebrow">Therapy Guide</p>
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>Finding the Right Therapist in Fort Worth</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', color: 'var(--text-muted)' }}>
              <span>By Dr. Wendy Bates</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Therapy session" 
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '3rem' }} 
            />

            <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Choosing a therapist can feel overwhelming, especially when you're already dealing with stress, anxiety, or life transitions. In a growing area like Fort Worth, the options are vast, but finding the <em>right</em> fit is the most crucial step toward meaningful progress.
              </p>
              
              <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Determine what you need help with</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Before starting your search, take a moment to identify the primary reason you're seeking therapy. Are you looking to manage anxiety? Navigate a career transition? Process trauma? Different therapists have different specialties.
              </p>

              <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Consider logistics and location</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Consistency is key in therapy. Consider whether an office in the Cultural District or near Bryant Irvin makes sense for your weekly commute. Alternatively, many clinicians now offer secure telehealth options for residents anywhere in Texas.
              </p>

              <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3. Look for a group practice</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Group practices (like Addison Therapy Associates) offer a unique advantage: built-in consultation. When you work with a therapist in a group practice, you benefit from the collective knowledge and diverse specialties of the entire team.
              </p>
              
              <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-section-alt)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem' }}>Ready to find your match?</h3>
                <p style={{ marginBottom: '1.5rem' }}>Our intake coordinators can help pair you with the right Fort Worth clinician.</p>
                <Link to="/providers" className="nav-cta">View Fort Worth Clinicians</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
