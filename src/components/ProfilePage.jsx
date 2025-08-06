import React, { useState, useEffect } from 'react';
import { FaWallet, FaLock, FaPen } from 'react-icons/fa';
import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfilePage = () => {
  useTitle('Profile | DemoTasker');
  const navigate = useNavigate(); // Initialize useNavigate
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userName, setUserName] = useState('Loading...');
  const [userEmail, setUserEmail] = useState('Loading...');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false); // Loading state for password change
  const [error, setError] = useState(null);

  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
    // Clear old messages and form data
    setMessage('');
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
  };
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  // Function to fetch user data from backend
  const fetchUserData = async () => {
    const userId = localStorage.getItem('user_id');
    const userToken = localStorage.getItem('user_token');

    if (!userId || !userToken) {
      // If no user data in storage, redirect to signin
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch(`http://localhost/backend/user_management.php?action=fetch_user_data&user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Send token for authentication
        },
      });
      const data = await response.json();

      if (response.status === 400 && data.message === 'User not found or session expired.') {
        // Token invalid or expired, force re-login
        localStorage.clear(); // Clear all user data
        sessionStorage.clear();
        navigate('/signin');
        return;
      }

      if (data.success) {
        setUserName(data.data.full_name);
        setUserEmail(data.data.email);
        // Update local storage in case balance changed on backend
        localStorage.setItem('coinBalance', data.data.balance.toString());
      } else {
        setError(data.message);
        setUserName('Guest');
        setUserEmail('N/A');
      }
    } catch (err) {
      setError('Failed to fetch user data. Network error.');
      setUserName('Error');
      setUserEmail('Error');
      console.error('Fetch user data error:', err);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch data on component mount

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeWalletModal();
        closePasswordModal();
      }
    };

    if (isWalletModalOpen || isPasswordModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isWalletModalOpen, isPasswordModalOpen, navigate]); // Add navigate to dependencies

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const userId = localStorage.getItem('user_id');
    const userToken = localStorage.getItem('user_token');

    if (!userId || !userToken) {
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
        const response = await fetch('http://localhost/backend/change_password.php', { // Assuming change_password.php exists
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` // Pass the token for authentication
            },
            body: JSON.stringify({
                user_id: userId, // Pass user_id instead of admin_id
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
            src="/logo.png" // Placeholder image
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
          <p className="text-gray-600">{userEmail}</p>
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg mt-4" role="alert">
              {error}
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Settings</h3>
          <div className="space-y-4">
            {/* Wallet Option */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out">
              <div className="flex items-center">
                <FaWallet className="text-green-500 mr-3 text-xl" />
                <span className="text-lg text-gray-700">Wallet</span>
              </div>
              <FaPen className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={openWalletModal} />
            </div>

            {/* Change Password Option */}
            <div className="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out" onClick={openPasswordModal}>
              <FaLock className="text-green-500 mr-3 text-xl" />
              <span className="text-lg text-gray-700">Change Password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeWalletModal} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Wallet Information</h3>

            <div className="mb-4">
              <label htmlFor="wallet-type" className="block text-gray-700 text-sm font-bold mb-2">
                Wallet
              </label>
              <select
                id="wallet-type"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>GCash</option>
                <option>PayMaya</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="account-number" className="block text-gray-700 text-sm font-bold mb-2">
                Account Number
              </label>
              <input
                type="text"
                id="account-number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="09xxxxxxxxx"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeWalletModal}
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePasswordModal} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>
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
                  placeholder="Enter current password"
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

              <div className="flex justify-end">
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
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
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

export default ProfilePage;
