import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Feature_1 = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full pattern-grid-lg pattern-blue-500 pattern-opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-24">
          {/* Left Column - Description */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8 text-white"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                Revolutionizing Cardiac Care
              </h2>
            </motion.div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              CardioCareAI leverages cutting-edge machine learning algorithms to 
              analyze complex health parameters and predict cardiovascular risks 
              with unprecedented accuracy. Our platform bridges the gap between 
              advanced AI technology and practical healthcare solutions.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <SparklesIcon className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <p className="text-gray-200">
                  Real-time risk assessment powered by neural networks
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <SparklesIcon className="h-8 w-8 text-red-400 flex-shrink-0" />
                <p className="text-gray-200">
                  Personalized preventive care recommendations
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Project Name Display */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-xl aspect-square">
              {/* Floating Orbs */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500 to-transparent rounded-full blur-xl opacity-30" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-l from-red-500 to-transparent rounded-full blur-xl opacity-30" />
              </motion.div>

              {/* Project Name Display */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  className="inline-block"
                >
                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-red-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                    CARDIOCARE
                    <span className="block text-4xl md:text-5xl mt-4 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                      AI
                    </span>
                  </h2>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%"
          }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%"
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </section>
  );
};

export default Feature_1;