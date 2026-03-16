import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function Typewriter({
  text,
  className = '',
  as: Tag = 'span',
  baseSpeed = 45,
  variance = 35,
  pauseOnComma = 150,
  pauseOnPeriod = 300,
  pauseOnSpace = 20,
  thinkPauseChance = 0.07,
  thinkPauseMs = 280,
  startDelay = 0,
  showCursor = true,
  onComplete,
}) {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [done, setDone] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    let i = 0
    let timeout

    const typeNext = () => {
      if (i >= text.length) {
        setDone(true)
        onComplete?.()
        return
      }

      const char = text[i]
      i++
      setDisplayed(text.slice(0, i))

      // Calculate delay for next character — non-linear, human-like
      let delay = baseSpeed + (Math.random() - 0.5) * 2 * variance

      // Pause longer after punctuation
      if (char === ',' || char === ';') delay += pauseOnComma
      else if (char === '.' || char === '!' || char === '?') delay += pauseOnPeriod
      else if (char === ' ') delay += pauseOnSpace + Math.random() * 30

      // Random "thinking" pauses — like a human pausing mid-thought
      if (Math.random() < thinkPauseChance && char === ' ') {
        delay += thinkPauseMs + Math.random() * 200
      }

      // Occasional burst of fast typing (2-5 chars)
      if (Math.random() < 0.1) {
        delay = baseSpeed * 0.3
      }

      timeout = setTimeout(typeNext, delay)
    }

    timeout = setTimeout(typeNext, startDelay)
    return () => clearTimeout(timeout)
  }, [isInView, text, baseSpeed, variance, pauseOnComma, pauseOnPeriod, pauseOnSpace, thinkPauseChance, thinkPauseMs, startDelay, onComplete])

  // Blinking cursor
  useEffect(() => {
    if (!showCursor) return
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [showCursor])

  return (
    <Tag ref={ref} className={className}>
      {displayed}
      {showCursor && !done && (
        <span
          className="inline-block w-[2px] ml-0.5 align-middle"
          style={{
            height: '1em',
            backgroundColor: 'currentColor',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      )}
    </Tag>
  )
}
