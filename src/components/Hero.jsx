import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SVGText from './SVGText'

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(255,57,18,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,255,128,0.06) 0%, transparent 70%)',
            left: `${10 + i * 18}%`,
            top: `${5 + i * 12}%`,
          }}
          animate={{
            x: [0, 30 * (i % 2 ? 1 : -1), 0],
            y: [0, 20 * (i % 2 ? -1 : 1), 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section ref={ref} className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-white overflow-hidden">
      <FloatingOrbs />

      <div className="relative max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <motion.div className="flex-1 text-center md:text-left" style={{ y: textY }}>
          {/* SVG animated heading */}
          <div className="hidden md:block">
            <SVGText
              text="At the forefront of Decentralized Confidential Computing"
              fontSize={48}
              fontWeight={700}
              fontFamily="'Roboto Slab', serif"
              strokeColor="#FF3912"
              color="#000"
              gradient={true}
              duration={2.5}
              maxWidth={540}
            />
          </div>
          {/* Mobile fallback (SVG text is hard to size on small screens) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:hidden text-3xl font-bold leading-tight text-black"
            style={{ fontFamily: 'var(--font-slab)' }}
          >
            At the forefront of{' '}
            <span className="bg-gradient-to-r from-primary to-red bg-clip-text text-transparent">
              Decentralized Confidential Computing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-body-text max-w-xl"
          >
            SCRT Labs is the driving force and the founding core development team behind Secret
            Network. Their mission is to create products and systems that accelerate the adoption of
            privacy-first, decentralized technologies.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            href="#challenges"
            className="group inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-white font-semibold rounded-[14px] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            Learn More
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              &rarr;
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center"
          style={{ y: imageY }}
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}assets/images/Frame_result.webp`}
            alt="SCRT Labs Hero"
            className="w-full max-w-md md:max-w-lg drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
