import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

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
    res.status(500).json({ error: 'Transcription failed.' })
  }
}
