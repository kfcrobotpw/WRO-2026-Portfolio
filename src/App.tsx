import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { AdminToolbar } from './components/AdminToolbar';
import { LoginModal } from './components/LoginModal';
import { AdminPortal } from './components/AdminPortal';
import { Hero } from './components/Hero';
import { CompetitionJourney } from './components/CompetitionJourney';
import { CoreCapabilities } from './components/CoreCapabilities';
import { Achievements } from './components/Achievements';
import { ProjectArchives } from './components/ProjectArchives';
import { Footer } from './components/Footer';

function PortfolioApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname;
  });
  const [activeSection, setActiveSection] = useState('about');

  // Listen to browser forward/back buttons & URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle section scrolling on public portfolio
  const scrollToSection = (sectionId: string) => {
    if (currentPath === '/admin') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  // IntersectionObserver to auto-update active nav link on scroll
  useEffect(() => {
    if (currentPath === '/admin') return;

    const sections = ['about', 'journey', 'skills', 'awards', 'portfolio'];
    
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, [currentPath]);

  // If on /admin route, render dedicated Admin Portal
  if (currentPath === '/admin') {
    return <AdminPortal onNavigateHome={() => navigateTo('/')} />;
  }

  // Public / Home View (/)
  return (
    <div className="relative min-h-screen bg-[#060b13] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Background Cybernetic Ambience Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.12) 1px, transparent 1px), linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px, 32px 32px, 32px 32px',
        }}
      />

      {/* Floating Cyber Glowing Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-40 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sticky Navigation Header */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={scrollToSection} 
        onNavigateToAdmin={() => navigateTo('/admin')}
      />

      {/* Admin Mode Floating Toolbar (Only visible when logged in) */}
      <AdminToolbar />

      {/* Login Authentication Modal */}
      <LoginModal />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4 sm:space-y-8">
        
        {/* 1. Hero & About Section */}
        <Hero onNavigate={scrollToSection} />

        {/* 2. Competition Journey Timeline */}
        <CompetitionJourney />

        {/* 3. Core Capabilities & Skills Matrix */}
        <CoreCapabilities />

        {/* 4. Achievements & Engineering Awards */}
        <Achievements />

        {/* 5. Project Archives & Technical Blueprints */}
        <ProjectArchives />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
