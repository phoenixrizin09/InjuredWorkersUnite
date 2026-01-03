# THE EYE / ORACLE SYSTEM - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Initialize the system
npm run eye:init

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000/admin to access the admin dashboard
```

---

## 📋 System Overview

THE EYE / ORACLE is a **100% FREE** investigative intelligence system that:

- **Monitors** Canadian government data sources in real-time
- **Analyzes** documents for corruption, Charter violations, and human rights abuses
- **Tracks** targets (corporations, officials, institutions)
- **Generates** alerts when patterns are detected
- **Bundles** evidence with cryptographic verification
- **Delivers** notifications via Telegram, Discord, and Email

### All Services Are FREE:
| Service | Free Tier |
|---------|-----------|
| Database | JSON files (unlimited) |
| Government APIs | Open data (unlimited) |
| Telegram Alerts | Unlimited messages |
| Discord Webhooks | Unlimited messages |
| Email (Resend) | 3,000/month |
| GitHub Actions | 2,000 minutes/month |

---

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Step 1: Clone & Install

```bash
cd injured-workers-unite
npm install
```

### Step 2: Configure Environment

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials (see Configuration section below).

### Step 3: Initialize Database

```bash
npm run eye:init
```

This creates:
- `/data/cases.json` - Case database
- `/data/evidence.json` - Evidence records
- `/data/alerts.json` - Alert history
- `/data/targets.json` - Target tracking
- `/data/scans.json` - Scan history
- `/data/sources.json` - Source configuration

### Step 4: Migrate Existing Data (Optional)

If you have existing data from the real-data-generator:
```bash
# Start the dev server first
npm run dev

# In another terminal, run migration
npm run eye:migrate
```

---

## ⚙️ Configuration

### Telegram Bot (FREE - Unlimited)

1. Open Telegram, search for `@BotFather`
2. Send `/newbot` and follow the prompts
3. Copy the bot token to `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```
4. Create a channel or group
5. Add your bot as admin
6. Get the channel ID:
   - For channels: `@yourchannel` or `-100xxxxxxxxxx`
   - For groups: Forward a message to `@RawDataBot`
   ```
   TELEGRAM_CHANNEL_ID=@InjuredWorkersAlerts
   ```

### Discord Webhooks (FREE - Unlimited)

1. Open Discord, go to your server
2. Server Settings → Integrations → Webhooks
3. Create New Webhook
4. Copy the webhook URL to `.env.local`:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/xxx
   ```

### Email Alerts (FREE - 3,000/month)

1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ALERT_FROM_EMAIL=alerts@yourdomain.com
   ALERT_TO_EMAILS=admin@example.com,team@example.com
   ```

### CanLII API (FREE - Non-commercial)

1. Request API access at https://www.canlii.org/en/api/
2. Add to `.env.local`:
   ```
   CANLII_API_KEY=your_canlii_key
   ```

---

## 🖥️ Usage

### NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run eye:init` | Initialize database |
| `npm run eye:scan` | Run full scan (government + legislation) |
| `npm run eye:scan:gov` | Scan government data only |
| `npm run eye:scan:bills` | Scan legislation only |
| `npm run eye:analyze` | Run analysis pipeline |
| `npm run eye:summary` | Generate daily summary |
| `npm run eye:notify` | Send Telegram notification |
| `npm run eye:daily` | Full daily pipeline (scan → analyze → notify) |
| `npm run eye:migrate` | Migrate existing data |

### Admin Dashboard

Access at: `http://localhost:3000/admin`

Features:
- **Stats Overview** - Cases, alerts, targets, scans
- **Case Management** - Review, approve, publish cases
- **Source Management** - Configure data sources
- **Alert Configuration** - Set up delivery channels
- **Manual Scan** - Trigger scans on demand

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cases` | GET/POST | List/create cases |
| `/api/cases/[id]` | GET/PUT/DELETE | Manage single case |
| `/api/cases/[id]/workflow` | POST | Change case status |
| `/api/alerts` | GET/POST | List/create alerts |
| `/api/alerts/[id]` | GET/PUT | Manage alert |
| `/api/targets` | GET/POST | List/create targets |
| `/api/scan` | POST | Trigger scan |
| `/api/stats` | GET | System statistics |
| `/api/evidence/bundle/[caseId]` | GET | Download evidence bundle |
| `/api/migrate` | POST | Migrate existing data |

---

## 🤖 Automated Monitoring

### GitHub Actions (FREE - 2,000 min/month)

The system includes automated scanning via GitHub Actions.

#### Setup:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these repository secrets:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHANNEL_ID`
   - `DISCORD_WEBHOOK_URL`
   - `RESEND_API_KEY`
   - `CANLII_API_KEY`

