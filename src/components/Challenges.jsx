import { motion } from 'framer-motion'
import { challenges } from '../data/content'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Challenges() {
  return (
    <section id="challenges" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(255,57,18,0.25)' }}
            className="bg-red rounded-[14px] p-8 text-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex flex-col items-start gap-4 cursor-default"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/images/${card.icon}`}
              alt={card.title}
              className="h-12 w-12"
            />
            <h3
              className="text-xl font-bold"
              style={{ color: '#FFFF80' }}
            >
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
