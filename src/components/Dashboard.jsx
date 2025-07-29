import React, { useState, useEffect } from 'react';
import { useTitle } from '../hooks/useTitle';

const Dashboard = () => {
  useTitle('Dashboard | DemoTasker');
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const savedCoins = localStorage.getItem('coinBalance');
    if (savedCoins) {
      setCoins(parseFloat(savedCoins));
    }
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Coins</h1>
          <p className="text-5xl font-bold mt-4">{coins.toLocaleString()}</p>
        </div>
        <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Withdrawable Balance</h1>
          <p className="text-5xl font-bold mt-4">₱{(coins / 1000).toFixed(2)}</p>
        </div>
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Commissions</h1>
          <p className="text-5xl font-bold mt-4">₱0.00</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
