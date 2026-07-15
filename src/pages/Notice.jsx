import { useEffect } from 'react';

export default function Notice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="hero" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
            <div>
              <p className="hero-eyebrow">Legal & Compliance</p>
              <h1>Notice to Texas Consumers</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary" style={{ paddingTop: '2rem', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', background: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Texas Behavioral Health Executive Council</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Addison Therapy Associates, PLLC is a psychological group practice registered in the state of Texas. Our professionals are licensed and regulated by the Texas Behavioral Health Executive Council.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              The Texas Behavioral Health Executive Council investigates and prosecutes professional misconduct committed by marriage and family therapists, professional counselors, psychologists, psychological associates, social workers, and licensed specialists in school psychology.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Although not every complaint against or dispute with a licensee involves professional misconduct, the Executive Council will provide you with information about how to file a complaint.
            </p>
            <h3 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>Contact Information for the Council:</h3>
            <p style={{ marginBottom: '0.5rem' }}><strong>Texas Behavioral Health Executive Council</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>George H.W. Bush State Office Building</p>
            <p style={{ marginBottom: '0.5rem' }}>1801 Congress Ave., Ste. 7.300</p>
            <p style={{ marginBottom: '0.5rem' }}>Austin, Texas 78701</p>
            <p style={{ marginBottom: '0.5rem' }}>Main Line: (512) 305-7700</p>
            <p style={{ marginBottom: '0.5rem' }}>Investigations/Complaints: 24-hour, toll-free system (800) 821-3205</p>
            <a href="https://www.bhec.texas.gov" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', fontWeight: 500 }}>
              www.bhec.texas.gov
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
