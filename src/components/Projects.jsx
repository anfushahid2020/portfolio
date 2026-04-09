const projects = [
  {
    type: 'AI Application',
    status: 'Completed',
    statusColor: 'text-green-400 bg-green-400/10',
    title: 'AI Tutor for Competitive Exam Prep',
    desc: 'Built an AI-powered tutor to help students prepare for Pakistan\'s CSS competitive examinations. The system uses a RAG model to answer subject-specific questions accurately from curated study material.',
    highlights: [
      'Tested with hundreds of real exam prompts',
      'Iterated through multiple feedback rounds',
      'React frontend + PostgreSQL database',
    ],
    tech: ['React', 'PostgreSQL', 'RAG Model', 'Claude API'],
  },
  {
    type: 'Client Project',
    status: 'Live',
    statusColor: 'text-blue-400 bg-blue-400/10',
    title: 'EduElite Website with AI Chatbot',
    desc: 'Developed a complete business website for EduElite and integrated a custom AI chatbot. The chatbot handles student inquiries, reducing manual response load on staff.',
    highlights: [
      'Full business website from scratch',
      'Custom AI chatbot integrated',
      'Reduces staff workload on repetitive queries',
    ],
    tech: ['React', 'Node.js', 'AI Chatbot'],
  },
  {
    type: 'Practice Project',
    status: 'Completed',
    statusColor: 'text-green-400 bg-green-400/10',
    title: 'Academic Help Assistant',
    desc: 'A platform that connects students with subject experts for assignment and research guidance. Also includes a Plagiarism Detector, AI Content Detector, and Turnitin integration — all production-ready, pending paid API activation.',
    highlights: [
      'Student to expert matching system',
      'Plagiarism + AI content detection built',
      'Turnitin integration ready for deployment',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-[#1e2535]">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4">Selected Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug max-w-xl">
            Projects built with a real purpose
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="bg-[#161b27] border border-[#1e2535] rounded-xl p-7 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs text-slate-500 border border-[#1e2535] px-2.5 py-1 rounded-full">
                  {p.type}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.statusColor}`}>
                  {p.status}
                </span>
              </div>

              <h3 className="text-white text-xl font-semibold mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.desc}</p>

              <ul className="flex flex-col gap-1.5 mb-6">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-indigo-400 mt-0.5">—</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
