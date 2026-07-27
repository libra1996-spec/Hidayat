import React from 'react';
import { Compass, Mail, ArrowRight, Heart } from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Top Supported By & Quick Metrics Bar */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supported by</span>
            <div className="flex items-center gap-6 opacity-60">
              <span className="text-sm font-extrabold uppercase italic tracking-tighter text-[#0F4C81] dark:text-slate-300">EduGlobal</span>
              <span className="text-sm font-extrabold uppercase italic tracking-tighter text-[#0F4C81] dark:text-slate-300">ScholarLink</span>
              <span className="text-sm font-extrabold uppercase italic tracking-tighter text-[#0F4C81] dark:text-slate-300">CareerMap</span>
              <span className="text-sm font-extrabold uppercase italic tracking-tighter text-[#0F4C81] dark:text-slate-300">NextGen</span>
            </div>
          </div>

          <div className="flex items-center gap-8 sm:gap-12">
            <div className="text-center sm:text-right">
              <p className="text-base sm:text-lg font-black text-[#0F4C81] dark:text-blue-400">20,000+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Scholarships</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-base sm:text-lg font-black text-[#0F4C81] dark:text-blue-400">500+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Universities</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-base sm:text-lg font-black text-[#0F4C81] dark:text-blue-400">2,000+</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Counselors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center text-white shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Hidayat
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering students worldwide with AI-driven career recommendations, global university comparisons, scholarship matching, and expert counseling.
            </p>
            <div className="pt-2">
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter student email..."
                    className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2ECC71]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F39C12] hover:bg-[#d68910] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('assessment')} className="hover:text-blue-400 transition-colors">
                  AI Career Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('universities')} className="hover:text-blue-400 transition-colors">
                  University Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('scholarships')} className="hover:text-blue-400 transition-colors">
                  Scholarship Finder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('careers')} className="hover:text-blue-400 transition-colors">
                  Career Database
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('counselors')} className="hover:text-blue-400 transition-colors">
                  Counselor Marketplace
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & AI */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">AI Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('resume')} className="hover:text-blue-400 transition-colors">
                  ATS Resume Checker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('interview')} className="hover:text-blue-400 transition-colors">
                  AI Interview Coach
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('interview')} className="hover:text-blue-400 transition-colors">
                  SOP Statement Reviewer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-blue-400 transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-blue-400 transition-colors">
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-blue-400 transition-colors">
                  Career Guidance Blog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-blue-400 transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <a href="#faq" onClick={() => setActiveTab('contact')} className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-500">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-500">Terms of Service</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Hidayat AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision & vision for global youth</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
