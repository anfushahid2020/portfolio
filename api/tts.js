import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { text } = req.body
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'onyx',
      input: text,
    })
    const buffer = Buffer.from(await mp3.arrayBuffer())
    res.setHeader('Content-Type', 'audio/mpeg')
    res.send(buffer)
  } catch (error) {
    res.status(500).json({ error: 'TTS failed.' })
  }
}
