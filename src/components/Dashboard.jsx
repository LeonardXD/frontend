import React, { useState, useEffect } from 'react';
import { useTitle } from '../hooks/useTitle';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  useTitle('Dashboard | DemoTasker');
  const navigate = useNavigate(); // Initialize useNavigate
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const userToken = localStorage.getItem('user_token');

    if (!userId || !userToken) {
      // If no user data in storage, redirect to signin
      navigate('/signin');
      return;
    }

    // Fetch the latest balance from local storage
    const savedCoins = localStorage.getItem('coinBalance');
    if (savedCoins) {
      setCoins(parseFloat(savedCoins));
    }

    // Optional: You might want to fetch the actual balance from the backend
    // on dashboard load to ensure it's always up-to-date.
    // This would involve another call to user_management.php with action 'fetch_user_data'.
    const fetchLatestBalance = async () => {
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
                localStorage.setItem('coinBalance', data.data.balance.toString()); // Update local storage
            } else {
                console.error('Failed to fetch latest balance:', data.message);
            }
        } catch (err) {
            console.error('Network error fetching balance:', err);
        }
    };
    fetchLatestBalance();

  }, [navigate]); // Add navigate to dependencies

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Coins</h1>
          <p className="text-5xl font-bold mt-4">{(coins * 1000).toLocaleString()}</p> {/* Displaying coins as 1000x balance for consistency with previous code */}
        </div>
        <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Withdrawable Balance</h1>
          <p className="text-5xl font-bold mt-4">₱{coins.toFixed(2)}</p>
        </div>
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Commissions</h1>
          <p className="text-5xl font-bold mt-4">₱0.00</p> {/* This would need further backend logic to be dynamic */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
