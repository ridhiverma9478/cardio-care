import { useState } from 'react';
import { toast } from 'react-toastify';

const SettingsPanel = () => {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [emailData, setEmailData] = useState({
    current: '',
    new: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validate that the new password and confirmation match
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    // TODO: Implement API call to update password
    // For now, we simulate a successful update
    toast.success('Password updated successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update email
    // For now, we simulate a successful update
    toast.success('Email updated successfully');
    setEmailData({ current: '', new: '' });
  };

  return (
    <div className="space-y-8">
      {/* Change Password Panel */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={passwordData.current}
            onChange={handlePasswordChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            required
          />
          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={passwordData.new}
            onChange={handlePasswordChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={passwordData.confirm}
            onChange={handlePasswordChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Change Email Panel */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Change Email</h3>
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            name="current"
            placeholder="Current Email"
            value={emailData.current}
            onChange={handleEmailChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            required
          />
          <input
            type="email"
            name="new"
            placeholder="New Email"
            value={emailData.new}
            onChange={handleEmailChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700"
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;
