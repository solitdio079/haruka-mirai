/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'


const pageVariants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
}


export default function AnimatedLayout ({ children }) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 1, type: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
