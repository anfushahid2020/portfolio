import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import { Buffer } from 'buffer'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `You are a digital assistant representing Shahid Jabbar, a Full-Stack Web Developer specializing in educational institutes and online course creators.

Your job is to answer questions from potential clients visiting his portfolio website.

About Shahid:
- Builds school management systems, LMS platforms, AI chatbots, result portals, course creator websites, and custom web apps
- Works exclusively with educational institutions and online course creators
- Tech stack: React, Node.js, PostgreSQL, OpenAI API, RAG pipelines
- Location: Pakistan, available remotely
- Contact: WhatsApp +923013341155, Email: shahidjabbar79@gmail.com
- LinkedIn: linkedin.com/in/shahid-jabbar-a97225118

Projects:
1. AI Tutor for CSS Exam Prep — RAG model, React, PostgreSQL, OpenAI API. Tested with hundreds of real exam prompts.
2. EduElite Website with AI Chatbot — React, Node.js, live client project. Chatbot handles student inquiries.
3. Academic Help Assistant — student-expert platform with plagiarism detector, AI content detector, and Turnitin integration (production-ready, pending API activation).

Services:
- School Management Systems
- LMS Platforms
- AI Chatbots
- Result Portals
- Course Creator Websites
- Custom Web Applications

Rules:
- Be friendly, direct, and human — no corporate language
- Answer only questions related to Shahid's work, services, projects, and contact
- If asked something unrelated, politely redirect to his services
- Respond in the same language the visitor uses — if they write in Urdu or Roman Urdu, reply in Roman Urdu
- Keep responses concise — 2 to 4 sentences max unless more detail is needed
- Never make up information not listed above
- If asked about pricing, say Shahid discusses pricing after understanding the project requirements — suggest they get in touch`

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const reply = response.choices[0].message.content
    res.json({ reply })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

// TTS endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'onyx',
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    res.set('Content-Type', 'audio/mpeg')
    res.send(buffer)
  } catch (error) {
    console.error('TTS error:', error)
    res.status(500).json({ error: 'Voice generation failed.' })
  }
})

// Transcribe endpoint
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audio, mimeType } = req.body
    const audioBuffer = Buffer.from(audio, 'base64')
    const audioFile = new File([audioBuffer], 'recording.webm', { type: mimeType || 'audio/webm' })

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    })

    res.json({ text: transcription.text })
  } catch (error) {
    console.error('Transcribe error:', error)
    res.status(500).json({ error: 'Transcription failed.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
