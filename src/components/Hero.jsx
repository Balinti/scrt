import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-[52px] font-bold leading-tight text-black"
            style={{ fontFamily: 'var(--font-slab)' }}
          >
            At the forefront of Decentralized Confidential Computing
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
            className="inline-block mt-8 px-8 py-3.5 bg-primary text-white font-semibold rounded-[14px] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            Learn More
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}assets/images/Frame_result.webp`}
            alt="SCRT Labs Hero"
            className="w-full max-w-md md:max-w-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
