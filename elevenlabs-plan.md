# ElevenLabs Voice Clone — Implementation Plan

---

## What We Are Doing

Replacing OpenAI TTS (generic voice) with ElevenLabs voice clone (Shahid's own voice).
The chatbot will respond in Shahid's actual voice instead of a synthetic one.

---

## How ElevenLabs Voice Cloning Works

1. You record 1-3 minutes of your own voice (clear speech, no background noise)
2. You upload it to ElevenLabs
3. ElevenLabs trains a voice model on it
4. You get a Voice ID
5. We pass that Voice ID in API calls — ElevenLabs speaks in your voice

---

## What You Need Before We Start

1. ElevenLabs account (free plan available at elevenlabs.io)
2. A voice recording of yourself — 1 to 3 minutes
   - Speak naturally, clearly
   - No background noise, no music
   - Any topic — just keep talking
   - Save as MP3 or WAV
3. ElevenLabs API key (from their dashboard)
4. Voice ID (generated after uploading your voice)

---

## Step by Step Plan

### Step 1 — Create ElevenLabs Account
- Go to elevenlabs.io
- Sign up (free plan gives 10,000 characters/month)
- Verify email

### Step 2 — Record Your Voice
- Record 1 to 3 minutes of yourself speaking clearly
- Use your phone or any recorder
- Save as MP3 or WAV file
- No need for studio quality — just clear and quiet room

### Step 3 — Create Voice Clone on ElevenLabs
- Login to ElevenLabs dashboard
- Go to "Voices" section
- Click "Add Voice"
- Select "Instant Voice Cloning"
- Upload your recording
- Give it a name (e.g. "Shahid")
- Click "Add Voice"
- Copy the Voice ID shown

### Step 4 — Get API Key
- In ElevenLabs dashboard
- Go to Profile → API Key
- Copy the key

### Step 5 — Add to .env File
Add these two lines to your existing .env file:
```
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id
```

### Step 6 — Install ElevenLabs Package
```
npm install elevenlabs
```

### Step 7 — Update Server
Replace the OpenAI TTS endpoint in server/index.js with ElevenLabs call.
The /api/tts route will now call ElevenLabs instead of OpenAI TTS.
Everything else stays the same — frontend does not change at all.

---

## Code Change (only one file changes)

**server/index.js — /api/tts endpoint changes from this:**
```js
const mp3 = await openai.audio.speech.create({
  model: 'tts-1',
  voice: 'onyx',
  input: text,
})
```

**To this:**
```js
const response = await elevenlabs.textToSpeech.convert(
  process.env.ELEVENLABS_VOICE_ID,
  {
    text: text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
    }
  }
)
```

---

## What Does NOT Change

- Frontend (Chatbot.jsx) — zero changes
- Chat functionality — zero changes
- Whisper voice input — zero changes
- All other API routes — zero changes

---

## Free Plan Limits

- 10,000 characters per month
- 1 voice clone allowed
- Good enough for portfolio demo and client demos

---

## Implementation Order

1. You create ElevenLabs account
2. You record your voice and upload it
3. You copy Voice ID and API key
4. You add both to .env file
5. I install package and update server/index.js
6. Test — bot speaks in your voice

---

## Open Questions (already decided)

- Model: eleven_multilingual_v2 — handles both English and Urdu/Roman Urdu
- Language: auto-detected from text
- Voice settings: stability 0.5, similarity 0.75 (best balance for natural sound)
