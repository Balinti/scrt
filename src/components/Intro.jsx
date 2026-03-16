import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Generate deterministic node positions
function generateNodes(count) {
  const nodes = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 120 + Math.sin(i * 1.5) * 60
    nodes.push({
      id: i,
      cx: 250 + Math.cos(angle) * radius,
      cy: 250 + Math.sin(angle) * radius,
      r: 3 + (i % 3) * 2,
    })
  }
  // Central node
  nodes.push({ id: count, cx: 250, cy: 250, r: 8 })
  return nodes
}

// Generate connections between nearby nodes
function generateEdges(nodes) {
  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].cx - nodes[j].cx
      const dy = nodes[i].cy - nodes[j].cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 140) {
        edges.push({ from: i, to: j, dist })
      }
    }
  }
  return edges
}

// Web Audio generative sounds
function createAudioEngine() {
  let ctx = null
  let masterGain = null

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0 // muted by default
    masterGain.connect(ctx.destination)
  }

  function setMuted(muted) {
    if (!masterGain) return
    masterGain.gain.value = muted ? 0 : 0.15
  }

  function playPad(freq, start, dur) {
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, ctx.currentTime + start)
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + dur * 0.3)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start(ctx.currentTime + start)
    osc.stop(ctx.currentTime + start + dur)
  }

  function playClick(start) {
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 800 + Math.random() * 1200
    gain.gain.setValueAtTime(0.1, ctx.currentTime + start)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + 0.08)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start(ctx.currentTime + start)
    osc.stop(ctx.currentTime + start + 0.1)
  }

  function playRiser(start, dur) {
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(80, ctx.currentTime + start)
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + start + dur)
    gain.gain.setValueAtTime(0, ctx.currentTime + start)
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + start + dur * 0.8)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start(ctx.currentTime + start)
    osc.stop(ctx.currentTime + start + dur)
  }

  function playImpact(start) {
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(200, ctx.currentTime + start)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + start + 0.5)
    gain.gain.setValueAtTime(0.5, ctx.currentTime + start)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + 0.8)
    osc.connect(gain)
    gain.connect(masterGain)
    osc.start(ctx.currentTime + start)
    osc.stop(ctx.currentTime + start + 1)
  }

  function playSequence() {
    init()
    // Ambient pad drone (0-25s)
    playPad(110, 0, 25)
    playPad(165, 1, 22)
    playPad(220, 3, 18)

    // Node connection clicks (2-15s)
    for (let i = 0; i < 24; i++) {
      playClick(2 + i * 0.5 + Math.random() * 0.3)
    }

    // Mid riser (12-20s)
    playRiser(12, 8)

    // Second wave of connections (16-22s)
    for (let i = 0; i < 16; i++) {
      playClick(16 + i * 0.35)
    }

    // Final build (20-26s)
    playPad(330, 20, 6)
    playRiser(22, 4)

    // Impact hit at logo reveal (26s)
    playImpact(26)

    // Resolve chord (26-30s)
    playPad(110, 26, 4)
    playPad(138.6, 26, 4)
    playPad(165, 26, 4)
  }

  function stop() {
    if (ctx) ctx.close()
  }

  return { playSequence, stop, setMuted }
}

// Encryption-like random characters
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

