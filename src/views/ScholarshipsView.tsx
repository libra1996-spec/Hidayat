import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Sparkles, 
  CheckCircle,
  Share2
} from 'lucide-react';
import { SCHOLARSHIPS } from '../data/mockData';

interface ScholarshipsViewProps {
  savedScholarshipIds: string[];
  onToggleSaveScholarship: (id: string) => void;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({
  savedScholarshipIds,
  onToggleSaveScholarship,
}) => {
  const [search, setSearch] = useState('');
  const [fundingFilter, setFundingFilter] = useState('All');
  const [degreeFilter, setDegreeFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');

  const filteredScholarships = SCHOLARSHIPS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.provider.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.eligibleFields.some((f) => f.toLowerCase().includes(search.toLowerCase()));

    const matchesFunding = fundingFilter === 'All' || s.fundingType === fundingFilter;
    const matchesDegree = degreeFilter === 'All' || s.degreeLevel.includes(degreeFilter as any);
    const matchesGender = genderFilter === 'All' || s.genderEligibility === genderFilter || s.genderEligibility === 'All';

    return matchesSearch && matchesFunding && matchesDegree && matchesGender;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>20,000+ Verified Global Grants</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Scholarship Finder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover fully funded international scholarships, government grants, and university tuition waivers.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scholarships (e.g., Fulbright, Chevening, DAAD, Women in STEM)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Funding Type</label>
            <select
              value={fundingFilter}
              onChange={(e) => setFundingFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Funding Types</option>
              <option value="Fully Funded">Fully Funded</option>
              <option value="Partial">Partial Funding</option>
              <option value="Tuition Waiver">Tuition Waiver</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Degree Level</label>
            <select
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Degrees</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD / Doctorate</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Gender Eligibility</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Applicants</option>
              <option value="Female Only">Female Applicants Only</option>
            </select>
          </div>

        </div>

      </div>

      {/* Scholarship Cards List */}
      <div className="space-y-4">
        {filteredScholarships.map((sch) => {
          const isSaved = savedScholarshipIds.includes(sch.id);

          return (
            <div
              key={sch.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] rounded-full uppercase tracking-wider">
                      {sch.fundingType}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">• {sch.country}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {sch.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Provider: {sch.provider}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSaveScholarship(sch.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{isSaved ? 'Saved' : 'Bookmark'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {sch.description}
              </p>

              {/* Amount & Deadlines Grid */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Funding Package</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{sch.fundingAmount}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Application Deadline</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{sch.deadline}</span>
                </div>
              </div>

              {/* Requirements & Link */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {sch.requirements.map((req, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-medium">
                      ✓ {req}
                    </span>
                  ))}
                </div>

                <a
                  href={sch.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