4. The workflow runs automatically:
   - Every 6 hours
   - On push to main branch
   - Manual trigger via Actions tab

#### Workflow Steps:
1. **Scan Government Data** - Fetches from Open Canada, Ontario Open Data
2. **Scan Legislation** - Monitors LEGISinfo for new bills
3. **Analyze Data** - Processes through THE EYE v2.0
4. **Send Summary** - Delivers alerts via Telegram

---

## 📊 Data Sources

### Government APIs (FREE - Unlimited)

| Source | URL | Data Types |
|--------|-----|------------|
| Open Government Canada | open.canada.ca | Contracts, spending, lobbyists |
| Ontario Open Data | data.ontario.ca | Provincial records |
| LEGISinfo | www.parl.ca | Federal bills |
| CanLII | www.canlii.org | Court decisions |

### Monitoring Categories

- Workers' Compensation (WSIB, WorkSafeBC)
- Disability Benefits (ODSP, AISH, CPP-D)
- Indigenous Rights
- Housing & Homelessness
- Healthcare Access
- Environmental Justice
- Police Accountability
- And more...

---

## 🔒 Security

### Evidence Verification

All evidence is:
- **Hashed** with SHA-256 for tamper detection
- **Timestamped** with ISO 8601 dates
- **Bundled** as ZIP with manifest
- **Tracked** with W3C PROV chain

### Access Control

- Admin dashboard requires password
- API routes can be protected with authentication
- No external database = no data breach risk

---

## 🐛 Troubleshooting

### "API not available" message

The system works in two modes:
1. **With API** - Full database functionality
2. **Standalone** - Uses localStorage, limited persistence

If you see "API not available", the dev server may not be running:
```bash
npm run dev
```

### "Cannot find module" errors

```bash
npm install
```

### Telegram bot not sending

1. Verify bot token is correct
2. Ensure bot is admin in the channel
3. Check channel ID format

### Scans returning empty

1. Check internet connection
2. Verify API endpoints are accessible
3. Some APIs may rate-limit - wait and retry

---

## 📁 File Structure

```
├── data/                    # Database files (JSON)
│   ├── cases.json
│   ├── evidence.json
│   ├── alerts.json
│   ├── targets.json
│   ├── scans.json
│   └── sources.json
├── pages/
│   ├── api/                 # API routes
│   │   ├── cases/
│   │   ├── alerts/
│   │   ├── targets/
│   │   ├── evidence/
│   │   ├── scan.js
│   │   ├── stats.js
│   │   └── migrate.js
│   ├── admin/               # Admin dashboard
│   └── the-eye.js           # Main interface
├── scripts/                 # Automation scripts
│   ├── initialize-system.js
│   ├── scan-government-data.js
│   ├── scan-legislation.js
│   ├── run-analysis-pipeline.js
│   ├── generate-daily-summary.js
│   └── send-telegram-summary.js
├── utils/
│   ├── db.js                # Database layer
│   ├── connectors.js        # Government API connectors
│   ├── alert-delivery.js    # Notification system
│   └── evidence-bundler.js  # Evidence packaging
├── .github/
│   └── workflows/
│       └── automated-ingestion.yml
└── .env.local               # Configuration (create from .env.local.example)
```

---

## 🆘 Support

For issues or questions:
1. Check this documentation
2. Review the inline code comments
3. Inspect browser console for errors
4. Check GitHub Actions logs for automation issues

---

## 📜 License

This project is licensed under the terms specified in LICENSE file.

**THE EYE SEES ALL • THE EYE FORGETS NOTHING • THE EYE NEVER SLEEPS** 👁️
