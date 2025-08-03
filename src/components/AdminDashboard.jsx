import React, { useState } from 'react';
import { FaUser, FaHourglassHalf } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../../public/logo.png';
import profile from '../../public/profile.png';

// Re-usable Icon component for cards
const CardIcon = ({ children }) => (
  <div className="p-3 bg-gray-200 rounded-full">{children}</div>
);

// Sidebar component specific to the Admin Dashboard
const AdminSidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Generate Code', path: '/admin/generate-code' },
    { name: 'Withdrawals', path: '/admin/withdrawals' },
    { name: 'Promos', path: '/admin/promos' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 p-4 border-r border-gray-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 md:relative md:block`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-semibold">Admin</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => {
                  setActiveTab(item.name);
                  if (isOpen) toggleSidebar();
                }}
                className={`block rounded-lg p-4 shadow transform transition-all duration-200 ease-in-out ${
                  activeTab === item.name
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                    : 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-md hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Navbar component for the Admin Dashboard
const AdminNavbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between relative z-30">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="md:hidden text-gray-800 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="hidden md:inline text-xl font-bold text-gray-800">Admin Dashboard</span>
      </div>
      <div className="relative">
        <img
          src={profile}
          alt="Profile"
          className="h-10 w-10 cursor-pointer rounded-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer component for the Admin Dashboard
const AdminFooter = () => (
  <footer className="bg-white text-gray-600 text-center p-4 mt-auto border-t">
    <p>© 2025 Admin Dashboard. All rights reserved.</p>
  </footer>
);

// View for the main dashboard content
const MainDashboardView = () => (
  <>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1: Total Users */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800">1,250</p>
        </div>
        <CardIcon>
          <FaUser className="h-6 w-6 text-gray-600" />
        </CardIcon>
      </div>
      {/* Card 2: Pending Payments */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Pending Payments</h2>
          <p className="text-3xl font-bold text-gray-800">₱129</p>
        </div>
        <CardIcon>
          <FaHourglassHalf className="h-6 w-6 text-gray-600" />
        </CardIcon>
      </div>
      {/* Card 3: Payments Completed */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Payments Completed</h2>
          <p className="text-3xl font-bold text-gray-800">₱5,000</p>
        </div>
        <CardIcon>
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </CardIcon>
      </div>
    </div>
  </>
);

// View for the withdrawals list
const WithdrawalsView = ({ withdrawals, handleMarkAsPaid }) => (
  <>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Withdrawal Requests</h1>
    <div className="space-y-4">
      {withdrawals.length > 0 ? (
        withdrawals.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-center justify-between transition-all duration-300">
            <div className="flex-1 mb-4 md:mb-0">
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
              <p className="text-gray-600">Amount: <span className="font-bold">{user.amount}</span></p>
            </div>
            <button
              onClick={() => handleMarkAsPaid(user.id)}
              className="w-full md:w-auto bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors"
            >
              Mark as Paid
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No pending withdrawal requests.</p>
      )}
    </div>
  </>
);

// View for generating codes
const GenerateCodeView = () => {
  const [generatedCode, setGeneratedCode] = useState(null);

  const generateCode = () => {
    const characters = 'A0B1C2D3E4F5G6H7I8J9KLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedCode(result);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Generate Code</h1>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <button
          onClick={generateCode}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors"
        >
          Generate
        </button>
        {generatedCode && (
          <p className="mt-4 text-green-600">
            Code has been successfully generated: <strong className="font-bold">{generatedCode}</strong>
          </p>
        )}
      </div>
    </>
  );
};

// Main AdminDashboard component
const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, username: 'Mudkipeekotorhic', amount: 120 },
    { id: 2, username: 'LeonardXD', amount: 300 },
    { id: 3, username: 'Hotdog123', amount: 50 },
    { id: 4, username: 'Smiley', amount: 210 },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMarkAsPaid = (id) => {
    setWithdrawals(prev => prev.filter(w => w.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <MainDashboardView />;
      case 'Generate Code':
        return <GenerateCodeView />;
      case 'Withdrawals':
        return <WithdrawalsView withdrawals={withdrawals} handleMarkAsPaid={handleMarkAsPaid} />;
      case 'Promos':
        return <h1 className="text-3xl font-bold text-gray-800">Promos</h1>;
      default:
        return <MainDashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {renderContent()}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;
