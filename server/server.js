import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Format messages for OpenAI
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({ role: m.role, content: m.content }))
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
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
