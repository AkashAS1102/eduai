import * as pdfjs from 'pdfjs-dist';

// Configure PDF.js worker
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'llama-3.3-70b-versatile'; // High-intelligence model

async function callGroq(messages, jsonMode = false) {
  if (!KEY || KEY === 'gsk_your_key_here') {
    throw new Error('Please add a valid VITE_GROQ_API_KEY to your .env file.');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
      response_format: jsonMode ? { type: 'json_object' } : undefined
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `Groq API error ${response.status}`);
  }

  return data.choices[0].message.content;
}

export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n';
  }

  return fullText;
}

export async function summarize(file) {
  const text = await extractTextFromPDF(file);
  const prompt = `You are an expert academic summarizer. Analyze the following text and produce a clean, well-structured summary with:
- A brief overview (2-3 sentences)
- Key concepts (bullet points)
- Important definitions or formulas
- Main takeaways

Text:
${text.slice(0, 30000)} // Limiting to ~30k chars to avoid token limits for now

Use markdown formatting with **bold** for important terms. Be concise but comprehensive.`;

  return callGroq([{ role: 'user', content: prompt }]);
}

export async function generateQuiz(source, difficulty = 'medium') {
  let content = source;
  if (source instanceof File) {
    content = await extractTextFromPDF(source);
  }

  const systemPrompt = `Generate exactly 5 multiple-choice quiz questions based on the content provided.
Respond with a JSON object containing a "questions" array.
Format: {"questions": [{"q":"Question?","opts":["A","B","C","D"],"answer":1,"explanation":"Why correct"}]}`;

  const userPrompt = `Content: ${content.slice(0, 20000)}\n\nDifficulty: ${difficulty}. Generate the quiz now.`;

  const responseText = await callGroq([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], true);

  try {
    const data = JSON.parse(responseText);
    const qs = data.questions || data; // Handle variations
    return qs.map((q, i) => ({
      id: i + 1,
      ...q,
      answer: Math.max(0, Math.min(3, q.answer))
    }));
  } catch (e) {
    console.error('Failed to parse quiz JSON:', responseText);
    throw new Error('Failed to generate valid quiz data.');
  }
}

export async function generateFlashcards(source) {
  let content = source;
  if (source instanceof File) {
    content = await extractTextFromPDF(source);
  }

  const systemPrompt = `Generate exactly 8 flashcards from the content.
Respond with a JSON object containing a "cards" array.
Format: {"cards": [{"front":"Question?","back":"Answer","topic":"Topic"}]}`;

  const userPrompt = `Content: ${content.slice(0, 20000)}. Generate the flashcards now.`;

  const responseText = await callGroq([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], true);

  try {
    const data = JSON.parse(responseText);
    const cards = data.cards || data;
    return cards.map((c, i) => ({ id: i + 1, ...c }));
  } catch (e) {
    console.error('Failed to parse flashcards JSON:', responseText);
    throw new Error('Failed to generate valid flashcard data.');
  }
}

export async function askQuestion(question, context) {
  let contentNote = '';
  if (context instanceof File) {
    const text = await extractTextFromPDF(context);
    contentNote = `Context from Document:\n${text.slice(0, 20000)}\n\n`;
  } else if (context) {
    contentNote = `Context: ${context}\n\n`;
  }

  const prompt = `${contentNote}Using the provided context (if any), answer this academic question clearly and concisely:\n\n${question}\n\nIf the answer isn't in the context, use your general knowledge but mention it. Format with markdown.`;

  return callGroq([{ role: 'user', content: prompt }]);
}
