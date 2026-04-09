export default function Footer() {
  return (
    <footer className="border-t border-[#1e2535] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          Shahid Jabbar © {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/923013341155"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="https://www.linkedin.com/in/shahid-jabbar-a97225118"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="text-slate-500 hover:text-white text-sm transition-colors"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
