import React from 'react';

const withdrawalData = [
  {
    id: 1,
    amount: '$100',
    accountNumber: 'XXXX-1234',
    date: 'August 1, 2025',
    status: 'Paid',
  },
  {
    id: 2,
    amount: '$50',
    accountNumber: 'XXXX-5678',
    date: 'July 28, 2025',
    status: 'Pending',
  },
  {
    id: 3,
    amount: '$200',
    accountNumber: 'XXXX-9012',
    date: 'July 25, 2025',
    status: 'Failed',
  },
  {
    id: 4,
    amount: '$75',
    accountNumber: 'XXXX-3456',
    date: 'July 22, 2025',
    status: 'Paid',
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const WithdrawalHistory = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Withdrawal History</h1>
      <div className="space-y-4">
        {withdrawalData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="mb-4 sm:mb-0">
              <p className="text-lg font-semibold">{item.amount}</p>
              <p className="text-sm text-gray-600">{item.accountNumber}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
            <div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawalHistory;
