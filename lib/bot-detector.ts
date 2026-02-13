// Edge-compatible bot detection utility (pure JS, no dependencies)
// Used by Next.js middleware to identify bot user agents

export type BotCategoryType = 'ai' | 'search' | 'social' | 'other';

interface BotPattern {
  name: string;
  pattern: RegExp;
  category: BotCategoryType;
}

export const BOT_PATTERNS: BotPattern[] = [
  // AI Bots
  { name: 'GPTBot', pattern: /GPTBot/i, category: 'ai' },
  { name: 'ChatGPT-User', pattern: /ChatGPT-User/i, category: 'ai' },
  { name: 'OAI-SearchBot', pattern: /OAI-SearchBot/i, category: 'ai' },
  { name: 'Claude-Web', pattern: /Claude-Web/i, category: 'ai' },
  { name: 'Anthropic-AI', pattern: /anthropic-ai/i, category: 'ai' },
  { name: 'PerplexityBot', pattern: /PerplexityBot/i, category: 'ai' },
  { name: 'Google-Extended', pattern: /Google-Extended/i, category: 'ai' },
  { name: 'Meta-ExternalAgent', pattern: /Meta-ExternalAgent/i, category: 'ai' },
  { name: 'Applebot-Extended', pattern: /Applebot-Extended/i, category: 'ai' },
  { name: 'Cohere-AI', pattern: /cohere-ai/i, category: 'ai' },
  { name: 'YouBot', pattern: /YouBot/i, category: 'ai' },
  { name: 'CCBot', pattern: /CCBot/i, category: 'ai' },

  // Search Engine Bots
  { name: 'Googlebot', pattern: /Googlebot/i, category: 'search' },
  { name: 'Bingbot', pattern: /bingbot/i, category: 'search' },
  { name: 'YandexBot', pattern: /YandexBot/i, category: 'search' },
  { name: 'Baiduspider', pattern: /Baiduspider/i, category: 'search' },
  { name: 'DuckDuckBot', pattern: /DuckDuckBot/i, category: 'search' },
  { name: 'Amazonbot', pattern: /Amazonbot/i, category: 'search' },

  // Social Bots
  { name: 'Twitterbot', pattern: /Twitterbot/i, category: 'social' },
  { name: 'LinkedInBot', pattern: /LinkedInBot/i, category: 'social' },
  { name: 'Facebot', pattern: /facebot|facebookexternalhit/i, category: 'social' },
  { name: 'Slackbot', pattern: /Slackbot/i, category: 'social' },
  { name: 'WhatsApp', pattern: /WhatsApp/i, category: 'social' },

  // Other / Monitoring Bots
  { name: 'SemrushBot', pattern: /SemrushBot/i, category: 'other' },
  { name: 'AhrefsBot', pattern: /AhrefsBot/i, category: 'other' },
  { name: 'UptimeRobot', pattern: /UptimeRobot/i, category: 'other' },
  { name: 'Pingdom', pattern: /Pingdom/i, category: 'other' },
];

// Generic bot fallback pattern (checked last)
const GENERIC_BOT_PATTERN = /bot|crawler|spider|scraper|fetch|curl|wget|python-requests|http-client/i;

export interface BotDetectionResult {
  isBot: boolean;
  botName: string | null;
  botCategory: BotCategoryType | null;
}

export function detectBot(userAgent: string): BotDetectionResult {
  if (!userAgent) {
    return { isBot: false, botName: null, botCategory: null };
  }

  // Check specific bot patterns first
  for (const { name, pattern, category } of BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return { isBot: true, botName: name, botCategory: category };
    }
  }

  // Fallback: check generic bot indicators
  if (GENERIC_BOT_PATTERN.test(userAgent)) {
    return { isBot: true, botName: 'Unknown Bot', botCategory: 'other' };
  }

  return { isBot: false, botName: null, botCategory: null };
}
