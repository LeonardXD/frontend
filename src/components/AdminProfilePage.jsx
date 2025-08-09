import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useTitle } from '../hooks/useTitle';

const AdminProfilePage = () => {
  useTitle('Admin Profile | DemoTasker');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
    // Clear old messages and form data
    setMessage('');
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
  };
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  useEffect(() => {
    // Retrieve user info from storage
    const storedName = localStorage.getItem('admin_name') || sessionStorage.getItem('admin_name');
    const storedEmail = localStorage.getItem('admin_email') || sessionStorage.getItem('admin_email');
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closePasswordModal();
      }
    };

    if (isPasswordModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPasswordModalOpen]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const adminId = localStorage.getItem('admin_id') || sessionStorage.getItem('admin_id');
    const adminToken = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');

    if (!adminId || !adminToken) {
        setMessage('You are not authenticated. Please log in again.');
        setMessageType('error');
        setLoading(false);
        return;
    }

    if (newPassword !== repeatPassword) {
      setMessage('New password and repeat password do not match.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!currentPassword || !newPassword || !repeatPassword) {
      setMessage('All password fields are required.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
        const response = await fetch('http://localhost/backend/change_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Optional: Pass the token for further authentication on the backend
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({
                admin_id: adminId,
                current_password: currentPassword,
                new_password: newPassword
            }),
        });

        const data = await response.json();

        if (data.success) {
            setMessage(data.message);
            setMessageType('success');
            // Clear the form fields on success
            setCurrentPassword('');
            setNewPassword('');
            setRepeatPassword('');
            // Optional: Close the modal after a short delay
            setTimeout(() => {
                closePasswordModal();
            }, 2000);
        } else {
            setMessage(data.message);
            setMessageType('error');
        }

    } catch (err) {
        console.error('Password change error:', err);
        setMessage('Network error. Please try again.');
        setMessageType('error');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-2xl">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <img
            src="assets/profile.png" // Placeholder image
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">{name || 'Admin'}</h2>
          <p className="text-gray-600">{email || 'admin@demotasker.com'}</p>
        </div>

        {/* Settings Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Settings</h3>
          <div className="space-y-4">
            {/* Change Password Option */}
            <div className="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out" onClick={openPasswordModal}>
              <FaLock className="text-green-500 mr-3 text-xl" />
              <span className="text-lg text-gray-700">Change Password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Change Password</h3>
            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label htmlFor="current-password" className="block text-gray-700 text-sm font-bold mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="new-password" className="block text-gray-700 text-sm font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="repeat-password" className="block text-gray-700 text-sm font-bold mb-2">
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Repeat new password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Confirming...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfilePage;
