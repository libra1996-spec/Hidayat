import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  MapPin, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  X, 
  Scale, 
  Globe, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';
import { University } from '../types';

interface UniversitiesViewProps {
  savedUniversityIds: string[];
  onToggleSaveUniversity: (id: string) => void;
}

export const UniversitiesView: React.FC<UniversitiesViewProps> = ({
  savedUniversityIds,
  onToggleSaveUniversity,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [scholarshipOnly, setScholarshipOnly] = useState(false);

  const [comparedUniIds, setComparedUniIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const countries = ['All', 'USA', 'United Kingdom', 'Switzerland', 'Singapore', 'Germany', 'Pakistan'];
  const degreeLevels = ['All', 'Bachelors', 'Masters', 'PhD'];

  const filteredUnis = UNIVERSITIES.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.popularPrograms.some((p) => p.toLowerCase().includes(search.toLowerCase()));

    const matchesCountry = selectedCountry === 'All' || u.country === selectedCountry;
    const matchesDegree = selectedDegree === 'All' || u.degreeLevels.includes(selectedDegree as any);
    const matchesType = selectedType === 'All' || u.publicOrPrivate === selectedType;
    const matchesScholarship = !scholarshipOnly || u.scholarshipsAvailable;

    return matchesSearch && matchesCountry && matchesDegree && matchesType && matchesScholarship;
  });

  const toggleCompare = (id: string) => {
    if (comparedUniIds.includes(id)) {
      setComparedUniIds(comparedUniIds.filter((i) => i !== id));
    } else {
      if (comparedUniIds.length >= 3) {
        alert('You can compare a maximum of 3 universities side-by-side.');
        return;
      }
      setComparedUniIds([...comparedUniIds, id]);
    }
  };

  const comparedUnis = UNIVERSITIES.filter((u) => comparedUniIds.includes(u.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Global Higher Education Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            University Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare rankings, tuition fees, acceptance rates, and scholarship availability across top global institutions.
          </p>
        </div>

        {/* Compare Floating Trigger */}
        {comparedUniIds.length > 0 && (
          <button
            onClick={() => setCompareModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
          >
            <Scale className="w-4 h-4" />
            <span>Compare Selected ({comparedUniIds.length})</span>
          </button>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by university name, program (e.g. Computer Science, AI, Business), or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Degree Level</label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {degreeLevels.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Institution Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="All">All Types</option>
              <option value="Public">Public University</option>
              <option value="Private">Private University</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer w-full text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={scholarshipOnly}
                onChange={(e) => setScholarshipOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Scholarships Only</span>
            </label>
          </div>

        </div>

      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnis.map((uni) => {
          const isSaved = savedUniversityIds.includes(uni.id);
          const isCompared = comparedUniIds.includes(uni.id);

          return (
            <div
              key={uni.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <button
                      onClick={() => onToggleSaveUniversity(uni.id)}
                      className={`p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-900/60 text-white hover:bg-slate-900/80'
                      }`}
                      title={isSaved ? 'Saved to Dashboard' : 'Save University'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>{uni.city}, {uni.country}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {uni.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-[10px] rounded-md shrink-0 border border-blue-200 dark:border-blue-800">
                      Rank #{uni.ranking}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {uni.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Tuition Fee</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{uni.tuitionFee}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Acceptance Rate</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{uni.acceptanceRate}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <span className="text-slate-400 font-medium">Popular Programs:</span>
                    <div className="flex flex-wrap gap-1">
                      {uni.popularPrograms.slice(0, 3).map((prog, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-medium">
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleCompare(uni.id)}
                  className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                    isCompared
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'Comparing' : '+ Compare'}</span>
                </button>

                <a
                  href={uni.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <span>Apply Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {filteredUnis.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
          No universities matched your specific filters. Try resetting the country or degree selection.
        </div>
      )}

      {/* Comparison Side-by-Side Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Side-by-Side University Comparison
                </h3>
              </div>
              <button onClick={() => setCompareModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedUnis.map((uni) => (
                <div key={uni.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{uni.name}</h4>
                    <button onClick={() => toggleCompare(uni.id)} className="text-slate-400 hover:text-rose-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-slate-500">{uni.city}, {uni.country}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p><strong className="text-slate-700 dark:text-slate-300">Global Ranking:</strong> #{uni.ranking}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Tuition Fee:</strong> {uni.tuitionFee}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Acceptance Rate:</strong> {uni.acceptanceRate}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Type:</strong> {uni.publicOrPrivate}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Scholarships:</strong> {uni.scholarshipsAvailable ? 'Yes (Available)' : 'Limited'}</p>
                    <p><strong className="text-slate-700 dark:text-slate-300">Application Deadline:</strong> {uni.applicationDeadline}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setCompareModalOpen(false)}
                className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
