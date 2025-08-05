import React from 'react';

const Referral = () => {
  const referralCode = 'ABC123';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Referral Program</h2>
      <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
        <span className="text-lg font-mono bg-gray-200 text-gray-800 px-4 py-2 rounded">
          {referralCode}
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