function useScrambleText(target, active, delay = 0, speed = 40) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!active) return
    let i = 0
    let scrambleCount = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= target.length) {
          const revealed = target.slice(0, i)
          const scrambled = Array.from({ length: Math.min(3, target.length - i) }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('')
          setText(revealed + scrambled)
          scrambleCount++
          if (scrambleCount % 2 === 0) i++
        } else {
          setText(target)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, active, delay, speed])
  return text
}

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState(1) // start playing immediately
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true) // muted by default
  const audioRef = useRef(null)
  const startedRef = useRef(false)
  const nodes = useMemo(() => generateNodes(20), [])
  const edges = useMemo(() => generateEdges(nodes), [nodes])

  const title1 = useScrambleText('SCRT', phase >= 1 && progress > 85, 0, 50)
  const title2 = useScrambleText('LABS', phase >= 1 && progress > 88, 0, 50)
  const subtitle = useScrambleText('Decentralized Confidential Computing', phase >= 1 && progress > 92, 0, 30)

  // Auto-start on mount
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    audioRef.current = createAudioEngine()
    audioRef.current.playSequence()

    const startTime = Date.now()
    const duration = 30000
    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setPhase(2)
          audioRef.current?.stop()
          setTimeout(onComplete, 800)
        }, 500)
      }
    }
    requestAnimationFrame(tick)
  }, [onComplete])

  // How many nodes/edges to show based on progress
  const visibleNodes = Math.floor((progress / 60) * nodes.length)
  const visibleEdges = edges.filter(
    (e) => e.from < visibleNodes && e.to < visibleNodes
  )

  // Shield path appears at ~60%
  const shieldProgress = Math.max(0, (progress - 55) / 30)

  return (
    <AnimatePresence>
      {phase !== 2 && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {phase === 1 && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Network SVG animation */}
              <svg
                viewBox="0 0 500 500"
                className="absolute w-[80vmin] h-[80vmin] opacity-80"
              >
                {/* Edges */}
                {visibleEdges.map((edge, i) => (
                  <motion.line
                    key={`e-${i}`}
                    x1={nodes[edge.from].cx}
                    y1={nodes[edge.from].cy}
                    x2={nodes[edge.to].cx}
                    y2={nodes[edge.to].cy}
                    stroke="#FF3912"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.4, pathLength: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                ))}

                {/* Nodes */}
                {nodes.slice(0, visibleNodes).map((node) => (
                  <motion.circle
                    key={`n-${node.id}`}
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill="#FF3912"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
                    transition={{
                      opacity: { duration: 2, repeat: Infinity },
                      scale: { duration: 0.4 },
                    }}
                  />
                ))}

                {/* Data pulse particles along edges */}
                {progress > 20 &&
                  visibleEdges.slice(0, 8).map((edge, i) => (
                    <motion.circle
                      key={`p-${i}`}
                      r="2"
                      fill="#FFFF80"
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: [nodes[edge.from].cx, nodes[edge.to].cx],
                        cy: [nodes[edge.from].cy, nodes[edge.to].cy],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}

                {/* Shield icon forming */}
                {shieldProgress > 0 && (
                  <motion.path
                    d="M250 170 L290 190 L290 240 C290 270 270 295 250 305 C230 295 210 270 210 240 L210 190 Z"
                    fill="none"
                    stroke="#FFFF80"
                    strokeWidth="2"
                    strokeDasharray="300"
                    initial={{ strokeDashoffset: 300 }}
                    animate={{ strokeDashoffset: 300 - shieldProgress * 300 }}
                    transition={{ duration: 0.1 }}
                  />
                )}

                {/* Lock icon inside shield */}
                {shieldProgress > 0.8 && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <rect x="240" y="230" width="20" height="16" rx="2" fill="none" stroke="#FFFF80" strokeWidth="1.5" />
                    <path d="M244 230 L244 224 C244 220 247 217 250 217 C253 217 256 220 256 224 L256 230" fill="none" stroke="#FFFF80" strokeWidth="1.5" />
                    <circle cx="250" cy="238" r="2" fill="#FFFF80" />
                  </motion.g>
                )}

                {/* Scanning ring */}
                {progress > 10 && progress < 80 && (
                  <motion.circle
                    cx="250"
                    cy="250"
                    fill="none"
                    stroke="#FF3912"
                    strokeWidth="0.5"
                    initial={{ r: 20, opacity: 0.6 }}
                    animate={{ r: 200, opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </svg>

              {/* Hex data overlay */}
              {progress > 30 && progress < 85 && (
                <div className="absolute top-8 left-8 font-mono text-[10px] text-[#FF3912]/30 leading-tight overflow-hidden max-h-40">
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3, duration: 0.3 }}
                    >
                      {Array.from({ length: 32 }, () =>
                        Math.floor(Math.random() * 16).toString(16)
                      ).join('')}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Title reveal */}
              {progress > 85 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="font-mono text-5xl md:text-7xl font-bold tracking-wider">
                      <span className="text-[#FF3912]">{title1}</span>
                      <span className="text-white ml-3">{title2}</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-4 text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-mono"
                    >
                      {subtitle}
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Progress bar */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48">
                <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FF3912]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-[10px] text-white/30 mt-2 font-mono tracking-widest">
                  {progress < 20 && 'INITIALIZING NETWORK'}
                  {progress >= 20 && progress < 50 && 'ESTABLISHING CONNECTIONS'}
                  {progress >= 50 && progress < 75 && 'ENCRYPTING CHANNELS'}
                  {progress >= 75 && progress < 90 && 'SECURING PROTOCOL'}
                  {progress >= 90 && 'SYSTEM READY'}
                </p>
              </div>

              {/* Bottom controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 right-8 flex items-center gap-3"
              >
                {/* Sound toggle */}
                <button
                  onClick={() => {
                    const next = !muted
                    setMuted(next)
                    audioRef.current?.setMuted(next)
                  }}
                  className="px-4 py-2 border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/50 text-xs font-mono tracking-widest transition-all cursor-pointer hover:bg-white/5 flex items-center gap-1.5"
                >
                  {muted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" />
                      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                    </svg>
                  )}
                  {muted ? 'UNMUTE' : 'MUTE'}
                </button>

                {/* Skip button */}
                <button
                  onClick={() => {
                    setPhase(2)
                    audioRef.current?.stop()
                    setTimeout(onComplete, 300)
                  }}
                  className="px-4 py-2 border border-white/20 rounded-full text-white/50 hover:text-white hover:border-white/50 text-xs font-mono tracking-widest transition-all cursor-pointer hover:bg-white/5"
                >
                  SKIP &rarr;
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
