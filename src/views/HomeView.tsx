import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Users, 
  Briefcase, 
  FileText, 
  Bot, 
  ChevronRight, 
  CheckCircle, 
  Play, 
  Star, 
  Compass, 
  Globe2, 
  Zap, 
  ChevronDown,
  Search
} from 'lucide-react';
import { TabType } from '../types';
import { FAQS, BLOG_POSTS } from '../data/mockData';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
  onOpenAssessment: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [demoRole, setDemoRole] = useState('Computer Science');

  const stats = [
    { value: '500,000+', label: 'Students Guided' },
    { value: '20,000+', label: 'Global Scholarships' },
    { value: '500+', label: 'Top Universities' },
    { value: '5,000+', label: 'Career Paths' },
    { value: '2,000+', label: 'Certified Counselors' },
  ];

  const features = [
    {
      title: 'AI Career Assessment',
      description: 'Psychometric testing, interest inventory, and personality analysis delivering precision career match scores.',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      tab: 'assessment' as TabType,
      color: 'from-amber-500/10 to-amber-500/5 border-amber-500/20',
    },
    {
      title: 'University Explorer',
      description: 'Filter and compare 500+ accredited universities worldwide by tuition, acceptance rate, and rankings.',
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      tab: 'universities' as TabType,
      color: 'from-blue-500/10 to-blue-500/5 border-blue-500/20',
    },
    {
      title: 'Scholarship Finder',
      description: 'Discover fully funded global scholarships (Fulbright, Chevening, DAAD, MEXT) matched to your profile.',
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      tab: 'scholarships' as TabType,
      color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    },
    {
      title: 'Certified Counselors',
      description: 'Book 1-on-1 video sessions with top education mentors for essay review and strategy.',
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      tab: 'counselors' as TabType,
      color: 'from-indigo-500/10 to-indigo-500/5 border-indigo-500/20',
    },
    {
      title: 'ATS Resume Builder',
      description: 'Scan CVs for Applicant Tracking System score, missing keywords, and AI bullet rewrites.',
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      tab: 'resume' as TabType,
      color: 'from-purple-500/10 to-purple-500/5 border-purple-500/20',
    },
    {
      title: 'AI Interview Coach & SOP Reviewer',
      description: 'Practice real-time mock interviews with immediate scoring and polish your Statement of Purpose.',
      icon: <Bot className="w-6 h-6 text-rose-500" />,
      tab: 'interview' as TabType,
      color: 'from-rose-500/10 to-rose-500/5 border-rose-500/20',
    },
  ];

  const testimonials = [
    {
      quote: "Hidayat AI matched me with the Chevening Scholarship and guided my SOP paragraph by paragraph. I am heading to Oxford this fall!",
      author: "Fatima Noor",
      role: "M.Sc. Computer Science Candidate, Oxford University",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "The career assessment showed me a 96% fit for Bio-Informatics rather than standard pre-med. It completely saved me years of misdirection.",
      author: "Zayn Ahmed",
      role: "B.S. Bioengineering Student, ETH Zurich",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "As a parent, I wanted clear data on global university tuition costs and future salary projections. Hidayat provided all the clarity we needed.",
      author: "Dr. Rashid Khan",
      role: "Parent & Senior Educator",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 bg-[#F8FAFC] dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#2ECC71]/10 border border-[#2ECC71]/20 px-3.5 py-1.5 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-[#2ECC71] animate-ping"></span>
                <span className="text-xs font-semibold text-[#1B7E45] dark:text-[#2ECC71] uppercase tracking-wider">
                  AI-Powered Career Engine v2.0
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F4C81] dark:text-white leading-[1.1] tracking-tight">
                Discover Your <br/>
                Perfect Career <br/>
                <span className="text-[#2ECC71]">with AI</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
                Personalized recommendations, global university comparisons, and direct access to fully funded scholarships—all driven by data.
              </p>

              {/* Search Box & CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md pt-1">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Enter your interests (e.g. Robotics, Art)" 
                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
                  />
                  <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                </div>
                <button 
                  onClick={() => setActiveTab('assessment')}
                  className="h-14 px-7 bg-[#F39C12] hover:bg-[#d68910] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shrink-0"
                >
                  <span>Start AI Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Student Trust Stats */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Student" />
                  <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Student" />
                  <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Student" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="text-slate-900 dark:text-white font-bold">500,000+</span> students matched this week
                </p>
              </div>

            </div>

            {/* Right Dashboard Preview */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4C81]/15 to-transparent rounded-3xl -z-10 blur-3xl"></div>
              
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col space-y-4 p-6">
                
                {/* Dashboard Header */}
                <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0F4C81] dark:text-blue-400">FN</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Welcome, Fatima Noor</h3>
                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Analysis Progress: 85%</p>
                    </div>
                  </div>
                  <div className="w-28 sm:w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-[#2ECC71]"></div>
                  </div>
                </div>

                {/* Main Career Fit Card */}
                <div className="bg-[#0F4C81] p-5 rounded-2xl text-white shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-[#2ECC71] uppercase tracking-wider mb-1">Top Career Fit</p>
                      <h4 className="text-2xl font-bold">Data Scientist</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-white">98%</p>
                      <p className="text-[10px] opacity-80">Match Score</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                      <p className="text-[9px] uppercase opacity-70">Avg. Salary</p>
                      <p className="text-xs font-bold">$110k - $160k</p>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-xs">
                      <p className="text-[9px] uppercase opacity-70">Education Path</p>
                      <p className="text-xs font-bold">B.S. Comp Sci</p>
                    </div>
                  </div>
                </div>

                {/* Universities & Deadlines Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl hover:border-[#F39C12] transition-colors bg-white dark:bg-slate-900">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Target Universities</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-blue-100 text-[#0F4C81] font-bold text-[9px] flex items-center justify-center">S</div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Stanford Uni.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-red-100 text-red-700 font-bold text-[9px] flex items-center justify-center">M</div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">MIT</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-slate-100 dark:border-slate-800 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Upcoming Deadlines</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Fulbright Scholar</span>
                        <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">2d</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Erasmus Mundus</span>
                        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">14d</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Counselor Banner */}
                <div className="bg-[#F39C12]/10 border border-dashed border-[#F39C12]/40 p-3.5 rounded-2xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F39C12] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#F39C12]">Counselor Online</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">Dr. Sarah is available now.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('counselors')}
                    className="text-[10px] font-bold text-white bg-[#F39C12] hover:bg-[#d68910] px-3 py-1.5 rounded-lg shadow-xs shrink-0 cursor-pointer"
                  >
                    Join Session
                  </button>
                </div>

              </div>

              {/* Floating Chat Bubble */}
              <div className="absolute -bottom-3 -left-4 sm:-left-6 bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 flex items-center gap-3 max-w-[240px] z-20">
                <div className="w-8 h-8 rounded-full bg-[#2ECC71] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-snug">
                  "I found a matching scholarship in Germany for you!"
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F4C81] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-blue-900">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="pt-4 md:pt-0">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#2ECC71]">
                  {s.value}
                </p>
                <p className="text-xs text-slate-200 font-medium mt-1 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81] dark:text-white">
            Comprehensive Career Ecosystem
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Everything you need from high school career choices to university admissions, scholarship securing, and interview success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(f.tab)}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-[#0F4C81] hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 shadow-xs flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0F4C81] dark:group-hover:text-blue-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-1 text-xs font-bold text-[#0F4C81] dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Read how Hidayat AI changed the trajectories of top applicants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.author}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Everything you need to know about Hidayat AI platform capabilities
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-bold text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-10 sm:p-14 overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discover Your Future Career?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join 500,000+ students leveraging AI for career suitability matching, university search, and full scholarship success.
            </p>
            <button
              onClick={() => setActiveTab('assessment')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-900 font-extrabold text-sm rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-slate-900" />
              <span>Take Free Career Assessment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
