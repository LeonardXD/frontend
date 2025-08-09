import React, { useState, useEffect, useCallback } from 'react';
import { FaWallet, FaLock, FaPen } from 'react-icons/fa';
import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Using axios for cleaner requests

const API_URL = 'http://localhost/backend'; // Centralized API URL

const ProfilePage = () => {
  useTitle('Profile | DemoTasker');
  const navigate = useNavigate();

  // User State
  const [userName, setUserName] = useState('Loading...');
  const [userEmail, setUserEmail] = useState('Loading...');
  const [error, setError] = useState(null);

  // Wallet Modal State
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletData, setWalletData] = useState({ wallet_name: 'GCash', wallet_address: '' });
  const [walletMessage, setWalletMessage] = useState('');
  const [walletMessageType, setWalletMessageType] = useState('');
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  // Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', repeatPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessageType, setPasswordMessageType] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Fetch basic user data
  const fetchUserData = useCallback(async () => {
    const userId = localStorage.getItem('user_id');
    const userToken = localStorage.getItem('user_token');

    if (!userId || !userToken) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/user_management.php?action=fetch_user_data&user_id=${userId}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });

      if (response.data.success) {
        setUserName(response.data.data.full_name);
        setUserEmail(response.data.data.email);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/signin');
      } else {
        setError(err.message || 'Failed to fetch user data.');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // --- Wallet Logic ---
  const openWalletModal = async () => {
    setIsWalletModalOpen(true);
    setWalletMessage(''); // Clear previous messages
    setIsWalletLoading(true);
    const userToken = localStorage.getItem('user_token');

    try {
      const response = await axios.get(`${API_URL}/wallet_setup.php`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      if (response.data.success && response.data.data) {
        setWalletData({
          wallet_name: response.data.data.wallet_name || 'GCash',
          wallet_address: response.data.data.wallet_address || ''
        });
      }
    } catch (err) {
      setWalletMessage('Failed to fetch wallet details.');
      setWalletMessageType('error');
    } finally {
      setIsWalletLoading(false);
    }
  };

  const closeWalletModal = () => setIsWalletModalOpen(false);

  const handleWalletSave = async (e) => {
    e.preventDefault();
    setWalletMessage('');
    setIsWalletLoading(true);
    const userToken = localStorage.getItem('user_token');

    try {
      const response = await axios.post(`${API_URL}/wallet_setup.php`, walletData, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });

      if (response.data.success) {
        setWalletMessage(response.data.message);
        setWalletMessageType('success');
        setTimeout(closeWalletModal, 1500);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setWalletMessage(err.message || 'An error occurred.');
      setWalletMessageType('error');
    } finally {
      setIsWalletLoading(false);
    }
  };

  // --- Password Logic ---
  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
    setPasswordMessage('');
    setPasswordData({ currentPassword: '', newPassword: '', repeatPassword: '' });
  };

  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // (Your existing password change logic here)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <img src="assets/logo.png" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
          <p className="text-gray-600">{userEmail}</p>
          {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg mt-4">{error}</div>}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100" onClick={openWalletModal}>
              <div className="flex items-center">
                <FaWallet className="text-green-500 mr-3 text-xl" />
                <span className="text-lg text-gray-700">Wallet</span>
              </div>
              <FaPen className="text-gray-500 hover:text-gray-700" />
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100" onClick={openPasswordModal}>
              <FaLock className="text-green-500 mr-3 text-xl" />
              <span className="text-lg text-gray-700">Change Password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Wallet Information</h3>
            {walletMessage && <div className={`p-3 rounded-lg mb-4 text-sm ${walletMessageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{walletMessage}</div>}
            <form onSubmit={handleWalletSave}>
              <div className="mb-4">
                <label htmlFor="wallet-type" className="block text-gray-700 text-sm font-bold mb-2">Wallet</label>
                <select id="wallet-type" value={walletData.wallet_name} onChange={(e) => setWalletData({ ...walletData, wallet_name: e.target.value })} className="shadow border rounded w-full py-2 px-3 text-gray-700" disabled={isWalletLoading}>
                  <option>GCash</option>
                  <option>PayMaya</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="account-number" className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
                <input type="text" id="account-number" value={walletData.wallet_address} onChange={(e) => setWalletData({ ...walletData, wallet_address: e.target.value })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="09xxxxxxxxx" disabled={isWalletLoading} />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeWalletModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" disabled={isWalletLoading}>Cancel</button>
                <button type="submit" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50" disabled={isWalletLoading}>
                  {isWalletLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal (Your existing code) */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
            {/* ... your existing password modal JSX ... */}
             <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>
             <p>Password change form goes here.</p>
             <button onClick={closePasswordModal} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
