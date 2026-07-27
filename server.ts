import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// ES Module / CommonJS directory resolution safety
const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = 3000;

// Shared Gemini AI Client Initialization
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Gemini API endpoints will use fallback responses.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'DUMMY_KEY',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. AI Chat Assistant Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], userProfile } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Intelligent fallback if key not configured
      return res.json({
        reply: `Hidayat AI Guidance (Demo Mode): You asked: "${message}". I recommend exploring Computer Science, Data Science, or Bio-Informatics based on global job market trends! Complete our full Assessment in the app for a tailored roadmap.`,
      });
    }

    const ai = getGeminiClient();
    const systemInstruction = `You are Hidayat AI, an empathetic, highly knowledgeable career advisor, study abroad counselor, and educational mentor for students worldwide. 
You offer advice on high-demand careers, top global/local universities, scholarships (Fulbright, Chevening, DAAD, MEXT, etc.), ATS resume tips, and interview strategies.
User Context: ${JSON.stringify(userProfile || {})}
Keep answers clear, highly structured with bullet points, encouraging, and actionable. Be polite and concise.`;

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Replay brief recent history if available
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-4)) {
        if (h.role === 'user') {
          await chat.sendMessage({ message: h.content });
        }
      }
    }

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      error: 'Failed to generate AI response',
      details: error.message || String(error),
      reply: 'I am temporarily experiencing heavy traffic. Here is a helpful tip: Check out our Career Assessment tab to discover high-paying fields in AI, Data Engineering, Healthcare, and Sustainable Tech!',
    });
  }
});

// 2. AI Career Assessment Evaluator Route
app.post('/api/assessment', async (req, res) => {
  try {
    const formData = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response for offline / missing key testing
      return res.json({
        topCareers: [
          {
            title: 'AI & Machine Learning Engineer',
            fitScore: 96,
            description: 'Design and deploy scalable neural networks and intelligence systems.',
            averageSalary: '$110,000 - $160,000/yr',
            futureDemand: 'Very High (+32%)',
            requiredSkills: ['Python', 'PyTorch/TensorFlow', 'Linear Algebra', 'Problem Solving'],
            educationPath: 'B.S. in Computer Science / AI -> M.S. or Specialized Certifications',
          },
          {
            title: 'Data Scientist & Analytics Lead',
            fitScore: 92,
            description: 'Extract actionable insights from multi-modal big data for decision making.',
            averageSalary: '$95,000 - $140,000/yr',
            futureDemand: 'High (+28%)',
            requiredSkills: ['SQL', 'Python/R', 'Statistics', 'Data Visualization'],
            educationPath: 'B.S. in Data Science, Statistics or Mathematics',
          },
          {
            title: 'Biomedical Informatics Specialist',
            fitScore: 88,
            description: 'Bridge software algorithms with genomic data and modern health technologies.',
            averageSalary: '$90,000 - $135,000/yr',
            futureDemand: 'High (+24%)',
            requiredSkills: ['Bioinformatics', 'Genomics', 'Python', 'Biostatistics'],
            educationPath: 'B.S. in Bioinformatics or Biotechnology',
          },
        ],
        strengths: ['Analytical Reasoning', 'Quantitative Analysis', 'Pattern Recognition', 'Adaptability'],
        weaknessesToImprove: ['Public Speaking', 'Delegation', 'Time Management under strict pressure'],
        recommendedUniversities: [
          { name: 'MIT - Massachusetts Institute of Technology', country: 'USA', match: '98%' },
          { name: 'ETH Zurich', country: 'Switzerland', match: '94%' },
          { name: 'National University of Singapore (NUS)', country: 'Singapore', match: '91%' },
        ],
        recommendedScholarships: [
          { name: 'Fulbright Foreign Student Program', funding: 'Fully Funded', deadline: 'October 2026' },
          { name: 'DAAD Scholarships Germany', funding: 'Fully Funded', deadline: 'November 2026' },
        ],
        learningRoadmap: [
          { month: 'Months 1-3', goal: 'Master Core Programming & Mathematics Foundations' },
          { month: 'Months 4-6', goal: 'Build 3 Portfolio Projects in Machine Learning/Data Analysis' },
          { month: 'Months 7-12', goal: 'Apply for Internships & Prep University/Job Applications' },
        ],
      });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze this student's psychometric profile and generate detailed career guidance recommendations in valid JSON:
Profile Data:
${JSON.stringify(formData, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topCareers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  fitScore: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                  averageSalary: { type: Type.STRING },
                  futureDemand: { type: Type.STRING },
                  requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  educationPath: { type: Type.STRING },
                },
                required: ['title', 'fitScore', 'description', 'averageSalary', 'futureDemand', 'requiredSkills', 'educationPath'],
              },
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknessesToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedUniversities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  country: { type: Type.STRING },
                  match: { type: Type.STRING },
                },
                required: ['name', 'country', 'match'],
              },
            },
            recommendedScholarships: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  funding: { type: Type.STRING },
                  deadline: { type: Type.STRING },
                },
                required: ['name', 'funding', 'deadline'],
              },
            },
            learningRoadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  goal: { type: Type.STRING },
                },
                required: ['month', 'goal'],
              },
            },
          },
          required: ['topCareers', 'strengths', 'weaknessesToImprove', 'recommendedUniversities', 'recommendedScholarships', 'learningRoadmap'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Assessment API Error:', error);
    res.status(500).json({ error: 'Failed to evaluate assessment' });
  }
});

