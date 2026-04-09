export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-[#1e2535]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Left — text */}
        <div>
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-6">
            Let us work together
          </h2>

          <p className="text-slate-400 leading-relaxed mb-4">
            Got a school, academy, or course business — and something is just not working the way it should?
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            Maybe your website gets visitors but no one calls. Maybe your staff is drowning in manual work that should have been automated years ago. Maybe you have tried a solution before and it did not stick.
          </p>
          <p className="text-slate-300 leading-relaxed font-medium">
            Whatever it is — tell me. I will be straight with you about whether I can help, and how.
          </p>

          {/* Contact links */}
          <div className="flex flex-col gap-4 mt-10">
            <a
              href="https://wa.me/923013341155"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
            >
              <span className="w-10 h-10 bg-[#161b27] border border-[#1e2535] rounded-lg flex items-center justify-center group-hover:border-green-500/40 transition-colors">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">WhatsApp</p>
                <p className="text-sm">+92 301 3341155</p>
              </div>
            </a>

            <a
              href="mailto:shahidjabbar79@gmail.com"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
            >
              <span className="w-10 h-10 bg-[#161b27] border border-[#1e2535] rounded-lg flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Email</p>
                <p className="text-sm">shahidjabbar79@gmail.com</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/shahid-jabbar-a97225118"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
            >
              <span className="w-10 h-10 bg-[#161b27] border border-[#1e2535] rounded-lg flex items-center justify-center group-hover:border-blue-500/40 transition-colors">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">LinkedIn</p>
                <p className="text-sm">linkedin.com/in/shahid-jabbar</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-[#161b27] border border-[#1e2535] rounded-xl p-7">
          <h3 className="text-white font-semibold mb-6">Send a message</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = 'https://wa.me/923013341155'
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">Your Name</label>
              <input
                type="text"
                placeholder="Ahmed Ali"
                required
                className="w-full bg-[#0f1117] border border-[#1e2535] text-slate-300 placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">Email or WhatsApp</label>
              <input
                type="text"
                placeholder="email@example.com or +92 3XX XXXXXXX"
                required
                className="w-full bg-[#0f1117] border border-[#1e2535] text-slate-300 placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1.5 block">What do you need help with?</label>
              <textarea
                rows={4}
                placeholder="Tell me about your institution and the problem you are trying to solve..."
                required
                className="w-full bg-[#0f1117] border border-[#1e2535] text-slate-300 placeholder-slate-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
