import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, AlertCircle, Settings, LogOut, Heart } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import Profile from '../components/Dashboard/Profile';
import CommunityPosts from '../components/Dashboard/CommunityPosts';
import SubmittedFeedbacks from '../components/Dashboard/SubmittedFeedbacks';
import SettingsPanel from '../components/Dashboard/SettingsPanel';
import { BASE_URL } from '../config';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userString = localStorage.getItem('user');
  const userObj = JSON.parse(userString);
  const [profileData, setProfileData] = useState(userObj);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login-register';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': return <Profile user={profileData} />;
      case 'posts': return <CommunityPosts />;
      case 'feedbacks': return <SubmittedFeedbacks />;
      case 'settings': return <SettingsPanel />;
      default: return <Profile user={profileData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col">
      <Navbar />
      
      {/* Grid Layout Container */}
      <div className="mt-20 grid grid-cols-[auto_1fr] flex-1">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="w-64 bg-blue-900/20 backdrop-blur-lg border-r border-white/10 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <img
                  src={`${BASE_URL}media/${profileData.profile_picture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/30"
                />
                <Heart className="absolute -bottom-1 -right-1 h-5 w-5 text-red-500 bg-white rounded-full p-0.5" />
              </div>
              <div>
                <h3 className="text-white font-medium">{profileData.first_name} {profileData.last_name}</h3>
                <p className="text-sm text-blue-400">{profileData.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'profile', icon: <User size={20} className="text-blue-400" />, label: 'Profile' },
                { id: 'posts', icon: <MessageSquare size={20} className="text-blue-400" />, label: 'My Posts' },
                { id: 'feedbacks', icon: <AlertCircle size={20} className="text-blue-400" />, label: 'Feedbacks' },
                { id: 'settings', icon: <Settings size={20} className="text-blue-400" />, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-white/10 text-blue-400 border border-blue-400/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg mt-8 transition-all"
              >
                <LogOut size={20} className="text-red-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="h-[calc(100vh-5rem)] overflow-y-auto bg-gradient-to-br from-blue-900/30 to-purple-900/30">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 m-8"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default DashboardPage;