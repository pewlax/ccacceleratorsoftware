# CC Accelerator

**Content Agency Command Center** — A client analytics dashboard for tracking Instagram performance, lead sources, competitor analysis, and more.

![Black & White Theme](https://img.shields.io/badge/theme-dark-000000) ![React](https://img.shields.io/badge/react-18-61dafb) ![Vite](https://img.shields.io/badge/vite-5-646cff)

---

## Features

- **Admin Dashboard** — Full agency overview across all clients with performance matrix, sparkline charts, and revenue tracking
- **Client Portal** — Each client logs in to see only their own stats, content performance, lead sources, and competitors
- **Lead Source Tracking** — Track where leads come from: Instagram Reels, Stories, Setter/DM, Paid Ads, Referrals, Website/SEO, and more
- **Competitor Analysis** — Side-by-side comparison of followers, engagement, and views against niche competitors
- **Client Signup with Invite Code** — New clients create accounts using a private invitation code
- **Persistent Storage** — All data persists via localStorage across sessions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cc-accelerator.git
cd cc-accelerator

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy to Vercel, Netlify, or any static host.

## Accounts

### Admin Access

Admin credentials are hardcoded in the app. Use the **Admin Login** option on the landing screen.

### Client Access

Clients sign up via **Create Account** using the invitation code. They can then log in via **Client Login**.

## Deploying

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo
4. It auto-detects Vite — click Deploy

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site → Import from Git
4. Build command: `npm run build`
5. Publish directory: `dist`

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **localStorage** — Data persistence
- **DM Sans + JetBrains Mono** — Typography

## Project Structure

```
cc-accelerator/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main application (all components)
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry
├── package.json
├── vite.config.js
└── .gitignore
```

---

Built for **CC Accelerator** content agency.
