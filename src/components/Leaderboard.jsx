import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleRows, setVisibleRows] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Replace this URL with your actual API endpoint
  const API_URL = 'http://localhost/backend/leaderboard.php';

  const fetchLeaderboardData = async (limit = 100, offset = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setLeaderboardData(data.data);
        setTotalUsers(data.total);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch leaderboard data');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const showMore = () => {
    setVisibleRows(prevVisibleRows => Math.min(prevVisibleRows + 10, leaderboardData.length));
  };

  const refreshData = () => {
    fetchLeaderboardData();
    setVisibleRows(10);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        <p className="mt-2">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={refreshData}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
        <p className="text-gray-600">No users found in the leaderboard.</p>
        <button
          onClick={refreshData}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Total Users: {totalUsers}</span>
          <button
            onClick={refreshData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Refresh
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-center">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Number of Invites</th>
              <th className="py-3 px-4">Coins Accumulated</th>
              <th className="py-3 px-4">Commissions (rate in PHP)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.slice(0, visibleRows).map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-4 font-semibold">
                  {user.rank <= 3 && (
                    <span className={`inline-block w-6 h-6 rounded-full text-white text-sm leading-6 mr-2 ${
                      user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : 'bg-yellow-600'
                    }`}>
                      {user.rank}
                    </span>
                  )}
                  {user.rank > 3 && user.rank}
                </td>
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.invites}</td>
                <td className="py-3 px-4">{user.coins.toLocaleString()}</td>
                <td className="py-3 px-4">₱{user.phpEquivalent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {visibleRows < leaderboardData.length && (
        <div className="text-center mt-4">
          <button
            onClick={showMore}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Show More ({visibleRows} of {leaderboardData.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;