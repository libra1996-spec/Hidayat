import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  TrendingUp, 
  ShieldAlert, 
  Dna, 
  Zap, 
  Cpu, 
  GraduationCap,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { CAREERS } from '../data/mockData';
import { TabType } from '../types';

interface CareersViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ setActiveTab }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology & AI', 'Technology & Defense', 'Healthcare & Science', 'Engineering & Environment', 'Finance & Economics'];

  const filteredCareers = CAREERS.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-blue-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-purple-500" />;
      case 'Dna': return <Dna className="w-6 h-6 text-rose-500" />;
      case 'Zap': return <Zap className="w-6 h-6 text-emerald-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-500" />;
      default: return <Briefcase className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Global Labor Market Index</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Career Database & Growth Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Explore emerging high-paying professions, required skill stacks, degree paths, and global job opening forecasts.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers (e.g., AI Engineer, Cybersecurity, Quant, Bioinformatics)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCareers.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                  {renderIcon(car.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{car.title}</h3>
                  <span className="text-xs text-slate-400 font-medium">{car.category}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] rounded-full shrink-0">
                {car.futureDemand}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {car.description}
            </p>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Average Salary Range</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{car.averageSalary}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Top Target Universities</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{car.topUniversities.join(', ')}</span>
              </div>
            </div>

            {/* Skills required */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Required Skills & Technologies:</span>
              <div className="flex flex-wrap gap-1">
                {car.requiredSkills.map((sk, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-medium text-[11px] rounded border border-blue-200/50 dark:border-blue-800/50">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Path & Action */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-500 max-w-sm truncate">
                <strong className="text-slate-700 dark:text-slate-300">Path: </strong>
                <span>{car.educationPath}</span>
              </div>

              <button
                onClick={() => setActiveTab('assessment')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shrink-0 transition-all cursor-pointer"
              >
                <span>Evaluate Suitability</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
