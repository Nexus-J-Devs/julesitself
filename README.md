# JoshSites — Professional Website Showroom Platform

JoshSites is a website demo showroom and template platform designed for web developers to send ONE link to potential business clients across 16 major industries.

## Features

- **16 Business Categories:** Interactive, fully custom showcase experiences for Spa, Restaurant, Fashion, Real Estate, Fitness, Home Services, and more.
- **Interactive Demos & Responsive Viewport Switcher:** Switch between Desktop (1440px), Tablet (768px), and Mobile (375px) frame previews with working inter-page navigation within demo sites.
- **Centralized Contact Configuration:** All contact points use a single source of truth (`src/config/contact.ts`).
- **Telegram Netlify Function Integration:** The `/request` custom website enquiry form sends instant notification messages directly to Telegram using Netlify Functions without exposing bot tokens on the client.

---

## Contact Configuration

Centralized contact credentials are configured in `src/config/contact.ts`:

```typescript
export const CONTACT = {
  whatsappRaw: "2348125937596",
  whatsappDisplay: "+234 812 593 7596",
  telegramHandle: "Yeshua_zion",
  telegramUrl: "https://t.me/Yeshua_zion",
};
```

---

## Netlify Telegram Notification Setup

To receive enquiry form submissions in Telegram when deployed on Netlify:

1. **Create a Telegram Bot:**
   - Message `@BotFather` on Telegram.
   - Run `/newbot` and follow the prompts to receive your `BOT_TOKEN` (e.g. `123456789:ABCdefGHIjklMNOpqrsTUVwxyZ`).

2. **Obtain Your Telegram Chat ID:**
   - Send a message to your new bot or search `@userinfobot` / `@GetChatID_Bot` to get your Telegram user/chat ID (`CHAT_ID`).

3. **Configure Netlify Environment Variables:**
   - Go to your Netlify site settings: **Site configuration > Environment variables**.
   - Add the following environment variables:
     - `TELEGRAM_BOT_TOKEN`: Your Telegram Bot API Token
     - `TELEGRAM_CHAT_ID`: Your Telegram Chat ID

4. **Deployment & Function Routing:**
   - `netlify.toml` automatically maps `/api/notify` requests to `/.netlify/functions/notify`.
   - Incoming JSON body payloads are validated, HTML-escaped, and sent via HTTP POST to `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/sendMessage`.

---

## Local Development & Testing

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local dev server:**
   ```bash
   npm run dev
   ```

3. **Test Netlify Function locally (with Netlify CLI):**
   ```bash
   npm install -g netlify-cli
   TELEGRAM_BOT_TOKEN="your_bot_token" TELEGRAM_CHAT_ID="your_chat_id" netlify dev
   ```

4. **Production Build:**
   ```bash
   npm run build
   ```
