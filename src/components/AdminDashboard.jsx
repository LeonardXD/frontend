import React, { useState } from 'react';
import { FaUser, FaHourglassHalf } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import { useTitle } from '../hooks/useTitle';

import AdminProfilePage from './AdminProfilePage';

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
const AdminNavbar = ({ toggleSidebar, setActiveTab }) => {
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
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('Profile');
                setIsDropdownOpen(false);
              }}
            >
              Profile
            </a>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer component for the Admin Dashboard
const AdminFooter = () => (
  <footer className="bg-neutral-900 text-white text-center p-4 mt-auto border-t">
    <p>© 2025 Admin Dashboard. All rights reserved.</p>
  </footer>
);

// View for the main dashboard content
const MainDashboardView = () => (
  useTitle('Admin Dashboard | DemoTasker'),
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
// MODIFICATION: Added searchQuery and setSearchQuery props for search functionality
const WithdrawalsView = ({ withdrawals, handleMarkAsPaid, searchQuery, setSearchQuery }) => (
  useTitle('Withdrawals | DemoTasker'),
  <>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Withdrawal Requests</h1>
      {/* NEW: Search input field */}
      <div className="w-full md:w-1/3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
    <div className="space-y-4">
      {withdrawals.length > 0 ? (
        withdrawals.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-center justify-between transition-all duration-300">
            <div className="flex-1 mb-4 md:mb-0">
              <p className="text-lg font-semibold text-gray-800">{user.username}</p>
              <p className="text-gray-600">Amount: ₱<span className="font-bold">{user.amount}</span></p>
              <p className="text-gray-600">{user.method}</p>
              <p className="text-gray-600">{user.number}</p>
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
        searchQuery.trim()
          ? <p className="text-center text-gray-500">No withdrawal requests match your search.</p>
          : <p className="text-center text-gray-500">No pending withdrawal requests.</p>
      )}
    </div>
  </>
);


// View for generating codes
const GenerateCodeView = () => {
  const [generatedCode, setGeneratedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useTitle('Generate Code | DemoTasker');

  const generateCode = async () => {
    setLoading(true);
    setGeneratedCode(null);
    setError(null);

    try {
      const response = await fetch('http://localhost/backend/generate_code.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Empty body for a simple POST request
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCode(data.code);
      } else {
        setError(data.message || 'Failed to generate code.');
      }
    } catch (err) {
      console.error('Code generation error:', err);
      setError('Network error. Failed to connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Generate Code</h1>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <button
          onClick={generateCode}
          disabled={loading}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {generatedCode && (
          <p className="mt-4 text-green-600">
            Code has been successfully generated: <strong className="font-bold">{generatedCode}</strong>
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600">
            Error: <strong className="font-bold">{error}</strong>
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
  // NEW: State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, username: 'Mudkipeekotorhic', amount: 120, method: 'GCash', number: '09129914790' },
    { id: 2, username: 'LeonardXD', amount: 300, method: 'GCash', number: '09918910234' },
    { id: 3, username: 'Hotdog123', amount: 50, method: 'Paymaya', number: '09479380936' },
    { id: 4, username: 'Smiley', amount: 210, method: 'GCash', number: '09093676592' },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMarkAsPaid = (id) => {
    setWithdrawals(prev => prev.filter(w => w.id !== id));
  };

  // NEW: Filter the withdrawals based on the search query before rendering
  const filteredWithdrawals = withdrawals.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <MainDashboardView />;
      case 'Generate Code':
        return <GenerateCodeView />;
      case 'Withdrawals':
        // MODIFICATION: Pass the filtered list and search state to the component
        return (
          <WithdrawalsView
            withdrawals={filteredWithdrawals}
            handleMarkAsPaid={handleMarkAsPaid}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'Promos':
        return <h1 className="text-3xl font-bold text-gray-800">Promos</h1>;
      case 'Profile':
        return <AdminProfilePage />;
      default:
        return <MainDashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar toggleSidebar={toggleSidebar} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {renderContent()}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;