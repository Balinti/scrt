import { motion } from 'framer-motion'
import { team } from '../data/content'

const memberVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Team() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1140px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-black text-center mb-12"
        >
          Meet the SCRT Labs Team
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={memberVariants}
              className="group relative overflow-hidden rounded-[14px] cursor-default"
            >
              <div className="aspect-square overflow-hidden rounded-[14px]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-[14px] flex items-end p-4">
                <div>
                  <p className="text-white font-bold text-sm md:text-base">{member.name}</p>
                  <p className="text-white/80 text-xs md:text-sm">{member.role}</p>
                </div>
              </div>
              <div className="mt-3 text-center group-hover:opacity-0 transition-opacity">
                <p className="font-bold text-sm md:text-base text-black">{member.name}</p>
                <p className="text-xs md:text-sm text-body-text">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
