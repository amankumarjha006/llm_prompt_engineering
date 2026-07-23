# CompareAI Demo

This is a polished, AI-powered Product Comparison web application built with React, Vite, Express, and the Google Gemini API.

## 1. What the project does

The application allows users to enter two product names (e.g., "iPhone 15 Pro" vs "Samsung Galaxy S24"). The React frontend sends these names to an Express backend, which injects them into a pre-defined system prompt. The backend calls the Gemini API to generate a structured JSON comparison detailing specifications, pros/cons, performance, value, and a final recommendation. The frontend then dynamically renders this JSON into a beautiful, responsive UI.

## 2. Architecture

- **Frontend**: React (Hooks-based), Vite, Tailwind CSS, Lucide React icons.
- **Backend**: Node.js, Express (CORS enabled).
- **AI Integration**: `@google/genai` (Official Google GenAI JavaScript SDK).
- **Prompting**: Server-side prompt loading from a Markdown file to prevent exposing the prompt or the API key to the client. JSON parsing defensively extracts AI output.
- **Development**: Managed via `concurrently` to run both Vite (with a proxy to the Express API) and the Node server simultaneously.

## 3. Requirements

- Node.js (v18+ recommended)
- A valid Google Gemini API Key

## 4. Installation

1. Open a terminal in the `demo` directory:
   ```bash
   cd demo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## 5. Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   GEMINI_MODEL=gemini-2.5-flash
   ```

## 6. Prompt File Location

The exact system prompt that structures the AI's JSON output is stored at:
`prompts/head-to-head.md`

## 7. Configuring the Gemini Model

The model is configured centrally via the `.env` file. You can change `GEMINI_MODEL` to `gemini-1.5-pro` or other compatible models without changing application code.

## 8. Running in Development Mode

To start both the frontend and backend concurrently, run:

```bash
npm run dev
```

- The React application will be available at `http://localhost:5173`.
- The Express API runs on `http://localhost:3001`.
- Vite proxies `/api` requests to the Express backend automatically.

## 9. Building and Running for Production

To build the React application:
```bash
npm run build
```

To run the backend server manually:
```bash
npm start
```
*(Note: For full production deployment, you would serve the built static files from `dist` via Express, but this setup focuses on the local development demo).*

## 10. Example Comparison

1. Start the app with `npm run dev`.
2. Open `http://localhost:5173`.
3. In **Product A**, type: `Sony WH-1000XM5`
4. In **Product B**, type: `Bose QuietComfort Ultra`
5. Click **Compare Products** and wait a few seconds to see the structured AI response rendered in the UI.
