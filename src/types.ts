export type TabType = 
  | 'home' 
  | 'assessment' 
  | 'universities' 
  | 'scholarships' 
  | 'careers' 
  | 'counselors' 
  | 'resume' 
  | 'interview'
  | 'dashboard' 
  | 'pricing' 
  | 'blog' 
  | 'contact';

export type Language = 'EN' | 'UR' | 'AR';

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  acceptanceRate: string;
  tuitionFee: string;
  logo: string;
  image: string;
  description: string;
  degreeLevels: ('Bachelors' | 'Masters' | 'PhD')[];
  popularPrograms: string[];
  publicOrPrivate: 'Public' | 'Private';
  scholarshipsAvailable: boolean;
  applicationDeadline: string;
  accreditation: string;
  website: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  country: string;
  fundingType: 'Fully Funded' | 'Partial' | 'Tuition Waiver' | 'Stipend Only';
  fundingAmount: string;
  degreeLevel: ('Bachelors' | 'Masters' | 'PhD')[];
  eligibleFields: string[];
  deadline: string;
  genderEligibility: 'All' | 'Female Only' | 'Male Only';
  description: string;
  requirements: string[];
  link: string;
  isBookmarked?: boolean;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  averageSalary: string;
  futureDemand: 'Very High (+30%)' | 'High (+20%)' | 'Moderate' | 'Emerging';
  requiredSkills: string[];
  educationPath: string;
  topUniversities: string[];
  jobOutlook: string;
  relatedCareers: string[];
  iconName: string;
}

export interface Counselor {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  specializations: string[];
  pricingPerSession: string;
  availability: string;
  avatar: string;
  bio: string;
  education: string;
}

export interface CounselorAppointment {
  id: string;
  counselorId: string;
  counselorName: string;
  date: string;
  timeSlot: string;
  sessionType: '1-on-1 Strategy' | 'Resume Review' | 'University Application Guidance';
  status: 'Confirmed' | 'Completed' | 'Upcoming';
}

export interface AssessmentForm {
  academicBackground: string;
  interests: string[];
  skills: string[];
  personalityType: string;
  preferredSubjects: string[];
  financialSituation: string;
  preferredCountry: string;
  careerGoals: string;
}

export interface AssessmentResult {
  topCareers: {
    title: string;
    fitScore: number;
    description: string;
    averageSalary: string;
    futureDemand: string;
    requiredSkills: string[];
    educationPath: string;
  }[];
  strengths: string[];
  weaknessesToImprove: string[];
  recommendedUniversities: {
    name: string;
    country: string;
    match: string;
  }[];
  recommendedScholarships: {
    name: string;
    funding: string;
    deadline: string;
  }[];
  learningRoadmap: {
    month: string;
    goal: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string;
}

export interface UserSavedItems {
  savedUniversities: string[];
  savedScholarships: string[];
  savedCareers: string[];
  appointments: CounselorAppointment[];
  completedAssessmentScore: number | null;
}
