import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SVGText({
  text,
  className = '',
  fontSize = 52,
  fontWeight = 700,
  fontFamily = "'Roboto Slab', serif",
  color = '#000',
  strokeColor = '#FF3912',
  duration = 2,
  delay = 0,
  gradient = false,
  maxWidth = 600,
}) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [lines, setLines] = useState([])
  const [svgHeight, setSvgHeight] = useState(100)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily.replace(/'/g, '')}`

    const words = text.split(' ')
    const wrapped = []
    let currentLine = ''

    for (const word of words) {
      const test = currentLine ? `${currentLine} ${word}` : word
      if (ctx.measureText(test).width > maxWidth && currentLine) {
        wrapped.push(currentLine)
        currentLine = word
      } else {
        currentLine = test
      }
    }
    if (currentLine) wrapped.push(currentLine)

    const lineHeight = fontSize * 1.2
    setLines(wrapped)
    setSvgHeight(wrapped.length * lineHeight + 10)
  }, [text, fontSize, fontWeight, fontFamily, maxWidth])

  const lineHeight = fontSize * 1.2
  const gradientId = `grad-${text.slice(0, 10).replace(/\s/g, '')}`

  return (
    <div ref={containerRef} className={className}>
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${maxWidth + 20} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3912" />
              <stop offset="100%" stopColor="#FF0000" />
            </linearGradient>
          </defs>
        )}

        {lines.map((line, i) => {
          const lineDelay = delay + i * (duration / lines.length) * 0.6
          const y = (i + 1) * lineHeight

          return (
            <g key={i}>
              {/* Stroke draw animation */}
              <motion.text
                x="0"
                y={y}
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.5"
                initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                animate={
                  isInView
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: 2000 }
                }
                transition={{
                  duration: duration * 0.7,
                  delay: lineDelay,
                  ease: 'easeInOut',
                }}
              >
                {line}
              </motion.text>

              {/* Fill fade-in */}
              <motion.text
                x="0"
                y={y}
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                fill={gradient ? `url(#${gradientId})` : color}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: duration * 0.4,
                  delay: lineDelay + duration * 0.5,
                  ease: 'easeOut',
                }}
              >
                {line}
              </motion.text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
