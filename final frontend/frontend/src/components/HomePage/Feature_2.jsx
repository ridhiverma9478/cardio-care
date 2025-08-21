import { motion } from "framer-motion";
import { ChartBarIcon, ShieldCheckIcon, CpuChipIcon, HeartIcon } from "@heroicons/react/24/solid";

const Feature_2 = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: "95% Prediction Accuracy",
      description: "Industry-leading accuracy powered by advanced neural networks trained on millions of data points"
    },
    {
      icon: ShieldCheckIcon,
      title: "Military-grade Security",
      description: "End-to-end encryption and HIPAA compliant data handling ensures your health data remains private"
    },
    {
      icon: CpuChipIcon,
      title: "Real-time Analysis",
      description: "Instant results with our optimized AI engine delivering predictions in under 2 seconds"
    },
    {
      icon: HeartIcon,
      title: "Proactive Care",
      description: "Personalized prevention plans that evolve with your health metrics over time"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-6">
            Why Choose CardioCareAI?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming cardiac care through innovative AI solutions trusted by healthcare professionals worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              {/* Gradient Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 to-red-500/20" />
              
              <div className="relative z-10">
                <feature.icon className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Animation Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-red-400 opacity-0 group-hover:opacity-100"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating AI Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="mt-16 flex justify-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-red-600 p-1 rounded-full">
            <div className="bg-blue-900/80 px-8 py-3 rounded-full backdrop-blur-md">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                AI-Powered Precision Since 2025
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_2;