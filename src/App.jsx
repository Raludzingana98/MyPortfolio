import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Menu, X, ChevronDown } from 'lucide-react'
import FloatingChatbot from './components/FloatingChatbot'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Simple scroll spy
      const sections = ['home', 'about', 'education', 'experience', 'skills', 'projects', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-accent/30 selection:text-accent">
      {/* Background glowing orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-400/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-lg' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#home" className="text-xl md:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            Shumani Raludzingana
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === link.href.substring(1) ? 'text-accent' : 'text-slate-300'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/Raludzingana98" target="_blank" rel="noreferrer" className="p-2 border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/shumani-raludzingana" target="_blank" rel="noreferrer" className="p-2 border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
              <Linkedin size={18} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full glass border-t border-border py-4 px-6 flex flex-col gap-4 shadow-xl md:hidden">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium ${activeSection === link.href.substring(1) ? 'text-accent' : 'text-slate-300'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative pt-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 text-glow">Shumani</span>
          </h1>
          <h2 className="text-xl md:text-3xl text-slate-400 font-light mb-10 max-w-2xl">
            Software Developer | AI Systems Designer | Problem Solver
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-accent text-white font-semibold shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-1 transition-all">
              View Work
            </a>
            <a href="/MyPortfolio/SM_Raludzingana_CV.pdf" download className="px-8 py-3 rounded-full border border-accent text-accent font-semibold hover:bg-accent/10 transition-colors">
              Download CV
            </a>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} />
          </div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-full p-2 border border-accent/30 box-glow overflow-hidden group">
                <img src="/MyPortfolio/profile.jpg" alt="Shumani" className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay rounded-full" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block relative">
                About Me
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full" />
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                I’m a Software Developer and Computer Science graduate with a solid foundation in Python, full-stack development, and artificial intelligence. I enjoy building practical, data-driven solutions from financial modeling tools to interactive web applications and simulation systems.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-white">Core Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {['Python', 'React', 'JavaScript', 'Java', 'C#', 'SQL', 'Tailwind CSS', 'Firebase'].map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-full glass text-sm font-medium border-accent/20 hover:border-accent transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative inline-block left-1/2 -translate-x-1/2">
              Experience & Education
              <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-accent rounded-full" />
            </h2>
            
            <div className="space-y-8">
              <div className="glass p-8 rounded-2xl border-l-4 border-l-accent hover:translate-x-2 transition-transform">
                <h3 className="text-xl font-bold text-accent">Software Developer Intern</h3>
                <p className="text-slate-400 mb-4">SISOL Connex | Jan 2026 – Mar 2026</p>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                  <li>Developed and maintained Python-based scripts and automation tools</li>
                  <li>Supported full-stack application and backend service development</li>
                  <li>Participated in debugging, testing, and performance optimization</li>
                </ul>
              </div>
              
              <div className="glass p-8 rounded-2xl border-l-4 border-l-purple-500 hover:translate-x-2 transition-transform">
                <h3 className="text-xl font-bold text-purple-400">AI Software Developer Learnership</h3>
                <p className="text-slate-400 mb-4">Initium Venture Solutions | 2025 – 2026</p>
                <p className="text-slate-300">Worked on real-world AI/ML projects and strengthened software development skills.</p>
              </div>

              <div className="glass p-8 rounded-2xl border-l-4 border-l-blue-500 hover:translate-x-2 transition-transform">
                <h3 className="text-xl font-bold text-blue-400">BSc Computer Science</h3>
                <p className="text-slate-400 mb-4">University of the Western Cape | 2020 – 2024</p>
                <p className="text-slate-300">Focused on software development, algorithms, database systems, and mathematical modeling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
          </p>
          <a href="mailto:raludzingana98@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <Mail size={20} />
            Say Hello
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 border-t border-border">
        <p>© 2026 Shumani Raludzingana. Built with React & Tailwind CSS.</p>
      </footer>

      {/* AI CHATBOT WIDGET */}
      <FloatingChatbot />
    </div>
  )
}

export default App
