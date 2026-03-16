import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header({ onPlayIntro }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-black/5"
    >
      <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex-shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/scrt_labs_wordmark_128_50.svg`}
            alt="SCRT Labs"
            className="h-8 md:h-10"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onPlayIntro}
            className="text-sm font-medium text-black/70 hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Intro
          </button>
          <a
            href="mailto:info@scrtlabs.com"
            className="text-sm font-medium text-black/70 hover:text-primary transition-colors"
          >
            Contact Us
          </a>
          <a
            href="https://github.com/scrtlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/g_result.webp`}
              alt="GitHub"
              className="h-6 w-6"
            />
          </a>
          <a
            href="https://x.com/scrt_labs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/x_result.webp`}
              alt="X"
              className="h-6 w-6"
            />
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <button
                onClick={() => { setMenuOpen(false); onPlayIntro() }}
                className="text-sm font-medium text-black/70 flex items-center gap-1.5 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Intro
              </button>
              <a
                href="mailto:info@scrtlabs.com"
                className="text-sm font-medium text-black/70"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </a>
              <div className="flex gap-4">
                <a href="https://github.com/scrtlabs" target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/images/g_result.webp`}
                    alt="GitHub"
                    className="h-6 w-6"
                  />
                </a>
                <a href="https://x.com/scrt_labs" target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/images/x_result.webp`}
                    alt="X"
                    className="h-6 w-6"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
