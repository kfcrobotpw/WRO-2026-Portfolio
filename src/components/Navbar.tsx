import React, { useState, useEffect } from 'react';
import { RobotLogo } from './RobotLogo';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Terminal, Sparkles, LogIn, Lock, ShieldCheck, LogOut } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { isAdmin, openLoginModal, logout } = usePortfolio();
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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
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

          {/* Right Action: HIRE ME button + LOG IN at the top right end */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="hire-me-btn"
              onClick={() => handleLinkClick('contact')}
              className="relative inline-flex items-center justify-center px-5 py-2 text-xs font-bold font-['Orbitron'] tracking-widest text-[#060b13] bg-cyan-400 hover:bg-cyan-300 rounded-[6px] shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-200 uppercase cursor-pointer group active:scale-95"
            >
              <span className="relative z-10">HIRE ME</span>
              <div className="absolute inset-0 bg-white/20 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* LOG IN button at the far right */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span className="text-[11px]">ADMIN ON</span>
                </div>
                <button
                  id="nav-logout-btn"
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-500/40 transition-colors"
                  title="로그아웃"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={openLoginModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold font-['Orbitron'] tracking-wider text-cyan-300 hover:text-white bg-slate-950/80 hover:bg-cyan-950/50 border border-cyan-500/50 hover:border-cyan-400 rounded-[6px] shadow-[0_0_12px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all cursor-pointer group"
              >
                <LogIn size={13} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>LOG IN</span>
              </button>
            )}
          </div>

          {/* Mobile menu and mobile login button */}
          <div className="flex md:hidden items-center gap-2">
            {isAdmin ? (
              <button
                onClick={logout}
                className="px-2.5 py-1.5 text-[10px] font-bold font-['Orbitron'] text-red-300 bg-red-950/60 border border-red-500/50 rounded flex items-center gap-1"
              >
                <LogOut size={12} />
                <span>LOG OUT</span>
              </button>
            ) : (
              <button
                id="mobile-login-btn"
                onClick={openLoginModal}
                className="px-2.5 py-1.5 text-[10px] font-bold font-['Orbitron'] tracking-wider text-cyan-300 bg-slate-950 border border-cyan-500/50 rounded flex items-center gap-1"
              >
                <LogIn size={12} />
                <span>LOG IN</span>
              </button>
            )}

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
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <Terminal size={14} />
              <span>NAVIGATION_SYSTEM_V2.6</span>
            </div>
            {isAdmin && (
              <span className="text-emerald-400 font-bold">[EDITOR UNLOCKED]</span>
            )}
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

          <div className="pt-3 space-y-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 text-center text-xs font-bold font-['Orbitron'] tracking-widest text-[#060b13] bg-cyan-400 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            >
              INITIATE CONNECTION (HIRE ME)
            </button>

            {isAdmin ? (
              <button
                onClick={logout}
                className="w-full py-2.5 text-center text-xs font-bold font-mono text-red-300 bg-red-950/40 border border-red-500/40 rounded-lg"
              >
                ADMIN LOGOUT (편집 모드 종료)
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="w-full py-2.5 text-center text-xs font-bold font-['Orbitron'] text-cyan-300 bg-slate-950 border border-cyan-500/50 rounded-lg flex items-center justify-center gap-1.5"
              >
                <LogIn size={14} />
                <span>ADMIN LOG IN (비밀번호: jww9882!)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

