import { motion } from "framer-motion";
import { HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

const ContactUs = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or need support? Our cardiac care experts are here to help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Inquiry Type</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 appearance-none">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Medical Consultation</option>
                <option>Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <HeartIcon className="h-12 w-12 text-red-400 mx-auto mb-6" />
              <h3 className="text-2xl text-white mb-4">CardioCareAI Support</h3>
              <p className="text-gray-300 mb-6">24/7 Cardiac Health Assistance</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-blue-400 font-medium">Emergency Contact:</p>
                  <p className="text-gray-300">+1 (800) CAR-DIAC</p>
                </div>
                <div>
                  <p className="text-purple-400 font-medium">General Support:</p>
                  <p className="text-gray-300">support@cardiocare.ai</p>
                </div>
                <div>
                  <p className="text-blue-400 font-medium">Technical Support:</p>
                  <p className="text-gray-300">tech@cardiocare.ai</p>
                </div>
              </div>
            </div>

            {/* ECG Animation */}
            <div className="relative h-16 mt-8 ml-4">
              <motion.div
                className="absolute w-24 h-1 bg-red-500"
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
        </div>
      </div>
    </section>
  );
};

export default ContactUs;