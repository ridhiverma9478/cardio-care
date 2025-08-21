import React, { useState } from 'react';
import { Pencil, Heart } from 'lucide-react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const { data } = await axios.post(`${BASE_URL}users/edit_user_details/`, new FormData(e.target), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user_details));
      setProfileData(data.user_details);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${BASE_URL}users/edit_profile_picture/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user_details));
        setProfileData(data.user_details);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Profile Settings
      </h2>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 p-1">
            <div className="w-full h-full bg-blue-900/20 rounded-full overflow-hidden">
              <img
                src={`${BASE_URL}media/${profileData.profile_picture}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleProfilePictureChange} 
            className="absolute inset-0 opacity-0 cursor-pointer" 
          />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">{profileData.name}</h3>
          <p className="text-blue-400">{profileData.email}</p>
          <p className="text-blue-400">{profileData.username}</p>
          <p className="text-blue-400">{profileData.phone_number}</p>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            name="first_name"
            value={profileData.first_name}
            onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            name="last_name"
            value={profileData.last_name}
            onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            name="username"
            value={profileData.username}
            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            name="phone_number"
            value={profileData.phone_number}
            onChange={(e) => setProfileData({...profileData, phone_number: e.target.value})}
          />
        </div>
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;