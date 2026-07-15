import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const photoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Reveal photo on load
    gsap.to(photoRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      scale: 1,
      duration: 1.4,
      ease: "power3.inOut",
      delay: 0.1
    });

    // Stagger text paragraphs
    const paragraphs = textRef.current.querySelectorAll('p, h2, h3');
    gsap.fromTo(paragraphs, 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <p className="hero-eyebrow">About Us</p>
              <h1>Deep specialization without fragmentation.</h1>
              <p className="hero-desc" style={{ margin: '0 auto' }}>
                We are a collaborative team of doctoral-level psychologists and specialized therapists.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <img 
            ref={photoRef}
            src="https://addisontherapy.com/__l5e/assets-v1/82a04b96-e360-4e85-b0ae-2ae85f3fe2b2/ata-lobby-sign.jpg" 
            alt="Bright Addison Therapy Associates therapy office with an arched window, green chairs, and framed art prints" 
            className="office-hero-photo"
            style={{ marginTop: 0, height: '60vh' }}
          />
        </div>
      </section>

      <section className="section bg-primary">
        <div className="container">
          <div className="hero-grid" style={{ alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ position: 'sticky', top: '120px' }}>A team where the parts know each other.</h2>
            </div>
            <div ref={textRef} style={{ paddingLeft: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Our Philosophy</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Most directory-style sites lead with the therapist. We lead with the practice — because the standard of care, not the marketing, is what brings physicians, schools, attorneys, and families back to us time and time again.
              </p>
              <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                Doctoral-level clinical leadership informs every case. Peer consultation and case collaboration are built into how we practice, meaning you aren't just getting one isolated clinician; you're getting the combined expertise of a unified team.
              </p>
              
              <h3 style={{ marginBottom: '1rem' }}>Collaborative Care</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                We actively coordinate with physicians, psychiatrists, schools, and pediatric partners. Our goal is to ensure that the people you refer feel held by a comprehensive team, rather than handed off and forgotten.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
