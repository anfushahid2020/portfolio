export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-[#1e2535]">
      <div className="max-w-6xl mx-auto">

        {/* Top — photo + intro side by side */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">

          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-800 p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0f1117]">
                  <img
                    src="/MyPhoto.jpeg"
                    alt="Shahid Jabbar"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Intro text */}
          <div>
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Who I Am</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug mb-4">
              I research before I build. Every time.
            </h2>
            <p className="text-slate-400 leading-relaxed">
              I am Shahid Jabbar, a Full-Stack Web Developer working exclusively with educational institutions and online course creators.
            </p>
          </div>

        </div>

        {/* Body text + cards */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — full about text */}
          <div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Before writing a single line of code, I research the business — how it operates, where it leaks, what frustrates parents, students, and admins on a daily basis. Only then do I build.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              My process is not "take a brief, disappear, return with a product." Every stage, every decision is collaborative. You bring the domain knowledge of your institution. I bring the technical execution. Together we build something that genuinely fits your business — not a template dressed up as a custom solution.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I use AI tools — Cursor, Claude API, NotebookLM, Claude Code — not as a gimmick, but because they let me deliver better work in less time.
            </p>
          </div>

          {/* Right — highlight cards */}
          <div className="flex flex-col gap-5">
            {[
              {
                title: 'Research First',
                desc: 'I study your institution before touching the keyboard — admissions flow, staff pain points, parent behavior, all of it.',
              },
              {
                title: 'Built Together',
                desc: 'You stay involved at every stage. No surprises at the end. What gets built is what you actually need.',
              },
              {
                title: 'AI-Powered Delivery',
                desc: 'I use modern AI tools to work faster without cutting corners — meaning you get better quality in less time.',
              },
              {
                title: 'Education Only',
                desc: 'I work exclusively with schools, academies, and course creators. This niche focus means I understand your world better than a generalist ever will.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 hover:border-indigo-500/30 transition-colors duration-300"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
