import { motion } from 'framer-motion'
import { projects } from '../data/content'
import SVGText from './SVGText'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Projects() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="hidden md:flex justify-center">
          <SVGText
            text="Some Notable Projects Built on Secret Network"
            fontSize={34}
            fontWeight={700}
            fontFamily="'Roboto', sans-serif"
            strokeColor="#FFFF80"
            color="#fff"
            duration={2}
            maxWidth={700}
          />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:hidden text-2xl font-bold text-white text-center"
        >
          Some Notable Projects Built on Secret Network
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-center text-white/90 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
        >
          SCRT Labs is utilizing state-of-the-art privacy enhancing technologies, and in particular,
          Trusted Execution Environments (TEEs), combined with cryptographic protocols to build the
          world's largest private computing ecosystem. Based on cutting-edge research that started out
          at MIT in 2015, SCRT Labs today is a leading expert in building private computing (also
          known as confidential computing) solutions.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
              className="bg-peach rounded-[14px] p-6 flex flex-col items-center text-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-default"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/images/${project.logo}`}
                alt={project.name}
                className="h-16 w-16 object-contain"
              />
              <h3 className="text-lg font-bold text-black">{project.name}</h3>
              <p className="text-sm text-body-text leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
