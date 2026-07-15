import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Providers from './pages/Providers.jsx';
import Locations from './pages/Locations.jsx';
import Fees from './pages/Fees.jsx';
import JoinTeam from './pages/JoinTeam.jsx';
import ResourceCenter from './pages/ResourceCenter.jsx';
import Notice from './pages/Notice.jsx';
import BlogPost from './pages/BlogPost.jsx';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/join" element={<JoinTeam />} />
          <Route path="/resources" element={<ResourceCenter />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
