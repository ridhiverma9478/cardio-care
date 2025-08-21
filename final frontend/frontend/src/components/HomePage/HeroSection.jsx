import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import videoSource from '../../assets/cardio_video.mp4';

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20 to-blue-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Heart Health with
            <span className="text-blue-400"> AI</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Predict cardiovascular risks with advanced machine learning and take proactive 
            steps towards a healthier heart. Designed for both patients and healthcare 
            professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href='/login-register'>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ECG Animation Line */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-900/50 to-transparent z-20">
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
    </section>
  );
};

export default HeroSection;
