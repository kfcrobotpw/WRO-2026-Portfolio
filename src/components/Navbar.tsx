import React, { useState, useEffect } from 'react';
import { RobotLogo } from './RobotLogo';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'awards', label: 'AWARDS' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060b13]/90 backdrop-blur-md border-b border-cyan-950/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('about')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="Home"
          >
            <RobotLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer font-['Orbitron'] ${
                    isActive
                      ? 'text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: HIRE ME button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="hire-me-btn"
              onClick={() => handleLinkClick('contact')}
              className="relative inline-flex items-center justify-center px-6 py-2 text-xs font-bold font-['Orbitron'] tracking-widest text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded-[6px] shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-200 uppercase cursor-pointer group active:scale-95"
            >
              <span className="relative z-10">HIRE ME</span>
              <div className="absolute inset-0 bg-white/20 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              id="mobile-hire-btn"
              onClick={() => handleLinkClick('contact')}
              className="px-3.5 py-1.5 text-[11px] font-bold font-['Orbitron'] tracking-wider text-[#060b13] bg-cyan-400 rounded shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            >
              HIRE ME
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-900 border border-slate-800 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-[#070e1a]/95 backdrop-blur-xl border-b border-cyan-900/50 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-[11px] font-mono text-cyan-400">
            <Terminal size={14} />
            <span>NAVIGATION_SYSTEM_V2.6</span>
          </div>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-['Orbitron'] tracking-wider transition-colors ${
                  activeSection === item.id
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                    : 'text-slate-300 hover:bg-slate-900/60 hover:text-cyan-400'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <Sparkles size={14} className="text-cyan-400" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 text-center text-xs font-bold font-['Orbitron'] tracking-widest text-[#060b13] bg-cyan-400 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            >
              INITIATE CONNECTION (HIRE ME)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
