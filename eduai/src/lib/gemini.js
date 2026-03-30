const KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Models confirmed available for this API key (verified via /v1)
const MODELS = [
  'gemini-1.5-flash',      // Best stable free-tier model
  'gemini-1.5-flash-8b',   // Higher rate-limit fallback
  'gemini-1.5-pro',        // Higher intelligence fallback
];

async function call(parts) {
  if (!KEY) throw new Error('Add VITE_GEMINI_API_KEY to your .env file.');

  let lastError;
  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${KEY}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        lastError = new Error(data?.error?.message || `API error ${res.status}`);
        continue; // try next model
      }
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) { lastError = new Error('Empty response.'); continue; }
      return text;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('All Gemini models failed. Check your API key at aistudio.google.com/apikey');
}

function fileToB64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function filePart(b64, mime) {
  return { inlineData: { mimeType: mime || 'application/pdf', data: b64 } };
}

export async function summarize(file) {
  const b64 = await fileToB64(file);
  return call([
    filePart(b64, file.type),
    { text: `You are an expert academic summarizer. Analyze this document and produce a clean, well-structured summary with:
- A brief overview (2-3 sentences)
- Key concepts (bullet points)
- Important definitions or formulas
- Main takeaways

Use markdown formatting with **bold** for important terms. Be concise but comprehensive.` },
  ]);
}

export async function generateQuiz(source, difficulty = 'medium') {
  const prompt = `Generate exactly 5 multiple-choice quiz questions at ${difficulty} difficulty based on the content. 
Rules: base questions ONLY on provided content, 4 options each, one correct answer.
Respond with ONLY a JSON array, no markdown fences:
[{"q":"Question?","opts":["A","B","C","D"],"answer":1,"explanation":"Why this is correct."}]`;

  let parts;
  if (source instanceof File) {
    const b64 = await fileToB64(source);
    parts = [filePart(b64, source.type), { text: prompt }];
  } else {
    parts = [{ text: `Topic: ${source}\n\n${prompt}` }];
  }

  const text = await call(parts);
  let json = text.trim();
  const fence = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) json = fence[1].trim();
  const arr = json.match(/\[[\s\S]*\]/);
  if (arr) json = arr[0];
  const qs = JSON.parse(json);
  return qs
    .filter(q => q.q && Array.isArray(q.opts) && q.opts.length === 4 && typeof q.answer === 'number')
    .map((q, i) => ({ id: i + 1, ...q, answer: Math.max(0, Math.min(3, q.answer)) }));
}

export async function generateFlashcards(source) {
  const prompt = `Generate exactly 8 flashcards from the content. Each card has a clear question on the front and a concise answer on the back.
Respond with ONLY a JSON array:
[{"front":"Question or term?","back":"Answer or definition","topic":"Topic name"}]`;

  let parts;
  if (source instanceof File) {
    const b64 = await fileToB64(source);
    parts = [filePart(b64, source.type), { text: prompt }];
  } else {
    parts = [{ text: `Topic: ${source}\n\n${prompt}` }];
  }

  const text = await call(parts);
  let json = text.trim();
  const fence = json.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) json = fence[1].trim();
  const arr = json.match(/\[[\s\S]*\]/);
  if (arr) json = arr[0];
  const cards = JSON.parse(json);
  return cards.filter(c => c.front && c.back).map((c, i) => ({ id: i + 1, ...c }));
}

export async function askQuestion(question, context) {
  let parts;
  if (context instanceof File) {
    const b64 = await fileToB64(context);
    parts = [
      filePart(b64, context.type),
      { text: `Using ONLY the provided document as your knowledge source, answer this question clearly and concisely:\n\n${question}\n\nIf the answer isn't in the document, say so. Format with markdown where helpful.` },
    ];
  } else {
    const ctxNote = context ? `Context: ${context}\n\n` : '';
    parts = [{ text: `${ctxNote}Answer this academic question clearly and concisely:\n\n${question}\n\nUse markdown formatting where helpful.` }];
  }
  return call(parts);
}
