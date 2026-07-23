# Shumani's Portfolio & AI Recruiter Chatbot

This project is a modern, responsive portfolio built with React and Tailwind CSS, featuring an integrated AI Recruiter Chatbot powered by OpenAI.

## Prerequisites

Since this is now a modern React application with a Node.js backend, you must have Node.js installed on your computer.
- Download and install [Node.js](https://nodejs.org/) (which includes `npm`).

## Installation Steps

### 1. Frontend Setup (React Portfolio)
1. Open your terminal and navigate to this folder (`MyPortfolio`).
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in this root folder (or use the existing one) with:
   ```env
   VITE_API_URL=http://localhost:3001/api/chat
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *Your portfolio is now running at `http://localhost:5173`.*

### 2. Backend Setup (AI Chatbot Server)
1. Open a **second** terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Open the `server/.env` file and add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=sk-your_actual_api_key_here
   PORT=3001
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *Your chatbot API is now running at `http://localhost:3001`.*

## Deployment Instructions

### Frontend (GitHub Pages)
1. In `package.json`, ensure the `"homepage"` field exists or use the `vite.config.js` `base` property to point to your repository name (e.g., `/MyPortfolio/`).
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
   *This will build the app and push it to the `gh-pages` branch on GitHub.*

### Backend (Render / Vercel / Heroku)
Since GitHub Pages only hosts static files (HTML/CSS/JS), it cannot run the Node.js Express server.
1. Create an account on a free hosting provider like [Render](https://render.com/).
2. Create a new "Web Service" and connect your GitHub repository.
3. Set the Root Directory to `server/` (or configure it to run `npm install` and `npm start` from within the server folder).
4. Add your `OPENAI_API_KEY` to the Environment Variables on Render.
5. Once deployed, Render will give you a live URL (e.g., `https://shumani-api.onrender.com`).
6. Update your frontend `.env` file to use this new URL instead of `localhost`:
   ```env
   VITE_API_URL=https://shumani-api.onrender.com/api/chat
   ```
7. Redeploy your frontend to GitHub Pages.

---
*Note: Your original vanilla HTML/CSS files have been backed up as `index_old.html` and `style.css` if you ever need them.*
