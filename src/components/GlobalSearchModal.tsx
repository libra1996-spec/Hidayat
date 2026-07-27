import React, { useState, useEffect } from 'react';
import { Search, X, GraduationCap, Award, Briefcase, Users, FileText, ArrowRight } from 'lucide-react';
import { UNIVERSITIES, SCHOLARSHIPS, CAREERS, COUNSELORS } from '../data/mockData';
import { TabType } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredUnis = UNIVERSITIES.filter(
    (u) => u.name.toLowerCase().includes(q) || u.country.toLowerCase().includes(q) || u.popularPrograms.some(p => p.toLowerCase().includes(q))
  ).slice(0, 3);

  const filteredSchols = SCHOLARSHIPS.filter(
    (s) => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.eligibleFields.some(f => f.toLowerCase().includes(q))
  ).slice(0, 3);

  const filteredCareers = CAREERS.filter(
    (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.requiredSkills.some(s => s.toLowerCase().includes(q))
  ).slice(0, 3);

  const filteredCounselors = COUNSELORS.filter(
    (c) => c.name.toLowerCase().includes(q) || c.specializations.some(s => s.toLowerCase().includes(q))
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, scholarships, careers, counselors..."
            className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {/* Universities Section */}
          {filteredUnis.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Universities</span>
              </div>
              <div className="space-y-1">
                {filteredUnis.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => {
                      setActiveTab('universities');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {u.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{u.city}, {u.country} • Rank #{u.ranking}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scholarships Section */}
          {filteredSchols.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Scholarships</span>
              </div>
              <div className="space-y-1">
                {filteredSchols.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setActiveTab('scholarships');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {s.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{s.country} • {s.fundingType}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Careers Section */}
          {filteredCareers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                <span>Careers</span>
              </div>
              <div className="space-y-1">
                {filteredCareers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveTab('careers');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-slate-400">{c.category} • Avg: {c.averageSalary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick AI Tools Shortcuts */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Tools</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('assessment');
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60"
              >
                Take AI Career Assessment
              </button>
              <button
                onClick={() => {
                  setActiveTab('resume');
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60"
              >
                Scan ATS Resume
              </button>
            </div>
          </div>

          {q && filteredUnis.length === 0 && filteredSchols.length === 0 && filteredCareers.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No direct matches found for "{query}". Try searching for broader terms like "USA", "Computer", "Engineering", or "Scholarship".
            </div>
          )}

        </div>

        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>Press ESC to close</span>
          <span>Hidayat Global Search Index</span>
        </div>

      </div>
    </div>
  );
};
