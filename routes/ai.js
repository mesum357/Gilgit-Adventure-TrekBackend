const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// POST /api/ai/plan - Generate AI trip itinerary
router.post('/plan', async (req, res) => {
  try {
    if (!genAI) {
      return res.status(503).json({ message: 'AI service not configured' });
    }

    const { budget, duration, interests, style } = req.body;

    const prompt = `You are a smart AI travel planner for "Gilgit Adventure Treks", a travel and tourism company based in Gilgit, Pakistan specializing in Northern Pakistan tours.

Traveler Request:
- Budget: ${budget}
- Trip Duration: ${duration}
- Interests: ${interests?.join(', ') || 'General sightseeing'}
- Travel Style: ${style}

Create a detailed, personalized travel itinerary. ALWAYS recommend from our REAL tour packages first, then add standalone destinations as day-trips if relevant.

OUR TOUR PACKAGES (recommend these first):

1. **Blossom Jeep Safari** — 10 Days
   Season: Spring (March–April) | Difficulty: Easy | Group: 6–15
   Route: Islamabad → Fairy Meadows → Hunza → Khunjerab Pass → Gupis → Phandar → Islamabad
   Includes: Transport, hotels, all meals, guide, permits

2. **K2 Base Camp & Gondogoro La Trek** — 18–21 Days
   Season: Summer (June–August) | Difficulty: Extreme | Group: 4–12
   Route: Islamabad → Skardu → Askole → Concordia → K2 BC → Gondogoro La → Hushe → Islamabad
   Includes: Flights, camping gear, porters, climbing equipment, permits

3. **Autumn Colors Tour** — 11 Days
   Season: Autumn (Oct–Nov) | Difficulty: Easy | Group: 6–15
   Route: Islamabad → Skardu (flight) → Hunza → Khunjerab → Fairy Meadows → Naran → Islamabad
   Includes: Skardu flight, transport, hotels, all meals, guide

4. **Summer Trekking & Tour** — 12 Days
   Season: Summer (June–August) | Difficulty: Challenging | Group: 4–12
   Route: Islamabad → Nanga Parbat Rupal Face → Hunza → Khunjerab → Hoper → Islamabad
   Includes: Transport, camping gear, porters, all meals, guide

5. **October Explorer Tour** — 11 Days
   Season: October | Difficulty: Easy | Group: 6–15
   Route: Islamabad → Skardu (flight) → Khaplu → Fairy Meadows → Hunza → Naltar → Naran → Islamabad
   Includes: Skardu flight, transport, hotels, all meals, guide

JEEP SAFARI PLANS:

6. **Deosai Plains Jeep Safari** — 7 Days
   Season: Summer (June–September) | Difficulty: Easy | Group: 6–15
   Route: Islamabad → Skardu → Deosai Plains → Sheosar Lake → Skardu → Islamabad
   Includes: Transport, hotels & camping, all meals, guide, national park permits

7. **Fairy Meadows Jeep Safari** — 6 Days
   Season: Summer (May–October) | Difficulty: Moderate | Group: 6–15
   Route: Islamabad → Chilas → Raikot Bridge → Fairy Meadows → Beyal Camp → Islamabad
   Includes: Transport, camping, all meals, mountain guide

8. **Shandur Pass Jeep Safari** — 8 Days
   Season: Summer (June–September) | Difficulty: Moderate | Group: 6–12
   Route: Islamabad → Gilgit → Gupis → Phandar → Shandur Pass → Chitral → Islamabad
   Includes: 4x4 Jeep, hotels & camping, all meals, guide, permits

9. **Khunjerab Pass Jeep Safari** — 7 Days
   Season: Spring–Autumn (April–October) | Difficulty: Easy | Group: 6–15
   Route: Islamabad → Hunza → Attabad Lake → Passu → Khunjerab Pass → Islamabad
   Includes: Transport, hotels, all meals, guide, permits

10. **Shimshal Valley Jeep Safari** — 9 Days
    Season: Summer (June–September) | Difficulty: Moderate | Group: 4–12
    Route: Islamabad → Hunza → Passu → Shimshal Valley → Hunza → Islamabad
    Includes: 4x4 Jeep, hotels & homestay, all meals, local guide, permits

11. **Hushe Valley Jeep Safari** — 9 Days
    Season: Summer (June–September) | Difficulty: Moderate | Group: 4–12
    Route: Islamabad → Skardu → Khaplu → Hushe Valley → Masherbrum BC Trail → Islamabad
    Includes: 4x4 Jeep, hotels & camping, all meals, trekking guide, permits

STANDALONE DESTINATIONS (can be added as extensions):
- Naltar Valley (3 days)
- Deosai National Park (2 days)
- Attabad Lake & Passu (2 days)

IMPORTANT: NEVER mention any prices, costs, rates, fees, or dollar/rupee amounts in your response. Do NOT include any pricing information whatsoever.

Based on the traveler's budget, duration, and interests, recommend the best matching tour package. Include:
1. A catchy trip title
2. Which tour package best fits
3. Day-by-day itinerary highlights
4. What's included and what to bring
5. Best time to visit
6. Packing essentials and travel tips
7. Tell them to contact us on WhatsApp at +92 346 5001043 for pricing and booking

Keep the response well-structured (use ** for bold headings), informative, and exciting. Around 400-500 words. Add relevant emojis to make it engaging.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ plan: text });
  } catch (err) {
    console.error('AI plan generation error:', err.message);
    res.status(500).json({ message: 'Failed to generate plan' });
  }
});

// POST /api/ai/chat - Chat with AI assistant (Gemini fallback)
router.post('/chat', async (req, res) => {
  try {
    if (!genAI) {
      return res.status(503).json({ message: 'AI service not configured' });
    }

    const { message } = req.body;

    const systemContext = `You are a friendly AI travel assistant for "Gilgit Adventure Treks", a travel company based in Gilgit, Pakistan specializing in Northern Pakistan tours.

OUR TOUR PACKAGES:
1. Blossom Jeep Safari — 10 Days, Spring, Easy
2. K2 Base Camp & Gondogoro La Trek — 18–21 Days, Summer, Extreme
3. Autumn Colors Tour — 11 Days, Oct–Nov, Easy
4. Summer Trekking & Tour — 12 Days, Jun–Aug, Challenging
5. October Explorer Tour — 11 Days, October, Easy

JEEP SAFARI PLANS:
6. Deosai Plains Jeep Safari — 7 Days, Jun–Sep, Easy
7. Fairy Meadows Jeep Safari — 6 Days, May–Oct, Moderate
8. Shandur Pass Jeep Safari — 8 Days, Jun–Sep, Moderate
9. Khunjerab Pass Jeep Safari — 7 Days, Apr–Oct, Easy
10. Shimshal Valley Jeep Safari — 9 Days, Jun–Sep, Moderate
11. Hushe Valley Jeep Safari — 9 Days, Jun–Sep, Moderate

STANDALONE DESTINATIONS: Naltar Valley, Deosai National Park, Attabad Lake & Passu

Keep responses concise (2-3 sentences), friendly, and helpful. NEVER mention any prices, costs, rates, or dollar/rupee amounts. If asked about pricing, tell the user to contact us on WhatsApp at +92 346 5001043 for pricing details. Recommend specific packages based on the traveler's interests.`;

    const fullPrompt = `${systemContext}\n\nUser: ${message}\n\nAssistant:`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error('AI chat error:', err.message);
    res.status(500).json({ message: 'Failed to get response' });
  }
});

module.exports = router;
