import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  BarChart3, 
  GraduationCap, 
  Award, 
  Compass, 
  RefreshCw, 
  Save, 
  Bookmark,
  TrendingUp,
  BrainCircuit,
  Target
} from 'lucide-react';
import { AssessmentForm, AssessmentResult, TabType } from '../types';

interface AssessmentViewProps {
  setActiveTab: (tab: TabType) => void;
  onSaveResultToDashboard: (result: AssessmentResult) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  setActiveTab,
  onSaveResultToDashboard,
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const [formData, setFormData] = useState<AssessmentForm>({
    academicBackground: 'High School Senior / Pre-University (GPA 3.8/4.0)',
    interests: ['Artificial Intelligence', 'Software Development', 'Data Analysis'],
    skills: ['Problem Solving', 'Python Coding', 'Logical Reasoning', 'Mathematics'],
    personalityType: 'Analytical & Methodical Thinker',
    preferredSubjects: ['Computer Science', 'Mathematics', 'Physics', 'Biology'],
    financialSituation: 'Requires Fully Funded or Partial Scholarship',
    preferredCountry: 'USA, UK, Germany, Switzerland or Singapore',
    careerGoals: 'Lead innovative AI research or start an impactful tech enterprise.',
  });

  const availableInterests = [
    'Artificial Intelligence', 'Software Development', 'Data Analysis', 'Cybersecurity',
    'Biotechnology & Genomics', 'Renewable Energy', 'Quantitative Finance', 'Robotics',
    'Business Management', 'Public Policy', 'Ui/Ux Product Design', 'Medicine & Surgery'
  ];

  const availableSkills = [
    'Problem Solving', 'Python Coding', 'Logical Reasoning', 'Mathematics',
    'Public Speaking', 'Data Visualization', 'Project Leadership', 'Critical Thinking',
    'Creative Writing', 'Team Collaboration'
  ];

  const toggleInterest = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const toggleSkill = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(item)
        ? prev.skills.filter((s) => s !== item)
        : [...prev.skills, item],
    }));
  };

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        topCareers: [
          {
            title: 'AI & Machine Learning Specialist',
            fitScore: 96,
            description: 'Develop neural models and automation pipelines for global software systems.',
            averageSalary: '$115,000 - $165,000 / yr',
            futureDemand: 'Very High (+30%)',
            requiredSkills: ['Python', 'PyTorch', 'Data Structures', 'Statistics'],
            educationPath: 'B.S. in CS/AI -> M.S. in Machine Learning',
          },
        ],
        strengths: ['Quantitative Reasoning', 'System Architecture', 'Adaptability'],
        weaknessesToImprove: ['Public Presentation', 'Delegation Under Stress'],
        recommendedUniversities: [
          { name: 'MIT', country: 'USA', match: '98%' },
          { name: 'ETH Zurich', country: 'Switzerland', match: '94%' },
        ],
        recommendedScholarships: [
          { name: 'Fulbright Foreign Student Program', funding: 'Fully Funded', deadline: 'October 2026' },
        ],
        learningRoadmap: [
          { month: 'Months 1-3', goal: 'Complete Python & Linear Algebra Masterclass' },
          { month: 'Months 4-6', goal: 'Build 2 Machine Learning Open Source Repositories' },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 4;
  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Psychometric & Career Matching Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Discover Your Perfect Career Path
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Answer a few quick questions about your academic history, strengths, and financial goals to generate a personalized career blueprint.
        </p>
      </div>

      {!result ? (
        /* Multi-step Questionnaire Card */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>Step {step} of {totalSteps}</span>
              <span>{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Academic & Subject Interests */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>1. Academic Background & Preferred Subjects</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Current Educational Level & GPA
                </label>
                <select
                  value={formData.academicBackground}
                  onChange={(e) => setFormData({ ...formData, academicBackground: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option>High School Senior / Pre-University (GPA 3.8/4.0)</option>
                  <option>High School Student (A-Levels / FSc)</option>
                  <option>Undergraduate Student (B.S. / B.A. Candidate)</option>
                  <option>Recent College Graduate</option>
                  <option>Master's / Postgraduate Student</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Interests & Fields You Enjoy
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((item) => {
                    const selected = formData.interests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          selected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item} {selected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills & Strengths */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-600" />
                <span>2. Core Skills & Personality Style</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Your Strongest Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((item) => {
                    const selected = formData.skills.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSkill(item)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          selected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item} {selected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Personality & Working Style
                </label>
                <select
                  value={formData.personalityType}
                  onChange={(e) => setFormData({ ...formData, personalityType: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option>Analytical & Methodical Thinker</option>
                  <option>Creative & Visual Innovator</option>
                  <option>Empathic Community Leader</option>
                  <option>Strategic Business Mindset</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Financial & Country Preferences */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>3. Financial Budget & Country Preferences</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Financial Situation & Scholarship Need
                </label>
                <select
                  value={formData.financialSituation}
                  onChange={(e) => setFormData({ ...formData, financialSituation: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option>Requires Fully Funded Scholarship (Full Tuition + Living Stipend)</option>
                  <option>Requires Partial Scholarship / Tuition Discount</option>
                  <option>Self-Funded / Open to Budget Universities</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Preferred Target Countries
                </label>
                <input
                  type="text"
                  value={formData.preferredCountry}
                  onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. USA, UK, Germany, Canada, Japan"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Vision & Goals */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-600" />
                <span>4. Ultimate Career Goals & Vision</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Describe Your Dream Career or Impact Goal
                </label>
                <textarea
                  rows={4}
                  value={formData.careerGoals}
                  onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. I want to build medical diagnostics software or solve clean energy storage..."
                />
              </div>
            </div>
          )}

          {/* Nav Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEvaluate}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 hover:scale-105 transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Psychometrics...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Career Report</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Evaluation Results Display */
        <div className="space-y-8 animate-in fade-in">
          
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold rounded-full">
                EVALUATION COMPLETE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Your AI Career Blueprint</h2>
              <p className="text-xs text-slate-300">
                Generated based on psychometric inputs & global education datasets
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onSaveResultToDashboard(result)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save to Dashboard</span>
              </button>
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake</span>
              </button>
            </div>
          </div>

          {/* Recommended Careers */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Top Recommended Careers</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.topCareers.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{c.averageSalary}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-extrabold rounded-full border border-blue-200 dark:border-blue-800">
                      {c.fitScore}% Fit Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Required Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.requiredSkills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[11px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Identified Core Strengths</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Key Areas to Improve</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {result.weaknessesToImprove.map((w, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Universities & Scholarships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Top Universities For You
                </span>
                <button onClick={() => setActiveTab('universities')} className="text-xs text-blue-600 hover:underline">
                  View All
                </button>
              </h4>
              <div className="space-y-2">
                {result.recommendedUniversities.map((u, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{u.name}</p>
                      <p className="text-[11px] text-slate-500">{u.country}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold rounded-lg">
                      {u.match}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Matching Scholarships
                </span>
                <button onClick={() => setActiveTab('scholarships')} className="text-xs text-blue-600 hover:underline">
                  View All
                </button>
              </h4>
              <div className="space-y-2">
                {result.recommendedScholarships.map((s, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{s.name}</p>
                      <p className="text-[11px] text-amber-600 font-semibold">{s.funding}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{s.deadline}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Learning Roadmap */}
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>Step-by-Step Action Roadmap</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.learningRoadmap.map((r, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold rounded-full">
                    {r.month}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {r.goal}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
