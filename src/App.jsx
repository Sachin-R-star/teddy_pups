import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Curtain from './components/Curtain';
import PawCursor from './components/PawCursor';
import Home from './pages/Home';
import Puppies from './pages/Puppies';
import PuppyDetail from './pages/PuppyDetail';
import GoneHome from './pages/GoneHome';
import HappyFamilies from './pages/HappyFamilies';
import HowItWorks from './pages/HowItWorks';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Custom Paw Cursor with trailing prints */}
      <PawCursor />

      {/* Animated Curtain Intro on first load */}
      <Curtain />

      {/* Main Site Header */}
      <Navbar />

      {/* Main Page Content */}
      <main id="main" tabIndex="-1" className="relative pt-[var(--header-h)] outline-none min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/puppies" element={<Puppies />} />
          <Route path="/puppies/:slug" element={<PuppyDetail />} />
          <Route path="/gone-home" element={<GoneHome />} />
          <Route path="/happy-families" element={<HappyFamilies />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </Router>
  );
}
