import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <img src="https://addisontherapy.com/__l5e/assets-v1/3d8b6ec5-5c0b-47a6-bf07-e2af47ce003a/ata-logo.jpg" alt="Addison Therapy Associates Logo" style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '1rem' }} />
          <h4 style={{ marginBottom: '0.5rem' }}>Addison Therapy Associates</h4>
          <p>A psychologist-led, multi-specialty group practice serving children, adolescents, adults, couples, and families across the DFW metroplex.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link><br />
          <Link to="/about">About</Link><br />
          <Link to="/services">Services</Link><br />
          <Link to="/providers">Our Team</Link><br />
          <Link to="/fees">Fees & Insurance</Link><br />
          <Link to="/locations">Locations</Link><br />
          <Link to="/resources">Resource Center</Link><br />
          <Link to="/join">Join Our Team</Link><br />
          <Link to="/contact">Contact</Link><br />
          <Link to="/notice">Notice to Texas Consumers</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>
            <a href="tel:2145563739">(214) 556-3739</a><br />
            <a href="mailto:reception@addisontherapy.com">reception@addisontherapy.com</a><br />
            Mon–Fri, 8 AM – 5 PM
          </p>
        </div>
        <div className="footer-col">
          <h4>Main Office</h4>
          <p>16970 Dallas Parkway<br />Building 300<br />Dallas, TX 75248</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Addison Therapy Associates. All rights reserved.
      </div>
    </footer>
  );
}
