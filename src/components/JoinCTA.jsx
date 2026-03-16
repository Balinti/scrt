import { useState } from 'react'
import { motion } from 'framer-motion'

export default function JoinCTA() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      window.location.href = `mailto:info@scrtlabs.com?subject=Join SCRT Labs&body=I'd like to get involved. My email: ${email}`
      setEmail('')
    }
  }

  return (
    <section
      className="relative py-20 md:py-32 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/bg_result.webp)`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-[1140px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-white"
        >
          Want to Get Involved? Join Us!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-white/80 max-w-lg mx-auto"
        >
          Get latest updates and secure your spot to be among the first to know about new
          developments.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:flex-1 px-5 py-3.5 rounded-[14px] text-sm bg-white/95 text-black outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-semibold rounded-[14px] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  )
}
