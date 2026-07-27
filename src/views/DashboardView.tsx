import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Users, 
  GraduationCap, 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { UNIVERSITIES, SCHOLARSHIPS } from '../data/mockData';
import { CounselorAppointment, AssessmentResult, TabType } from '../types';

interface DashboardViewProps {
  savedUniversityIds: string[];
  savedScholarshipIds: string[];
  appointments: CounselorAppointment[];
  latestAssessmentResult: AssessmentResult | null;
  onRemoveUniversity: (id: string) => void;
  onRemoveScholarship: (id: string) => void;
  setActiveTab: (tab: TabType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  savedUniversityIds,
  savedScholarshipIds,
  appointments,
  latestAssessmentResult,
  onRemoveUniversity,
  onRemoveScholarship,
  setActiveTab,
}) => {
  const [roleMode, setRoleMode] = useState<'student' | 'parent'>('student');

  const savedUnis = UNIVERSITIES.filter((u) => savedUniversityIds.includes(u.id));
  const savedSchols = SCHOLARSHIPS.filter((s) => savedScholarshipIds.includes(s.id));

  const badges = [
    { title: 'Psychometric Pioneer', desc: 'Completed initial AI Assessment', icon: <Sparkles className="w-5 h-5 text-amber-500" />, unlocked: !!latestAssessmentResult },
    { title: 'Scholarship Scout', desc: 'Bookmarked global grant programs', icon: <Award className="w-5 h-5 text-emerald-500" />, unlocked: savedScholarshipIds.length > 0 },
    { title: 'University Explorer', desc: 'Saved target higher ed institutions', icon: <GraduationCap className="w-5 h-5 text-blue-500" />, unlocked: savedUniversityIds.length > 0 },
    { title: 'Mentorship Ready', desc: 'Scheduled a counselor session', icon: <Users className="w-5 h-5 text-indigo-500" />, unlocked: appointments.length > 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Personalized Learning & Application Hub</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {roleMode === 'student' ? 'Student Dashboard' : 'Parent Guidance Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track saved target universities, active scholarships, counselor appointments, and AI roadmaps.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-fit">
          <button
            onClick={() => setRoleMode('student')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              roleMode === 'student'
                ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setRoleMode('parent')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              roleMode === 'parent'
                ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Parent View
          </button>
        </div>
      </div>

      {roleMode === 'student' ? (
        /* STUDENT VIEW */
        <div className="space-y-8">
          
          {/* Top Overview Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 bg-gradient-to-tr from-blue-900 to-indigo-900 text-white rounded-2xl shadow-md space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-blue-300">Assessment Status</span>
              <p className="text-2xl font-extrabold">
                {latestAssessmentResult ? '96% Fit Score' : 'Not Completed'}
              </p>
              <button
                onClick={() => setActiveTab('assessment')}
                className="text-[11px] font-bold text-blue-200 underline hover:text-white"
              >
                {latestAssessmentResult ? 'View Full Blueprint' : 'Take Free Assessment'}
              </button>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Saved Universities</span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{savedUnis.length} Institutions</p>
              <button onClick={() => setActiveTab('universities')} className="text-[11px] font-bold text-blue-600 hover:underline">
                Explore Directory
              </button>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Active Scholarships</span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{savedSchols.length} Programs</p>
              <button onClick={() => setActiveTab('scholarships')} className="text-[11px] font-bold text-blue-600 hover:underline">
                Find Scholarships
              </button>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Counselor Sessions</span>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{appointments.length} Scheduled</p>
              <button onClick={() => setActiveTab('counselors')} className="text-[11px] font-bold text-blue-600 hover:underline">
                Book Session
              </button>
            </div>

          </div>

          {/* Gamification Achievements */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Student Achievement Badges</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                    b.unlocked
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-50'
                  }`}
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-xs">
                    {b.icon}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{b.title}</h4>
                  <p className="text-[10px] text-slate-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Items & Appointments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Saved Universities */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Saved Universities ({savedUnis.length})
                </h3>
                <button onClick={() => setActiveTab('universities')} className="text-xs text-blue-600 font-bold hover:underline">
                  Add More
                </button>
              </div>

              {savedUnis.length > 0 ? (
                <div className="space-y-2">
                  {savedUnis.map((u) => (
                    <div key={u.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.city}, {u.country} • Rank #{u.ranking}</p>
                      </div>
                      <button onClick={() => onRemoveUniversity(u.id)} className="p-1 text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No saved universities yet. Browse the University Explorer to add institutions.</p>
              )}
            </div>

            {/* Saved Scholarships */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-500" />
                  Saved Scholarships ({savedSchols.length})
                </h3>
                <button onClick={() => setActiveTab('scholarships')} className="text-xs text-blue-600 font-bold hover:underline">
                  Add More
                </button>
              </div>

              {savedSchols.length > 0 ? (
                <div className="space-y-2">
                  {savedSchols.map((s) => (
                    <div key={s.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{s.name}</p>
                        <p className="text-[11px] text-emerald-600 font-semibold">{s.fundingType} • {s.deadline}</p>
                      </div>
                      <button onClick={() => onRemoveScholarship(s.id)} className="p-1 text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No bookmarked scholarships yet. Browse the Scholarship Finder to add grants.</p>
              )}
            </div>

          </div>

          {/* Scheduled Appointments */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Upcoming Counselor Consultations
            </h3>

            {appointments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appointments.map((app) => (
                  <div key={app.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs border border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{app.counselorName}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-full">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-slate-500">{app.sessionType}</p>
                    <p className="font-medium text-slate-700 dark:text-slate-300">📅 {app.date} • ⏰ {app.timeSlot}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No upcoming consultations booked. Visit Counselors tab to schedule a session.</p>
            )}
          </div>

        </div>
      ) : (
        /* PARENT VIEW */
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Parent Financial & Academic Monitor</h3>
            <p className="text-xs text-slate-500">Clear overview for parents evaluating international degree costs & career readiness.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Estimated Annual Tuition Range</span>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">$0 - $35,000 / yr</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Target Scholarship Savings</span>
              <p className="text-lg font-extrabold text-emerald-600">Up to 100% Fully Funded</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Child Assessment Confidence</span>
              <p className="text-lg font-extrabold text-blue-600">96.4% High Fit</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
