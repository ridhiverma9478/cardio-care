import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { 
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const ContactusPage = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login-register');
      }
    }, [navigate]);
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all fields!');
      return;
    }

    console.log('Contact form submitted:', formData);
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col">
      <Navbar />

      <div className="my-12" />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{ backgroundColor: '#1e3a8a' }}
      />

      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-8 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Contact Form */}
        <motion.div
          className="w-full lg:w-1/2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <HeartIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              Contact Our Team
            </h2>
            <p className="mt-2 text-gray-300">
              Have questions? We're here to help with your cardiac care needs
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Regarding Cardiac Care"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400 resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          variants={infoVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPinIcon className="w-6 h-6 text-blue-400" />
              Our Location
            </h3>
            <p className="text-gray-300">
              123 Cardiac Care Avenue<br/>
              Health City, HC 12345<br/>
              Punjab, India
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <PhoneIcon className="w-6 h-6 text-blue-400" />
              Contact Details
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>Emergency: +91 987 654 3210</p>
              <p>General: +91 11 2345 6789</p>
              <p>Fax: +91 11 2345 6790</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <EnvelopeIcon className="w-6 h-6 text-blue-400" />
              Email & Hours
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>Support: support@cardiocare.ai</p>
              <p>General: info@cardiocare.ai</p>
              <p>Mon-Fri: 8AM - 8PM IST</p>
              <p>Sat-Sun: 9AM - 5PM IST</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactusPage;