import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { AIChatAssistant } from './components/AIChatAssistant';

import { HomeView } from './views/HomeView';
import { AssessmentView } from './views/AssessmentView';
import { UniversitiesView } from './views/UniversitiesView';
import { ScholarshipsView } from './views/ScholarshipsView';
import { CareersView } from './views/CareersView';
import { CounselorsView } from './views/CounselorsView';
import { ResumeBuilderView } from './views/ResumeBuilderView';
import { InterviewCoachView } from './views/InterviewCoachView';
import { DashboardView } from './views/DashboardView';
import { PricingView } from './views/PricingView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';

import { TabType, CounselorAppointment, AssessmentResult } from './types';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'ur' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: 'student' | 'parent' } | null>({
    name: 'Fatima Noor',
    email: 'fatima@hidayat.ai',
    role: 'student',
  });

  // Global Saved States
  const [savedUniversityIds, setSavedUniversityIds] = useState<string[]>(['uni-1', 'uni-2']);
  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>(['schol-1', 'schol-3']);
  const [appointments, setAppointments] = useState<CounselorAppointment[]>([
    {
      id: 'app-1',
      counselorId: 'coun-1',
      counselorName: 'Dr. Sarah Jenkins',
      date: '2026-08-10',
      timeSlot: '04:00 PM - 04:45 PM',
      sessionType: '1-on-1 Strategy',
      status: 'Confirmed',
    },
  ]);
  const [latestAssessmentResult, setLatestAssessmentResult] = useState<AssessmentResult | null>(null);

  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Keyboard shortcut (⌘K or Ctrl+K) to toggle Global Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSaveUniversity = (id: string) => {
    setSavedUniversityIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSaveScholarship = (id: string) => {
    setSavedScholarshipIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBookAppointment = (appointment: CounselorAppointment) => {
    setAppointments((prev) => [appointment, ...prev]);
  };

  const handleSaveResultToDashboard = (result: AssessmentResult) => {
    setLatestAssessmentResult(result);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        user={user}
      />

      {/* Main View Container */}
      <main className="flex-1 pt-20">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onOpenAssessment={() => setActiveTab('assessment')}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentView
            setActiveTab={setActiveTab}
            onSaveResultToDashboard={handleSaveResultToDashboard}
          />
        )}

        {activeTab === 'universities' && (
          <UniversitiesView
            savedUniversityIds={savedUniversityIds}
            onToggleSaveUniversity={toggleSaveUniversity}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipsView
            savedScholarshipIds={savedScholarshipIds}
            onToggleSaveScholarship={toggleSaveScholarship}
          />
        )}

        {activeTab === 'careers' && (
          <CareersView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'counselors' && (
          <CounselorsView onBookAppointment={handleBookAppointment} />
        )}

        {activeTab === 'resume' && (
          <ResumeBuilderView />
        )}

        {activeTab === 'interview' && (
          <InterviewCoachView />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            savedUniversityIds={savedUniversityIds}
            savedScholarshipIds={savedScholarshipIds}
            appointments={appointments}
            latestAssessmentResult={latestAssessmentResult}
            onRemoveUniversity={toggleSaveUniversity}
            onRemoveScholarship={toggleSaveScholarship}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'blog' && (
          <BlogView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Modals & Floating AI Chat Widget */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        setActiveTab={setActiveTab}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={(newUser) => setUser(newUser)}
      />

      <AIChatAssistant />

    </div>
  );
}

export default App;
