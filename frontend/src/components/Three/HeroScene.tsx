import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import img02 from '../../assets/02.png'
import img03 from '../../assets/03.png'
import img04 from '../../assets/04.png'
import img05 from '../../assets/05.png'
import img06 from '../../assets/06.png'
import img07 from '../../assets/07.png'

const images = [img02, img03, img04, img05, img06, img07]

export default function HeroScene() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 2500) // Switch every 2.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden card flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-400/10 via-purple-400/10 to-cyan-400/10 rounded-3xl blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        
        {/* Image switching animation */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Animation frame ${currentImageIndex + 2}`}
              className="max-w-full max-h-full object-contain"
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                rotateY: 90 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0,
                y: [0, -8, 0],
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                rotateY: -90 
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                rotateY: { duration: 0.5 },
                y: { 
                  duration: 2.5, 
                  ease: "easeInOut", 
                  repeat: 1,
                  repeatType: "reverse"
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            />
          </AnimatePresence>
        </div>

        {/* Progress indicator dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentImageIndex(index)}
              animate={{
                scale: index === currentImageIndex ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
