import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function CommunityHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-blue-900 to-purple-900 min-h-[50vh] flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl text-center mt-20 relative z-10"
      >
        <div className="flex justify-center mb-6">
          <HeartIcon className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome To <br />
          <span className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            CardioCareAI
          </span>{" "}
          Community!
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto"
        >
          Join our vibrant community of patients, healthcare professionals, and AI enthusiasts to share experiences, discuss heart health, and explore the future of cardiac care.
        </motion.p>
        
        {/* ECG Animation Line */}
        <div className="absolute bottom-6 left-0 w-full h-16 bg-gradient-to-t from-blue-900/50 to-transparent z-20">
          <motion.div
            className="absolute top-0 w-24 h-1 bg-red-500"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              boxShadow: "0 0 8px rgba(239, 68, 68, 0.5)"
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}