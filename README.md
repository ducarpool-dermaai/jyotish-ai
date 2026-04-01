# Jyotish AI 🪐

Vedic astrology web app with Swiss Ephemeris engine, South Indian Kundali chart, Vimshottari Dasha, and AI-powered personalised readings.

## Features
- Planetary positions via Meeus + JPL Keplerian algorithms (Swiss Ephemeris accuracy)
- Lahiri Ayanamsa sidereal calculations
- South Indian Kundali (birth chart) SVG visualization
- Vimshottari Dasha timeline
- AI Jyotish readings powered by Claude

## Deploy to Vercel

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add environment variable: `ANTHROPIC_API_KEY = sk-ant-...`
4. Deploy ✓

## Local Development

```bash
npm install
cp .env.example .env.local
# Add your key to .env.local
npm run dev
```
