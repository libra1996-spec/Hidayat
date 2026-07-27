import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Moon, 
  Sun, 
  Globe, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Users, 
  FileText, 
  Bot, 
  LayoutDashboard,
  Check
} from 'lucide-react';
import { TabType, Language } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  userLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  onOpenSearch,
  onOpenAuth,
  userLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'assessment', label: 'AI Assessment', icon: <Sparkles className="w-4 h-4 text-amber-500" />, badge: 'AI' },
    { id: 'universities', label: 'Universities', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'scholarships', label: 'Scholarships', icon: <Award className="w-4 h-4" /> },
    { id: 'careers', label: 'Careers', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'counselors', label: 'Counselors', icon: <Users className="w-4 h-4" /> },
    { id: 'resume', label: 'ATS Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'interview', label: 'Interview & SOP', icon: <Bot className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'pricing', label: 'Pricing', icon: null },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'EN', label: 'English' },
    { code: 'UR', label: 'اردو (Urdu)' },
    { code: 'AR', label: 'العربية (Arabic)' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#0F4C81] dark:text-white tracking-tight">
                Hidayat
              </span>
              <span className="block text-[10px] font-semibold text-[#2ECC71] dark:text-[#2ECC71] -mt-1 tracking-wider uppercase">
                AI Career Compass
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#0F4C81]/10 text-[#0F4C81] dark:bg-blue-950/80 dark:text-blue-300 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#0F4C81] hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-[#2ECC71]/15 text-[#1B7E45] dark:text-[#2ECC71] border border-[#2ECC71]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions (Search, Lang, Theme, Auth) */}
          <div className="hidden sm:flex items-center space-x-2">
            
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span>{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors text-slate-700 dark:text-slate-200"
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-[#0F4C81] dark:text-blue-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode && setDarkMode(!darkMode)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Auth / Profile Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-2 text-xs font-medium text-white bg-[#0F4C81] hover:bg-[#0c3f6b] rounded-full shadow-sm hover:shadow-lg transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{userLoggedIn ? 'My Account' : 'Get Started'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/15 text-amber-600 border border-amber-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-1 rounded ${
                      language === l.code ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-700 rounded-lg"
            >
              <User className="w-4 h-4" />
              <span>{userLoggedIn ? 'Account' : 'Sign In'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
