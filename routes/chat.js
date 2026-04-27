const express = require('express');
const router = express.Router();

const SYSTEM_PROMPT = `You are a friendly chat assistant for "Gilgit Adventure Treks", a travel and tourism company based in Gilgit, Pakistan specializing in Northern Pakistan tours.

OUR TOUR PACKAGES:
1. Blossom Jeep Safari — 10 Days, Spring (Mar–Apr), Easy
   Route: Islamabad → Fairy Meadows → Hunza → Khunjerab Pass → Gupis → Islamabad
2. K2 Base Camp & Gondogoro La Trek — 18–21 Days, Summer (Jun–Aug), Extreme
   Route: Islamabad → Skardu → Askole → Concordia → K2 BC → Gondogoro La → Hushe → Islamabad
3. Autumn Colors Tour — 11 Days, Oct–Nov, Easy
   Route: Islamabad → Skardu (flight) → Hunza → Khunjerab → Fairy Meadows → Naran → Islamabad
4. Summer Trekking & Tour — 12 Days, Jun–Aug, Challenging
   Route: Islamabad → Nanga Parbat Rupal Face → Hunza → Khunjerab → Hoper → Islamabad
5. October Explorer Tour — 11 Days, October, Easy
   Route: Islamabad → Skardu (flight) → Khaplu → Fairy Meadows → Hunza → Naltar → Naran → Islamabad

JEEP SAFARI PLANS:
6. Deosai Plains Jeep Safari — 7 Days, Jun–Sep, Easy
7. Fairy Meadows Jeep Safari — 6 Days, May–Oct, Moderate
8. Shandur Pass Jeep Safari — 8 Days, Jun–Sep, Moderate
9. Khunjerab Pass Jeep Safari — 7 Days, Apr–Oct, Easy
10. Shimshal Valley Jeep Safari — 9 Days, Jun–Sep, Moderate
11. Hushe Valley Jeep Safari — 9 Days, Jun–Sep, Moderate

STANDALONE DESTINATIONS: Naltar Valley, Deosai National Park, Attabad Lake & Passu

STRICT RULES:
- Keep replies SHORT — 1-2 sentences max. Never write long paragraphs.
- Match the user's energy. If they say "hello", just say hello back briefly. Do NOT dump information they didn't ask for.
- Only give details when the user ASKS a specific question.
- Only greet with "Assalam o Alaikum" on the FIRST message. Never repeat it.
- No markdown formatting (no ** or ##). Plain text only.
- NEVER mention any prices, costs, rates, or dollar/rupee amounts. If asked about pricing, tell the user to contact us on WhatsApp at +92 346 5001043 for pricing details.
- Do not list all packages unless asked. Recommend the best match for the user's interests.

Examples of good replies:
User: "hello" → "Assalam o Alaikum! How can I help you plan your Northern Pakistan adventure?"
User: "what tours do you offer?" → "We have 11 tour packages — jeep safaris, spring blossom tours, autumn color tours, summer treks, and the legendary K2 Base Camp expedition. What season are you thinking?"
User: "how much does the autumn tour cost?" → "For pricing details on the Autumn Colors Tour, please contact us on WhatsApp at +92 346 5001043. It's an 11-day tour including a Skardu flight, all meals, transport, and hotels."
User: "I want something challenging" → "Our Summer Trekking & Tour is 12 days — you'll trek to Nanga Parbat's Rupal Face and cross Khunjerab Pass. For the ultimate challenge, try the K2 Base Camp trek at 18-21 days!"
User: "do you have easy tours?" → "Yes! The Fairy Meadows Safari (6 days), Deosai Plains Safari (7 days), Khunjerab Pass Safari (7 days), Blossom Jeep Safari (10 days), Autumn Colors Tour (11 days), and October Explorer (11 days) are all rated Easy or Moderate. Contact us on WhatsApp for pricing!"`;

const chatHistory = new Map();
const MAX_CHAT_SESSIONS = 500;

function getChatId(req) {
  return req.ip || 'default';
}

// Test endpoint
router.get('/test', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.json({ status: 'FAIL', reason: 'GROQ_API_KEY not set' });
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'say hi in one sentence' }],
        max_tokens: 50
      })
    });
    const data = await resp.json();
    if (!resp.ok) return res.json({ status: 'FAIL', reason: 'AI service error' });
    res.json({ status: 'OK', reply: data.choices?.[0]?.message?.content });
  } catch (err) {
    res.json({ status: 'FAIL', reason: 'AI unavailable' });
  }
});

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI service not configured' });
  }

  try {
    const chatId = getChatId(req);
    if (!chatHistory.has(chatId)) {
      // Evict oldest session if at capacity
      if (chatHistory.size >= MAX_CHAT_SESSIONS) {
        const oldest = chatHistory.keys().next().value;
        chatHistory.delete(oldest);
      }
      chatHistory.set(chatId, []);
    }
    const history = chatHistory.get(chatId);

    history.push({ role: 'user', content: message.trim() });

    // Keep only last 10 exchanges to save tokens
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history
        ],
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content;

    if (!aiText) {
      throw new Error('No response from AI');
    }

    history.push({ role: 'assistant', content: aiText });

    res.json({ reply: aiText });
  } catch (err) {
    console.error('Chat AI error:', err.message);
    res.status(500).json({ error: 'AI unavailable' });
  }
});

// Clean up old chat histories every 30 minutes
setInterval(() => {
  chatHistory.clear();
}, 30 * 60 * 1000);

module.exports = router;
