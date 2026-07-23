import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const SYSTEM_PROMPT = `
You are "AI Shumani", an AI recruiter chatbot for Shumani Marvellous Raludzingana's portfolio website.
Your goal is to answer questions from recruiters about Shumani's skills, projects, experience, and education, and convince them to hire him.

Context about Shumani:
- Location: South Africa
- Role: Software Developer
- Education: BSc Computer Science (University of the Western Cape, 2020-2024), AI Software Developer Learnership (Initium Venture Solutions, 2025-2026)
- Experience: Software Developer Intern at SISOL Connex (Jan 2026 - Mar 2026) where he used Python, automation, full-stack, and testing.
- Skills: React, JavaScript, Firebase, Git/GitHub, Python, Tailwind CSS, SQL, Java, C#, OOP, Cybersecurity fundamentals.
- Projects: Portfolio websites, Inventory systems, AI chatbot ideas, Web applications.
- Career Goals: Wants to build practical, data-driven solutions, interested in AI and Cybersecurity.

Rules for AI Shumani:
1. Speak in first person as the AI representing Shumani. (e.g. "Shumani is skilled in React...") or introduce yourself as "AI Shumani".
2. Be professional, confident, yet friendly and concise (max 3 sentences per response).
3. Always ask follow-up questions to engage the recruiter (e.g., "What tech stack does your team use?").
4. If asked something outside of Shumani's professional life, politely redirect back to his qualifications.
5. Encourage recruiters to download his CV or use the Contact button.
`;

const buildFallbackReply = (messages) => {
  const latestUserMessage = [...messages].reverse().find(message => message.role === 'user')?.content?.toLowerCase() || '';

  if (latestUserMessage.includes('skill') || latestUserMessage.includes('tech') || latestUserMessage.includes('language')) {
    return 'Shumani is strong in Python, Java, C#, SQL, JavaScript, HTML5, CSS3, Git/GitHub, and practical software development. He also works well with OOP, data structures, algorithms, system design, testing, and database systems.';
  }

  if (latestUserMessage.includes('project') || latestUserMessage.includes('portfolio')) {
    return 'Shumani has built a portfolio website, a CV generator, a weather app, a currency converter, and a romantic interactive website, plus a GitHub project focused on option-pricing techniques. He enjoys building practical and user-focused web applications.';
  }

  if (latestUserMessage.includes('experience') || latestUserMessage.includes('intern')) {
    return 'Shumani completed a Software Developer Intern role at SISOL Connex, where he worked on Python scripts, automation tools, full-stack development, debugging, testing, and performance improvements. He also completed an AI Software Developer Learnership focused on real-world AI and software development work.';
  }

  if (latestUserMessage.includes('education') || latestUserMessage.includes('study') || latestUserMessage.includes('degree')) {
    return 'Shumani holds a Bachelor of Science in Computer Science from the University of the Western Cape, with coursework in data structures, algorithms, software development, AI, machine learning, networking, and databases.';
  }

  return 'Hi, I’m AI Shumani. Shumani is a Software Developer and Computer Science graduate with a strong interest in AI, backend development, and building practical solutions. He is especially interested in clean, scalable, and business-focused technology. If you would like, I can tell you more about his skills, experience, or projects.';
};

app.post('/api/chat', async (req, res) => {
  const requestMessages = Array.isArray(req.body?.messages) ? req.body.messages : null;

  try {
    if (!requestMessages) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!openai) {
      const fallbackReply = buildFallbackReply(requestMessages);
      return res.json({ reply: fallbackReply });
    }

    // Format messages for OpenAI
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...requestMessages.map(m => ({ role: m.role, content: m.content }))
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('OpenAI Error:', error);

    if (error?.status === 429 || error?.code === 'insufficient_quota') {
      const fallbackReply = buildFallbackReply(requestMessages);
      return res.json({ reply: fallbackReply });
    }

    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
