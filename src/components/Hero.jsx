export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#161b27] border border-[#1e2535] text-slate-400 text-xs px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Available for new projects
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          I do not just build websites{' '}
          <span className="text-indigo-400">for educational institutes.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-400 font-light mb-4 leading-relaxed">
          I deeply research your real problems first —
        </p>
        <p className="text-xl sm:text-2xl text-slate-300 font-medium mb-10 leading-relaxed">
          then build an innovative and complete solution.
        </p>

        {/* Sub-headline */}
        <p className="text-base text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
          Web apps, AI chatbots, and management systems built around what your institution actually needs.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto border border-[#1e2535] hover:border-indigo-500/50 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Let us Talk
          </a>
        </div>

        {/* Tech badges */}
        <div className="flex items-center justify-center gap-3 mt-16 flex-wrap">
          {['React', 'Node.js', 'PostgreSQL', 'AI / RAG', 'Claude API'].map((tech) => (
            <span
              key={tech}
              className="text-xs text-slate-500 border border-[#1e2535] px-3 py-1.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-600 text-xs">
            <span>Scroll</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
