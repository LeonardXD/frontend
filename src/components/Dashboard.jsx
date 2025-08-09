import React, { useState, useEffect } from 'react';
import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert'; // Make sure the path is correct

const Dashboard = () => {
  useTitle('Dashboard | DemoTasker');
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0);
  const [commissions, setCommissions] = useState(0);
  
  // New state for withdrawal feature
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [walletInfo, setWalletInfo] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const userId = localStorage.getItem('user_id');
  const userToken = localStorage.getItem('user_token');

  useEffect(() => {
    if (!userId || !userToken) {
      navigate('/signin');
      return;
    }

    const fetchLatestData = async () => {
      try {
        const response = await fetch(`http://localhost/backend/user_management.php?action=fetch_user_data&user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
        });
        const data = await response.json();
        if (data.success) {
          setCoins(parseFloat(data.data.balance));
          setCommissions(parseFloat(data.data.commissions));
          localStorage.setItem('coinBalance', data.data.balance.toString());
          localStorage.setItem('commissions', data.data.commissions.toString());
        } else {
          console.error('Failed to fetch latest data:', data.message);
          setAlert({ show: true, message: data.message || 'Session expired. Please log in again.', type: 'error' });
          setTimeout(() => navigate('/signin'), 3000);
        }
      } catch (err) {
        console.error('Network error fetching data:', err);
        setAlert({ show: true, message: 'Network error. Please check your connection.', type: 'error' });
      }
    };
    fetchLatestData();
  }, [navigate, userId, userToken]);

  const handleWithdrawClick = async () => {
    try {
      const response = await fetch(`http://localhost/backend/withdrawal_handler.php?action=check_wallet&user_id=${userId}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      const data = await response.json();

      if (data.success) {
        if (data.hasWallet) {
          setWalletInfo(data.wallet);
          setIsModalOpen(true);
        } else {
          setAlert({ show: true, message: 'Please set up your wallet first in the Profile page.', type: 'warning' });
        }
      } else {
        setAlert({ show: true, message: data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error checking wallet:', error);
      setAlert({ show: true, message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  const handleConfirmWithdrawal = async () => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount < 1000) {
      setAlert({ show: true, message: 'Minimum withdrawal amount is 1000 coins.', type: 'error' });
      return;
    }
    if (amount > coins) {
      setAlert({ show: true, message: 'Withdrawal amount cannot exceed your balance.', type: 'error' });
      return;
    }

    try {
      const response = await fetch(`http://localhost/backend/withdrawal_handler.php?action=request_withdrawal&user_id=${userId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({ amount: amount })
      });

      const data = await response.json();

      if (data.success) {
          setAlert({ show: true, message: data.message, type: 'success' });
          setCoins(parseFloat(data.newBalance)); // Update balance immediately
          localStorage.setItem('coinBalance', data.newBalance.toString());
          setIsModalOpen(false);
          setWithdrawalAmount('');
      } else {
          setAlert({ show: true, message: data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setAlert({ show: true, message: 'An error occurred while processing your request.', type: 'error' });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWithdrawalAmount('');
  };

  return (
    <>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="container mx-auto mt-10 p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Coins Balance Card */}
          <div className="bg-green-500 text-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Coins</h1>
            <p className="text-4xl md:text-5xl font-bold mt-4">{coins.toLocaleString()}</p>
          </div>

          {/* Withdrawable Balance Card */}
          <div className="bg-red-500 text-white p-6 md:p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-bold">Withdrawable Balance</h1>
            <p className="text-4xl md:text-5xl font-bold mt-4">₱{(coins / 1000).toFixed(2)}</p>
            <button
              onClick={handleWithdrawClick}
              className="mt-6 bg-white text-red-500 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors"
            >
              Withdraw
            </button>
          </div>

          {/* Commissions Card */}
          <div className="bg-blue-500 text-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Commissions</h1>
            <p className="text-4xl md:text-5xl font-bold mt-4">₱{commissions.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md z-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Withdrawal</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (in Coins)</label>
                <input
                  type="number"
                  id="amount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 1500"
                />
                <p className="mt-2 text-xs text-gray-500">Minimum withdrawal amount is 1000 coins (₱1.00).</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">Your Details</h3>
                <p className="text-sm text-gray-600">Available Balance: <span className="font-bold">{coins.toLocaleString()} Coins</span></p>
                {walletInfo && (
                   <p className="text-sm text-gray-600">Wallet: <span className="font-bold">{walletInfo.wallet_name} ({walletInfo.wallet_address})</span></p>
                )}
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-700">Conditions:</h4>
                <ul className="list-disc list-inside text-xs text-gray-500 space-y-1 mt-2">
                  <li>Withdrawals are processed within 24-48 hours.</li>
                  <li>A small transaction fee may apply.</li>
                  <li>Ensure your wallet details are correct.</li>
                  <li>All transactions are final.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdrawal}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
