/**
 * Safe & Anti-Ban Telegram Integration Utility
 * Compliant with Telegram Bot API policies to prevent phishing tags, spam bans, or CORS blocks.
 */

export const TELEGRAM_BOT_CONFIG = {
  // Can be configured with your Telegram Bot Token & Chat ID
  token: '',
  chatId: '',
};

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface VisitorAlertPayload {
  referrer?: string;
  screen?: string;
  language?: string;
  platform?: string;
}

/**
 * Sanitize text to avoid Markdown formatting issues or phishing filter false positives
 */
function sanitizeText(text: string): string {
  return text
    .replace(/[*_`\[\]()]/g, '')
    .trim();
}

/**
 * Send Contact Form Inquiries securely to Telegram Bot
 */
export async function sendTelegramMessage(payload: ContactMessagePayload): Promise<boolean> {
  const { token, chatId } = TELEGRAM_BOT_CONFIG;
  if (!token || !chatId) {
    return true; // Graceful mock success for local preview without crashing
  }

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(now);

  const cleanName = sanitizeText(payload.name || 'Anonymous User');
  const cleanEmail = sanitizeText(payload.email || 'Not provided');
  const cleanSubject = sanitizeText(payload.subject || 'Portfolio Inquiry');
  const cleanMessage = sanitizeText(payload.message || 'No message content');

  const text = 
    `📬 *NEW CONTACT INQUIRY*\n` +
    `──────────────────────────\n` +
    `👤 *From:* ${cleanName}\n` +
    `📧 *Email:* ${cleanEmail}\n` +
    `🏷️ *Topic:* ${cleanSubject}\n` +
    `⏰ *Time (BST):* ${formattedDate}\n\n` +
    `💬 *Message:*\n${cleanMessage}\n` +
    `──────────────────────────\n` +
    `🌐 *Platform:* Muhammad Nayeem Portfolio`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true, // Prevents phishing flags from link previews
      }),
    });

    const data = await response.json();
    return data && data.ok === true;
  } catch (error) {
    return false;
  }
}

/**
 * Safe, Rate-Limited Visitor Notification
 * Ensures zero spam, safe headers, and prevents Telegram bot rate-limit bans
 */
export async function sendVisitorAlert(): Promise<boolean> {
  // Session check to notify only once per visitor session (Anti-spam protection)
  if (typeof window === 'undefined') return false;

  const sessionKey = 'mn_portfolio_visited';
  if (sessionStorage.getItem(sessionKey)) {
    return true; // Already alerted in this session
  }

  sessionStorage.setItem(sessionKey, 'true');

  const { token, chatId } = TELEGRAM_BOT_CONFIG;
  if (!token || !chatId) {
    return true; // Silent safe bypass if bot credentials are not yet configured
  }

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(now);

  const screenResolution = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
  const userLang = navigator.language || 'Unknown';
  const isMobile = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile Device' : 'Desktop / PC';

  const text = 
    `👁️ *NEW VISITOR NOTIFICATION*\n` +
    `──────────────────────────\n` +
    `💻 *Device:* ${isMobile}\n` +
    `🖥️ *Screen:* ${screenResolution}\n` +
    `🌐 *Language:* ${userLang}\n` +
    `⏰ *Time (BST):* ${formattedDate}\n` +
    `──────────────────────────\n` +
    `🔗 *Portfolio:* Official Muhammad Nayeem Web`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    return data && data.ok === true;
  } catch (error) {
    return false;
  }
}
