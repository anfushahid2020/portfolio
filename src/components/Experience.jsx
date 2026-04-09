const experiences = [
  {
    role: 'Freelance Full-Stack Web Developer',
    company: 'Self-Employed',
    period: 'April 2024 — Present',
    location: 'Pakistan · Remote',
    desc: 'Building custom web apps and AI-powered solutions for educational institutes and online course creators. Specializing in school management systems, LMS platforms, and intelligent chatbots.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    current: true,
  },
  {
    role: 'Full-Stack Developer',
    company: 'Self-Employed',
    period: 'January 2023 — February 2024',
    location: 'Pakistan · Remote',
    desc: 'Worked with educational institutes to help them grow their business through web technology.',
    stack: [],
    current: false,
  },
]

const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express'] },
  { category: 'Database', items: ['PostgreSQL'] },
  { category: 'AI / ML', items: ['Claude API', 'RAG Pipelines', 'OpenAI API'] },
  { category: 'Dev Tools', items: ['Cursor', 'Claude Code', 'NotebookLM', 'Git'] },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-[#1e2535]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* Experience */}
        <div>
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Experience</p>
          <h2 className="text-3xl font-bold text-white mb-10">Where I have worked</h2>

          <div className="flex flex-col gap-8">
            {experiences.map((e) => (
              <div key={e.role} className="relative pl-5 border-l border-[#1e2535]">
                {e.current && (
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-indigo-500 rounded-full ring-4 ring-[#0f1117]"></span>
                )}
                {!e.current && (
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-[#1e2535] border border-slate-600 rounded-full"></span>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{e.role}</h3>
                  {e.current && (
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Current</span>
                  )}
                </div>

                <p className="text-slate-500 text-sm mb-1">{e.company} · {e.period}</p>
                <p className="text-slate-500 text-xs mb-3">{e.location}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{e.desc}</p>

                {e.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {e.stack.map((t) => (
                      <span key={t} className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mt-12">
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-6">Education</p>
            <div className="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
              <h3 className="text-white font-semibold">University of Sargodha</h3>
              <p className="text-slate-400 text-sm mt-1">MCS</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Tech Stack</p>
          <h2 className="text-3xl font-bold text-white mb-10">Tools I work with</h2>

          <div className="flex flex-col gap-5">
            {techStack.map((group) => (
              <div key={group.category} className="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-slate-300 bg-[#0f1117] border border-[#1e2535] px-3 py-1.5 rounded-lg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
