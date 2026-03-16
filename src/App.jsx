import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Challenges from './components/Challenges'
import ConfidentialAI from './components/ConfidentialAI'
import Projects from './components/Projects'
import Team from './components/Team'
import JoinCTA from './components/JoinCTA'
import Footer from './components/Footer'

function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 rounded-full border-3 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}assets/images/scrt_labs_wordmark_128_50.svg`}
          alt="SCRT Labs"
          className="h-8 opacity-60"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <PageLoader />}</AnimatePresence>
      {!loading && (
        <div className="min-h-screen bg-white overflow-x-hidden">
          <ScrollProgress />
          <CustomCursor />
          <Header />
          <Hero />
          <Challenges />
          <ConfidentialAI />
          <Projects />
          <Team />
          <JoinCTA />
          <Footer />
        </div>
      )}
    </>
  )
}
