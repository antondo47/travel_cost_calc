import { getAnthropicClient } from '@/lib/anthropic';

export interface ActivitySuggestion {
  name: string;
  estimatedCostPerPersonUSD: number;
  estimatedTotalCostUSD: number;
  durationHours: number;
  notes: string;
}

const SYSTEM_PROMPT = `You are a travel activity advisor. Respond with ONLY valid JSON — no markdown, no code fences, no explanation — as an object with a single key "activities" containing an array matching this schema:
{
  "activities": [
    {
      "name": string,
      "estimatedCostPerPersonUSD": number,
      "estimatedTotalCostUSD": number,
      "durationHours": number,
      "notes": string
    }
  ]
}`;

function stripMarkdownFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
}

export async function fetchActivitySuggestions(
  destination: string,
  activityTypes: string[],
  totalBudgetUSD: number,
  adults: number,
  nights: number,
): Promise<ActivitySuggestion[]> {
  const anthropic = getAnthropicClient();

  const typeList = activityTypes.length > 0
    ? activityTypes.join(', ')
    : 'sightseeing, food, culture';

  const userPrompt = `Suggest activities for ${adults} adult${adults > 1 ? 's' : ''} visiting ${destination} for ${nights} night${nights > 1 ? 's' : ''}.

Activity preferences: ${typeList}
Total activity budget: $${totalBudgetUSD} USD

Return 4–6 activities that fit within the budget. For each:
1. name: specific activity (not generic)
2. estimatedCostPerPersonUSD: realistic 2026 price per person
3. estimatedTotalCostUSD: total for all ${adults} people
4. durationHours: how long it takes
5. notes: one sentence tip or what's included

Mix free and paid options. Be specific to ${destination}.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = stripMarkdownFences(rawText);
    const parsed = JSON.parse(cleaned);
    return (parsed.activities ?? parsed) as ActivitySuggestion[];
  } catch (e) {
    console.error('[activities] Anthropic fetch error:', e);
    return [];
  }
}