// 3. AI ATS Resume Analyzer
app.post('/api/ats-resume', async (req, res) => {
  try {
    const { resumeText, targetJobTitle } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        atsScore: 84,
        summary: 'Solid resume structure! Good action verbs and clear contact header.',
        formattingScore: 90,
        keywordScore: 78,
        impactScore: 82,
        missingKeywords: ['Agile / Scrum', 'CI/CD Pipelines', 'Automated Testing', 'Docker / Kubernetes'],
        strengths: ['Clear project achievements', 'Measurable metrics used in experience', 'Clean formatting'],
        improvementSuggestions: [
          'Add a dedicated skills summary section at the top.',
          'Quantify team sizes and percentage performance improvements.',
          'Tailor bullet points specifically to job descriptions.',
        ],
        rewrittenBulletPoints: [
          'Before: "Worked on React web application for clients."',
          'After: "Engineered scalable React SPA serving 50k+ active users, improving page load speeds by 35%."',
        ],
      });
    }

    const ai = getGeminiClient();
    const prompt = `You are an expert ATS (Applicant Tracking System) Resume Scanner and HR recruiter. 
Analyze the provided resume against target title "${targetJobTitle || 'General Professional'}":
Resume Content:
${resumeText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            formattingScore: { type: Type.NUMBER },
            keywordScore: { type: Type.NUMBER },
            impactScore: { type: Type.NUMBER },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            rewrittenBulletPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['atsScore', 'summary', 'formattingScore', 'keywordScore', 'impactScore', 'missingKeywords', 'strengths', 'improvementSuggestions', 'rewrittenBulletPoints'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('ATS Resume Error:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

// 4. AI Mock Interview Coach & Question Generator
app.post('/api/interview', async (req, res) => {
  try {
    const { role, userResponse, currentQuestion } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      if (userResponse && currentQuestion) {
        return res.json({
          feedback: 'Great response! You structured your answer using the STAR method well. Try adding more concrete numbers or financial/metric impact.',
          ratingScore: 88,
          improvedAnswer: `To make it even stronger: "When I faced ${currentQuestion.slice(0, 30)}..., I initiated a structured sprint that reduced downtime by 20%."`,
          nextQuestion: 'Tell me about a time you had a disagreement with a team member or project lead and how you resolved it.',
        });
      }
      return res.json({
        questions: [
          'Tell me about yourself and why you are interested in a career in ' + (role || 'this field') + '?',
          'What is a complex technical or analytical problem you solved recently?',
          'How do you handle tight project deadlines and unexpected technical roadblocks?',
        ],
      });
    }

    const ai = getGeminiClient();

    if (userResponse && currentQuestion) {
      // Evaluate user answer
      const prompt = `Act as a senior interviewer hiring for "${role || 'Software & Tech'}". 
Question asked: "${currentQuestion}"
Candidate Answer: "${userResponse}"
Provide feedback, a score (1-100), an optimized answer, and the next logical interview question.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              feedback: { type: Type.STRING },
              ratingScore: { type: Type.NUMBER },
              improvedAnswer: { type: Type.STRING },
              nextQuestion: { type: Type.STRING },
            },
            required: ['feedback', 'ratingScore', 'improvedAnswer', 'nextQuestion'],
          },
        },
      });
      return res.json(JSON.parse(response.text || '{}'));
    } else {
      // Generate initial questions
      const prompt = `Generate 5 realistic, industry-aligned interview questions for role: "${role || 'General Industry'}".`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['questions'],
          },
        },
      });
      return res.json(JSON.parse(response.text || '{}'));
    }
  } catch (error: any) {
    console.error('Interview Coach Error:', error);
    res.status(500).json({ error: 'Failed to process interview coach' });
  }
});

// 5. AI Statement of Purpose (SOP) Reviewer
app.post('/api/sop-review', async (req, res) => {
  try {
    const { sopText, targetProgram } = req.body;
    if (!sopText) {
      return res.status(400).json({ error: 'SOP text is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        overallRating: 85,
        clarityScore: 88,
        motivationScore: 82,
        academicMatchScore: 86,
        keyStrengths: ['Clear academic progression', 'Specific interest in faculty research', 'Strong closing statement'],
        areasToImprove: [
          'Elaborate more on specific undergraduate research projects or capstone work.',
          'Connect future career goals directly with the specific curriculum electives.',
        ],
        polishedIntroSnippet: 'My passion for leveraging data-driven intelligence to solve complex global challenges began during my undergraduate research...',
      });
    }

    const ai = getGeminiClient();
    const prompt = `Review this university Statement of Purpose (SOP) for program "${targetProgram || 'Graduate Admissions'}":
SOP Text:
${sopText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallRating: { type: Type.NUMBER },
            clarityScore: { type: Type.NUMBER },
            motivationScore: { type: Type.NUMBER },
            academicMatchScore: { type: Type.NUMBER },
            keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
            polishedIntroSnippet: { type: Type.STRING },
          },
          required: ['overallRating', 'clarityScore', 'motivationScore', 'academicMatchScore', 'keyStrengths', 'areasToImprove', 'polishedIntroSnippet'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('SOP Review Error:', error);
    res.status(500).json({ error: 'Failed to review SOP' });
  }
});

// Vite middleware for development vs static serve for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hidayat Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
