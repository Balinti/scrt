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

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
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
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-white/90 hover:text-white text-xs transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  )}
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
