import React, { useState, useEffect } from 'react';
import { RobotLogo } from './RobotLogo';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Terminal, Sparkles, ShieldCheck, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onNavigateToAdmin }) => {
  const { isAdmin, logout } = usePortfolio();
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
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    } else {
      window.history.pushState({}, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('about')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none z-10"
            aria-label="Home"
          >
            <RobotLogo size="md" />
          </button>

          {/* Desktop Navigation Links - Centered */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2"
            aria-label="Main Navigation"
          >
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

          {/* Right Action / Admin Status */}
          <div className="hidden md:flex items-center z-10 min-w-[32px] justify-end">
            {isAdmin && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <button
                  onClick={handleAdminClick}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  title="관리자 제어 센터 (/admin) 열기"
                >
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span className="text-[11px] tracking-wide">ADMIN ON</span>
                  <Settings size={12} className="text-emerald-400" />
                </button>

                <button
                  id="nav-logout-btn"
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/90 border border-red-500/60 text-red-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.35)]"
                  title="관리자 로그아웃"
                >
                  <LogOut size={13} className="text-red-400" />
                  <span className="text-[11px] tracking-wide">로그아웃</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu and controls */}
          <div className="flex md:hidden items-center gap-2">
            {isAdmin && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAdminClick}
                  className="px-2.5 py-1.5 text-[10px] font-bold font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 rounded flex items-center gap-1"
                >
                  <ShieldCheck size={12} />
                  <span>ADMIN</span>
                </button>
                <button
                  onClick={logout}
                  className="px-2.5 py-1.5 text-[10px] font-bold font-mono text-red-300 bg-red-950/80 border border-red-500/50 rounded flex items-center gap-1"
                  title="로그아웃"
                >
                  <LogOut size={12} />
                  <span>로그아웃</span>
                </button>
              </div>
            )}

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-cyan-400 rounded-lg hover:bg-slate-900 border border-slate-800 focus:outline-none cursor-pointer"
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-['Orbitron'] tracking-wider transition-colors cursor-pointer ${
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

          {isAdmin && (
            <div className="pt-3 space-y-2 border-t border-slate-800/80">
              <button
                onClick={handleAdminClick}
                className="w-full py-2.5 text-center text-xs font-bold font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/50 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Settings size={14} />
                <span>관리자 제어 센터 (/admin)</span>
              </button>
              <button
                onClick={logout}
                className="w-full py-2.5 text-center text-xs font-bold font-mono text-red-300 bg-red-950/40 border border-red-500/40 rounded-lg cursor-pointer"
              >
                ADMIN LOGOUT (로그아웃)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
