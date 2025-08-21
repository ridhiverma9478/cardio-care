import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const Feature_4 = () => {
  const testimonials = [
    {
      name: "Dr. Emily Sanders",
      role: "Cardiologist",
      location: "New York, USA",
      text: "CardioCareAI has transformed how we approach preventive care. The AI predictions align remarkably well with our clinical assessments.",
      rating: 5,
      avatar: "👩⚕️"
    },
    {
      name: "Michael Chen",
      role: "Patient",
      location: "Toronto, Canada",
      text: "The community support and early risk detection gave me a second chance at life. Forever grateful!",
      rating: 5,
      avatar: "👨💻"
    },
    {
      name: "HealthFirst Clinic",
      role: "Medical Institution",
      location: "London, UK",
      text: "Implementation reduced our diagnostic time by 40% while maintaining 98% accuracy. Essential tool for modern healthcare.",
      rating: 4.8,
      avatar: "🏥"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-cyan-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join 50,000+ users who've transformed their heart health journey with CardioCareAI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 relative"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-cyan-300">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">
                  {testimonial.rating}
                </span>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-200 italic relative z-10">
                "{testimonial.text}"
              </p>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold text-cyan-400">50K+</div>
            <div className="text-gray-300 text-sm">Active Users</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold text-blue-400">92%</div>
            <div className="text-gray-300 text-sm">Accuracy Rate</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold text-purple-400">4.9/5</div>
            <div className="text-gray-300 text-sm">Average Rating</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-3xl font-bold text-green-400">10M+</div>
            <div className="text-gray-300 text-sm">Predictions Made</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;
