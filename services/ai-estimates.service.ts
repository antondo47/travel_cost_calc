import { getAnthropicClient } from '@/lib/anthropic';
import { AIEstimates } from '@/types';

const SYSTEM_PROMPT = `You are a travel cost estimation assistant. You MUST respond with ONLY valid JSON — no markdown, no code fences, no explanation — matching this exact schema:
{
  "foodCostPerPersonPerDay": number,
  "foodTotalCost": number,
  "localTransportPerPersonPerDay": number,
  "localTransportTotal": number,
  "travelTimeFromHotelToCenter": string,
  "currency": "USD",
  "notes": string
}`;

function stripMarkdownFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
}

export async function fetchAIEstimates(
  destinationCity: string,
  nights: number,
  adults: number,
  departureDate: string,
  returnDate: string
): Promise<AIEstimates | null> {
  const anthropic = getAnthropicClient();

  const userPrompt = `Estimate travel costs for ${adults} adult${adults > 1 ? 's' : ''} visiting ${destinationCity} for ${nights} night${nights > 1 ? 's' : ''} (${departureDate} to ${returnDate}).

Calculate and return JSON with:
1. foodCostPerPersonPerDay: average daily food cost per person in USD (budget to mid-range dining, 3 meals/day)
2. foodTotalCost: total food cost for all ${adults} traveler${adults > 1 ? 's' : ''} × ${nights} nights
3. localTransportPerPersonPerDay: daily local transport cost per person (subway/bus/rideshare mix for a tourist)
4. localTransportTotal: total local transport cost for all travelers × nights
5. travelTimeFromHotelToCenter: typical travel time string from a hotel 2-3km from city center to the main tourist/downtown area (e.g. "~12 min by subway")
6. currency: always "USD"
7. notes: one sentence about anything notable about costs in ${destinationCity}

Use realistic 2026 USD prices for ${destinationCity}.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const rawText =
      message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = stripMarkdownFences(rawText);
    const parsed = JSON.parse(cleaned) as AIEstimates;
    return parsed;
  } catch {
    return null;
  }
}
