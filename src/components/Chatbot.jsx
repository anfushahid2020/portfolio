import { useState, useEffect, useRef } from 'react'

const API_BASE = 'http://localhost:3001'

const GREETING = {
  id: 'greeting',
  role: 'assistant',
  text: "Hi! I am Shahid's assistant. Ask me anything about his services, projects, or how to work with him.",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}

const SUGGESTED = [
  'What services do you offer?',
  'Tell me about your projects',
  'How can I work with you?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [recording, setRecording] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [playingId, setPlayingId] = useState(null)
  const [hasUnread, setHasUnread] = useState(true)

  const bottomRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setHasUnread(false)
  }, [open])

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history
            .filter(m => m.role !== 'greeting')
            .map(m => ({ role: m.role, content: m.text }))
        }),
      })

      const data = await res.json()
      const botMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        text: data.reply || data.error,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages(prev => [...prev, botMsg])

      if (autoPlay) {
        playTTS(botMsg.text, botMsg.id)
      }
    } catch {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Something went wrong. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } finally {
      setLoading(false)
    }
  }

  const playTTS = async (text, msgId) => {
    if (playingId === msgId) {
      audioRef.current?.pause()
      setPlayingId(null)
      return
    }

    try {
      setPlayingId(msgId)
      const res = await fetch(`${API_BASE}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.play()
      audio.onended = () => setPlayingId(null)
    } catch {
      setPlayingId(null)
    }
  }

  const silenceTimerRef = useRef(null)
  const analyserRef = useRef(null)
  const vadIntervalRef = useRef(null)

  const transcribeAndSend = async (chunks, stream) => {
    const blob = new Blob(chunks, { type: 'audio/webm' })
    stream.getTracks().forEach(t => t.stop())
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1]
      try {
        const res = await fetch(`${API_BASE}/api/transcribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio: base64, mimeType: 'audio/webm' }),
        })
        const data = await res.json()
        if (data.text) sendMessage(data.text)
      } catch {
        console.error('Transcription failed')
      }
    }
    reader.readAsDataURL(blob)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      // Voice Activity Detection setup
      const audioContext = new AudioContext()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 512
      source.connect(analyser)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.fftSize)
      let silenceStart = null

      vadIntervalRef.current = setInterval(() => {
        analyser.getByteTimeDomainData(dataArray)
        const max = Math.max(...dataArray)
        const isSilent = max < 135 // silence threshold

        if (isSilent) {
          if (!silenceStart) silenceStart = Date.now()
          else if (Date.now() - silenceStart > 1800) {
            // 1.8 seconds of silence — stop automatically
            clearInterval(vadIntervalRef.current)
            mediaRecorder.stop()
            setRecording(false)
          }
        } else {
          silenceStart = null
        }
      }, 100)

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        clearInterval(vadIntervalRef.current)
        audioContext.close()
        transcribeAndSend(audioChunksRef.current, stream)
      }

      mediaRecorder.start(100)
      setRecording(true)
    } catch {
      console.error('Mic access denied')
    }
  }

  const stopRecording = () => {
    clearInterval(vadIntervalRef.current)
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl border border-[#1e2535] bg-[#161b27] shadow-2xl overflow-hidden"
          style={{ height: '520px' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2535] bg-[#0f1117]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                SJ
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none mb-1">Shahid's Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className="text-slate-500 text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                title={autoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
                className={`p-1.5 rounded-lg transition-colors ${autoPlay ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M9 9a3 3 0 000 6" />
                </svg>
              </button>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-1">
                    SJ
                  </div>
                )}
                <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-500 text-white rounded-br-sm'
                      : 'bg-[#1e2535] text-slate-300 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-slate-600 text-xs">{msg.time}</span>
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => playTTS(msg.text, msg.id)}
                        className={`transition-colors ${playingId === msg.id ? 'text-indigo-400' : 'text-slate-600 hover:text-slate-400'}`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  SJ
                </div>
                <div className="bg-[#1e2535] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            {/* Suggested questions */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 mt-2">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-2 rounded-xl hover:bg-indigo-500/20 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-[#1e2535] bg-[#0f1117]">
            <div className={`flex items-center gap-2 bg-[#161b27] border rounded-xl px-3 py-2 transition-colors ${recording ? 'border-red-500/60' : 'border-[#1e2535]'}`}>
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`flex-shrink-0 transition-colors ${recording ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
                title={recording ? 'Stop recording' : 'Start voice input'}
              >
                {recording ? (
                  <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder={recording ? 'Recording...' : 'Type a message...'}
                disabled={recording || loading}
                className="flex-1 bg-transparent text-slate-300 placeholder-slate-600 text-sm outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="flex-shrink-0 text-indigo-400 hover:text-indigo-300 disabled:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105"
      >
        {hasUnread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0f1117]"></span>
        )}
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </>
  )
}
