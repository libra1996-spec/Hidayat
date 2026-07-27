import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle, 
  Globe, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COUNSELORS } from '../data/mockData';
import { Counselor, CounselorAppointment } from '../types';

interface CounselorsViewProps {
  onBookAppointment: (appointment: CounselorAppointment) => void;
}

export const CounselorsView: React.FC<CounselorsViewProps> = ({ onBookAppointment }) => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-08-05');
  const [bookingTime, setBookingTime] = useState('04:00 PM - 04:45 PM');
  const [sessionType, setSessionType] = useState<'1-on-1 Strategy' | 'Resume Review' | 'University Application Guidance'>('1-on-1 Strategy');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleConfirmBooking = () => {
    if (!selectedCounselor) return;

    const newAppointment: CounselorAppointment = {
      id: 'app-' + Date.now(),
      counselorId: selectedCounselor.id,
      counselorName: selectedCounselor.name,
      date: bookingDate,
      timeSlot: bookingTime,
      sessionType: sessionType,
      status: 'Confirmed',
    };

    onBookAppointment(newAppointment);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedCounselor(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Users className="w-3.5 h-3.5" />
          <span>2,000+ Verified International Advisors</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Certified Career Counselor Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Book 1-on-1 video consultations with former Ivy League admissions officers, Fulbright alumni, and industry mentors.
        </p>
      </div>

      {/* Counselor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COUNSELORS.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              
              {/* Header Avatar */}
              <div className="flex items-center gap-4">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{c.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{c.title}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{c.rating} ({c.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {c.bio}
              </p>

              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Specializations:</span>
                <div className="flex flex-wrap gap-1">
                  {c.specializations.map((spec, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-medium text-[11px] rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
                <p><strong className="text-slate-700 dark:text-slate-300">Languages:</strong> {c.languages.join(', ')}</p>
                <p><strong className="text-slate-700 dark:text-slate-300">Rate:</strong> {c.pricingPerSession}</p>
                <p><strong className="text-slate-700 dark:text-slate-300">Availability:</strong> {c.availability}</p>
              </div>

            </div>

            <button
              onClick={() => setSelectedCounselor(c)}
              className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5"
            >
              <Video className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedCounselor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setSelectedCounselor(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Appointment Confirmed!</h3>
                <p className="text-xs text-slate-500">
                  Your session with {selectedCounselor.name} has been added to your Student Dashboard.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={selectedCounselor.avatar}
                    alt={selectedCounselor.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{selectedCounselor.name}</h3>
                    <p className="text-xs text-slate-500">{selectedCounselor.pricingPerSession}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Session Topic
                    </label>
                    <select
                      value={sessionType}
                      onChange={(e) => setSessionType(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <option value="1-on-1 Strategy">1-on-1 Full Career Strategy</option>
                      <option value="Resume Review">ATS Resume & CV Critique</option>
                      <option value="University Application Guidance">SOP & University Application Strategy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Select Time Slot
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    >
                      <option>02:00 PM - 02:45 PM</option>
                      <option>04:00 PM - 04:45 PM</option>
                      <option>06:00 PM - 06:45 PM</option>
                      <option>08:00 PM - 08:45 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/20"
                >
                  Confirm Video Session
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
