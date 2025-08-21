import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast.error('Please fill out all fields and provide a rating!');
      return;
    }

    const payload = {
      ...formData,
      rating: rating
    };

    const token = localStorage.getItem('token');
    
    fetch(`${BASE_URL}feedback/add_feedback/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Thank you for your valuable feedback!');
          setFormData({ name: '', email: '', message: '' });
          setRating(0);
        } else {
          toast.error(data.message || 'Submission failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col">
      <Navbar />

      <div className="mt-20" />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{ backgroundColor: '#1e3a8a' }}
      />

      <motion.div 
        className="flex-grow flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mt-20" />

        <motion.div
          className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <HeartIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              Share Your Experience
            </h2>
            <p className="mt-2 text-gray-300">
              Help us improve cardiac care for everyone
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
                <label className="block text-gray-300 mb-2">Your Feedback</label>
                <textarea
                  name="message"
                  placeholder="Share your thoughts..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 text-white placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Rating</label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default FeedbackPage;