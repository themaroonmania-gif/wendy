import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle2, FileText, CreditCard, HelpCircle } from 'lucide-react';

export default function Fees() {
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
            <div>
              <p className="hero-eyebrow">Fees & Insurance</p>
              <h1>Getting started.</h1>
              <p className="hero-desc">
                We understand that beginning therapy involves practical questions about cost. Our goal is to make this process as clear and straightforward as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary" style={{ paddingTop: '2rem' }}>
        <div className="container" ref={contentRef}>
          
          <div className="hero-grid" style={{ marginBottom: '4rem', alignItems: 'stretch' }}>
            <div style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CreditCard color="var(--accent)" /> Session Fees
              </h2>
              <p style={{ marginBottom: '2rem' }}>Therapy fees vary depending on provider, licensure level, specialty area, and appointment type.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Initial Intake Appointments</span>
                  <span style={{ fontWeight: 500, color: 'var(--accent)' }}>$175 – $250</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Individual Therapy Sessions</span>
                  <span style={{ fontWeight: 500, color: 'var(--accent)' }}>$140 – $225</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Couples & Family Sessions</span>
                  <span style={{ fontWeight: 500, color: 'var(--accent)' }}>$150 – $275</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Psychological Assessment</span>
                  <span style={{ fontWeight: 500, color: 'var(--accent)' }}>$500 – $3,000+</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-section-alt)', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 color="var(--accent-dark)" /> Insurance
              </h2>
              <p style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>
                Many ATA clinicians are in-network with a variety of insurance providers. Participation varies by clinician and service type.
              </p>
              
              <p className="hero-eyebrow" style={{ color: 'var(--accent-dark)', marginBottom: '1rem' }}>Commonly accepted plans</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'Evernorth', 'First Health', 'Multiplan', 'Optum', 'UnitedHealthcare'].map(plan => (
                  <span key={plan} style={{ background: '#fff', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {plan}
                  </span>
                ))}
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Confirm your clinician's participation when scheduling. Out-of-network benefits and superbills are also available.
              </p>
            </div>
          </div>

          <div className="concern-cards-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="concern-card">
              <FileText className="concern-card-icon" size={32} />
              <h3>Payment & Billing</h3>
              <p>Payment is due at the time of service unless otherwise arranged. We accept credit, debit, and HSA/FSA cards, processed securely through our electronic health record platform, TherapyNotes.</p>
            </div>
            <div className="concern-card">
              <HelpCircle className="concern-card-icon" size={32} />
              <h3>Good Faith Estimate</h3>
              <p>Under the No Surprises Act, clients who are uninsured or not using insurance have the right to receive a Good Faith Estimate outlining the expected cost of services before appointments.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
