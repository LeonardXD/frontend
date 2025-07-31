import React, { useState } from 'react';

const dummyData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  rank: i + 1,
  name: `User ${i + 1}`,
  invites: Math.floor(Math.random() * 100),
  coins: Math.floor(Math.random() * 10000),
  phpEquivalent: Math.floor(Math.random() * 10000) * 1.5,
}));

const Leaderboard = () => {
  const [visibleRows, setVisibleRows] = useState(10);

  const showMore = () => {
    setVisibleRows(prevVisibleRows => Math.min(prevVisibleRows + 10, 100));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-center">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Number of Invites</th>
              <th className="py-3 px-4">Coins Accumulated</th>
              <th className="py-3 px-4">Equivalent in PHP</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.slice(0, visibleRows).map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-3 px-4">{user.rank}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.invites}</td>
                <td className="py-3 px-4">{user.coins.toLocaleString()}</td>
                <td className="py-3 px-4">₱{user.phpEquivalent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleRows < 100 && (
        <div className="text-center mt-4">
          <button
            onClick={showMore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
