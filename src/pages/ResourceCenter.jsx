import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    title: 'Finding the Right Therapist in Fort Worth',
    category: 'Therapy Guide',
    excerpt: 'How to choose a therapist near the Cultural District, TCU, or Bryant Irvin.'
  },
  {
    title: 'Does Insurance Cover Therapy?',
    category: 'Insurance & Fees',
    excerpt: 'In-network vs out-of-network, superbills, deductibles, and what to ask your plan.'
  },
  {
    title: 'What Is Psychological Testing?',
    category: 'Assessment',
    excerpt: 'How testing is billed differently than therapy and when it\'s worth pursuing.'
  },
  {
    title: 'What Happens During the First Therapy Session?',
    category: 'Getting Started',
    excerpt: 'An honest walkthrough of a first appointment — paperwork, conversation, and a plan.'
  }
];

export default function ResourceCenter() {
  const listRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(listRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
            <div>
              <p className="hero-eyebrow">Resource Center</p>
              <h1>Guides for finding a therapist.</h1>
              <p className="hero-desc">
                Helpful reading on cost, coverage, getting started, and finding the right clinical fit near you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary" style={{ paddingTop: '2rem', minHeight: '60vh' }}>
        <div className="container" ref={listRef}>
          {ARTICLES.map((article, idx) => (
            <article 
              key={idx} 
              style={{
                padding: '2.5rem 0',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                <BookOpen size={16} />
                <span className="hero-eyebrow" style={{ margin: 0, fontSize: '0.75rem' }}>{article.category}</span>
              </div>
              
              <Link to={`/blog/${idx + 1}`} style={{ textDecoration: 'none' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', transition: 'color var(--transition-fast)' }} 
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>
                  {article.title}
                </h2>
              </Link>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                {article.excerpt}
              </p>
              
              <Link to={`/blog/${idx + 1}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Read Guide <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
