import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Referral = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [referralCode, setReferralCode] = useState('Loading...');
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [balance, setBalance] = useState('0.00');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchReferralCode = async () => {
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
          setReferralCode(data.data.referral_code);
          setTotalReferrals(data.data.total_referrals);
          setBalance(data.data.balance);
        } else {
          setError(data.message);
          setReferralCode('N/A');
        }
      } catch (err) {
        setError('Failed to fetch referral code. Network error.');
        setReferralCode('Error');
        console.error('Fetch referral code error:', err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchReferralCode();
  }, [navigate]); // Add navigate to dependencies

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Referral Program</h2>
      
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg mb-4" role="alert">
          {error}
        </div>
      )}

      {/*-- Start: New Two-Column Section --*/}
      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div className="p-4 bg-blue-100 rounded-lg">
          <p className="text-sm font-semibold text-blue-800">Total Invites</p>
          <p className="text-2xl font-bold text-blue-900">
            {loading ? '...' : totalReferrals}
          </p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <p className="text-sm font-semibold text-purple-800">Accumulated Coins</p>
          <p className="text-2xl font-bold text-purple-900">
            {loading ? '...' : parseFloat(balance).toLocaleString()}
          </p>
        </div>
      </div>
      {/*-- End: New Two-Column Section --*/}

      <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
        <span className="text-lg font-mono bg-gray-200 text-gray-800 px-4 py-2 rounded">
          {loading ? 'Generating...' : referralCode}
        </span>
      </div>
      
      <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
        <p>
          When a user signs up using your referral code, you will receive ₱20 and your invite will receive ₱5.
        </p>
      </div>
    </div>
  );
};

export default Referral;