import { motion } from 'framer-motion';
import { HeartIcon, UserGroupIcon, ChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Dr. Rajesh Sharma', role: 'Lead Cardiologist', exp: '15+ years' },
    { name: 'Dr. Priya Singh', role: 'AI Research Head', exp: 'PhD in ML' },
    { name: 'Arjun Mehta', role: 'Full Stack Developer', exp: 'HealthTech Expert' },
    { name: 'Ananya Reddy', role: 'Patient Care Lead', exp: '10+ years' },
  ];

  const stats = [
    { number: '50K+', label: 'Lives Impacted' },
    { number: '92%', label: 'Prediction Accuracy' },
    { number: '150+', label: 'Medical Partners' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 px-6 text-center overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="inline-block mb-8"
          >
            <HeartIcon className="h-16 w-16 text-red-500 mx-auto" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-6"
          >
            Revolutionizing Cardiac Care Through AI
          </motion.h1>
          
          <motion.p
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            At CardioCareAI, we combine medical expertise with cutting-edge artificial intelligence to deliver proactive heart health solutions for a healthier tomorrow.
          </motion.p>

          {/* ECG Animation Line */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-900/50 to-transparent">
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
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              To democratize access to advanced cardiac care through AI-powered solutions that enable early detection, personalized treatment plans, and continuous health monitoring.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
              <AcademicCapIcon className="h-12 w-12 text-blue-400" />
              <p className="text-gray-300">
                Partnered with 15+ medical institutions for continuous research
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <UserGroupIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A multidisciplinary team of cardiologists, data scientists, and healthcare professionals dedicated to heart health innovation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all"
              >
                <div className="h-48 w-full bg-blue-900/30 rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <ChartBarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Core Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Patient First</h3>
              <p className="text-gray-300">
                Every algorithm and interface designed with patient well-being as the primary focus.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Medical Integrity</h3>
              <p className="text-gray-300">
                All solutions validated by cardiologists and peer-reviewed research.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Continuous Innovation</h3>
              <p className="text-gray-300">
                Daily updates to our models using the latest medical research data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;