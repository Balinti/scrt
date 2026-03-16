import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Header from './components/Header'
import Hero from './components/Hero'
import Challenges from './components/Challenges'
import ConfidentialAI from './components/ConfidentialAI'
import Projects from './components/Projects'
import Team from './components/Team'
import JoinCTA from './components/JoinCTA'
import Footer from './components/Footer'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] origin-left"
      style={{ scaleX }}
    />
  )
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[200] w-64 h-64 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255,57,18,0.06) 0%, transparent 70%)',
        x: pos.x - 128,
        y: pos.y - 128,
      }}
      animate={{ x: pos.x - 128, y: pos.y - 128 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    />
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(false)
  const [siteReady, setSiteReady] = useState(true)

  const handlePlayIntro = () => {
    setSiteReady(false)
    setShowIntro(true)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
    setSiteReady(true)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>
      {siteReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white overflow-x-hidden"
        >
          <ScrollProgress />
          <CustomCursor />
          <Header onPlayIntro={handlePlayIntro} />
          <Hero />
          <Challenges />
          <ConfidentialAI />
          <Projects />
          <Team />
          <JoinCTA />
          <Footer />
        </motion.div>
      )}
    </>
  )
}
