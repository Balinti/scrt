import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

export default function ConfidentialAI() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/ai_result.webp`}
            alt="Confidential AI"
            className="w-full max-w-md mx-auto rounded-[14px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-black leading-tight">
            <Typewriter
              text="Leading the Way in Confidential AI"
              baseSpeed={45}
              variance={25}
            />
          </h2>
          <p className="mt-6 text-base leading-relaxed text-body-text">
            SCRT Labs was an early pioneer in bringing Trusted Execution Environment (TEE)
            technologies to Web3. Today, we are expanding into the realm of AI by introducing NVIDIA
            Confidential Computing capabilities to Secret Network.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/nvidia_result.webp`}
              alt="NVIDIA Inception Program"
              className="h-16"
            />
            <p className="text-sm text-body-text leading-relaxed max-w-sm">
              We are proud to be part of NVIDIA Inception program and working with NVIDIA to enable
              Decentralized Confidential AI for multiple use cases.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
