import React from 'react';
import { Check, Sparkles, Zap, Building, Users } from 'lucide-react';
import { TabType } from '../types';

interface PricingViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ setActiveTab }) => {
  const plans = [
    {
      name: 'Free Student Plan',
      price: '$0',
      period: 'forever free',
      description: 'Essential AI psychometrics, university searching, and scholarship directory for every applicant.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      features: [
        'Full Psychometric Career Assessment',
        'Directory of 500+ Global Universities',
        'Scholarship Finder with Direct Links',
        'Global Search & AI Chat Assistant (10/day)',
        'Personal Student Dashboard',
      ],
      buttonText: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro Applicant',
      price: '$12',
      period: 'per month',
      description: 'Advanced AI SOP optimization, unlimited mock interview coaching, and priority counselor discounts.',
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      features: [
        'Everything in Free Plan',
        'Unlimited AI Voice Mock Interviews',
        'Deep Statement of Purpose (SOP) Analyzer',
        'ATS Resume Scanner & Bullet Rewriter',
        '15% Discount on Certified Counselor Sessions',
        'Unlimited AI Guidance Chat',
      ],
      buttonText: 'Start 7-Day Free Trial',
      popular: true,
    },
    {
      name: 'School / Institution',
      price: '$199',
      period: 'per year',
      description: 'Empower high schools and academies with bulk student licenses, analytics, and dedicated counselor tools.',
      icon: <Building className="w-5 h-5 text-emerald-500" />,
      features: [
        'Up to 250 Student Seat Licenses',
        'School Admin & Progress Analytics',
        'Customized Local Scholarship Database',
        'Dedicated Career Counselor Portal',
        'Priority Technical Support',
      ],
      buttonText: 'Contact Institutional Sales',
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Transparent, Accessible Pricing
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Core AI assessment and university search are 100% free forever for students worldwide.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all ${
              plan.popular
                ? 'bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white shadow-2xl ring-2 ring-blue-500 relative'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {plan.icon}
                <h3 className={`text-lg font-bold ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
              </div>

              <div>
                <span className="text-3xl sm:text-4xl font-extrabold">{plan.price}</span>
                <span className={`text-xs ml-1 font-medium ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                  /{plan.period}
                </span>
              </div>

              <p className={`text-xs leading-relaxed ${plan.popular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                {plan.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-200/40 dark:border-slate-800 text-xs">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className={`w-4 h-4 shrink-0 ${plan.popular ? 'text-emerald-400' : 'text-emerald-500'}`} />
                    <span className={plan.popular ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('assessment')}
              className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                plan.popular
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-slate-950 shadow-lg'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
