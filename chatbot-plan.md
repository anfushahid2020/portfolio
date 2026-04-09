# Portfolio Chatbot — Implementation Plan

---

## What We Are Building

A Digital Twin Chatbot that lives on the portfolio website. It represents Shahid Jabbar — answers visitor questions in text and voice, just like Shahid would in a real conversation.

---

## Core Features

### 1. Chat Interface
- Floating chat button (bottom right corner) — always visible
- Click to open/close chat window
- Chat window slides up smoothly
- Message history visible in scroll area
- User message on right, bot message on left
- Timestamps on messages

### 2. Text Input
- Type message and press Enter or click Send
- Input clears after sending
- Send button disables while bot is thinking
- Typing indicator (three dots animation) while waiting for response

### 3. Voice Input (Speech to Text)
- Mic button next to text input
- Click mic → recording starts
- Click again → recording stops, audio sent to OpenAI Whisper
- Whisper converts voice to text → sent as message automatically
- Visual indicator when mic is active (pulsing red dot)

### 4. Voice Output (Text to Speech)
- Every bot response has a speaker icon
- Click speaker → OpenAI TTS reads the message aloud
- Click again to stop
- Auto-play option (toggle in chat header) — bot speaks every response automatically

### 5. Bot Personality
- Bot introduces itself: "Hi, I am Shahid's assistant. Ask me anything about his work, services, or how to get in touch."
- Knows everything from portfolio-content.md
- Responds in the same language visitor writes in (Urdu or English)
- Stays on topic — does not answer random questions outside of Shahid's work
- Friendly, direct, no corporate tone

---

## UI Design Specs

### Chat Button (Closed State)
- Fixed position: bottom right, 24px from edges
- Circle button, 56px diameter
- Indigo background (#6366f1)
- White chat icon inside
- Subtle pulse animation to attract attention
- Unread dot (red) if bot sends a greeting automatically

### Chat Window (Open State)
- Width: 380px on desktop, full width on mobile
- Height: 520px on desktop, 80vh on mobile
- Position: above the chat button, bottom right
- Border: 1px solid #1e2535
- Background: #161b27
- Rounded corners: 16px
- Drop shadow

### Chat Header
- Bot avatar (small indigo circle with "SJ" initials)
- Name: "Shahid's Assistant"
- Online indicator (green dot)
- Auto-play voice toggle (speaker icon, on/off)
- Close button (X)

### Message Bubbles
- Bot messages: left aligned, bg #1e2535, text slate-300
- User messages: right aligned, bg indigo-500, text white
- Max width: 80% of chat window
- Rounded corners
- Small avatar next to bot messages

### Input Area
- Text input field (full width minus buttons)
- Mic button (left of send)
- Send button (right, indigo)
- Mic active state: red pulsing border

### States to Design
- Empty state (no messages yet) — welcome message + 3 suggested questions
- Loading state — typing indicator dots
- Error state — "Something went wrong. Try again."
- Mic recording state — visual feedback

---

## Suggested Quick Questions (shown on open)

- "What services do you offer?"
- "Tell me about your projects"
- "How can I work with you?"

---

## Technical Architecture

### Frontend (React)
- `Chatbot.jsx` — main component, manages state
- `ChatWindow.jsx` — the open chat UI
- `ChatMessage.jsx` — individual message bubble
- `ChatInput.jsx` — text + mic + send
- `useSpeechRecognition.js` — mic recording hook
- `useTTS.js` — text to speech hook

### Backend (Node.js — separate small server OR Vercel API routes)
- `/api/chat` — receives message, calls OpenAI GPT-4, returns response
- `/api/tts` — receives text, calls OpenAI TTS, returns audio
- `/api/transcribe` — receives audio blob, calls Whisper, returns text
- System prompt stored on backend — never exposed to frontend

### API Calls Flow

```
User types/speaks
      ↓
Frontend sends text to /api/chat
      ↓
Backend sends to GPT-4 with system prompt
      ↓
GPT-4 returns response text
      ↓
Frontend displays text
      ↓
If auto-play ON or speaker clicked:
Frontend sends text to /api/tts
      ↓
Backend calls OpenAI TTS
      ↓
Audio plays in browser
```

---

## System Prompt (for GPT-4)

```
You are a digital assistant representing Shahid Jabbar, a Full-Stack Web Developer 
specializing in educational institutes and online course creators.

Your job is to answer questions from potential clients visiting his portfolio website.

About Shahid:
- Builds school management systems, LMS platforms, AI chatbots, result portals, 
  course creator websites, and custom web apps
- Works exclusively with educational institutions and online course creators
- Tech stack: React, Node.js, PostgreSQL, Claude API, OpenAI API, RAG pipelines
- Location: Pakistan, available remotely
- Contact: WhatsApp +923013341155, Email: shahidjabbar79@gmail.com

Projects:
1. AI Tutor for CSS Exam Prep — RAG model, React, PostgreSQL, OpenAI API
2. EduElite Website with AI Chatbot — React, Node.js, live client project
3. Academic Help Assistant — student-expert platform, plagiarism detector, AI detector

Rules:
- Be friendly, direct, and human — no corporate language
- Answer only questions related to Shahid's work, services, and contact
- If asked something unrelated, politely redirect to his services
- Respond in the same language the visitor uses (English or Urdu)
- Keep responses concise — 2 to 4 sentences max unless more detail is needed
- Never make up information not listed above
```

---

## What We Are NOT Building (to keep it simple)

- No database for chat history (session only)
- No user login
- No chat export
- No admin dashboard
- No multi-language toggle (auto-detect only)

---

## Implementation Order

1. Chat UI — button, window, messages, input (no API yet, dummy data)
2. Connect /api/chat — real GPT-4 responses
3. Connect /api/tts — voice output
4. Connect /api/transcribe — voice input
5. Polish — animations, mobile, error states
6. Test thoroughly
7. Deploy update to Vercel

---

## Open Questions (decide before building)

1. Backend: Vercel API routes (simplest) OR separate Node.js server?
2. Auto-play voice: ON by default or OFF by default?
3. Should bot send a greeting automatically when chat opens?
4. Urdu responses — Roman Urdu or proper Urdu script?
