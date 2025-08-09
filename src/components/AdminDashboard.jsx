import React, { useState, useEffect } from 'react';
import { FaUser, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png';
import { useTitle } from '../hooks/useTitle';
import Alert from '../components/Alert'; // Assuming Alert component exists

import AdminProfilePage from './AdminProfilePage';
import CreateAnnouncement from './CreateAnnouncement';

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
    { name: 'Announcements', path: '/admin/announcements' },
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
const MainDashboardView = () => {
    useTitle('Admin Dashboard | DemoTasker');
    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div><h2 className="text-lg font-semibold text-gray-600">Total Users</h2><p className="text-3xl font-bold text-gray-800">1,250</p></div>
                    <CardIcon><FaUser className="h-6 w-6 text-gray-600" /></CardIcon>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div><h2 className="text-lg font-semibold text-gray-600">Pending Payments</h2><p className="text-3xl font-bold text-gray-800">₱129</p></div>
                    <CardIcon><FaHourglassHalf className="h-6 w-6 text-gray-600" /></CardIcon>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div><h2 className="text-lg font-semibold text-gray-600">Payments Completed</h2><p className="text-3xl font-bold text-gray-800">₱5,000</p></div>
                    <CardIcon><FaCheckCircle className="h-6 w-6 text-green-500" /></CardIcon>
                </div>
            </div>
        </>
    );
};

// View for the withdrawals list
const WithdrawalsView = ({ withdrawals, handleMarkAsPaid, searchQuery, setSearchQuery, isLoading, error }) => {
  useTitle('Withdrawals | DemoTasker');

  if (isLoading) {
    return <div className="text-center p-10">Loading withdrawal requests...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Withdrawal Requests</h1>
        <div className="w-full md:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or wallet..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="space-y-4">
        {withdrawals.length > 0 ? (
          withdrawals.map(req => (
            <div key={req.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-center justify-between transition-all duration-300">
              <div className="flex-1 mb-4 md:mb-0">
                <p className="text-lg font-semibold text-gray-800">{req.full_name}</p>
                <p className="text-gray-600">Amount: <span className="font-bold">₱{(req.amount / 1000).toFixed(2)}</span> ({req.amount.toLocaleString()} coins)</p>
                <p className="text-gray-600">Method: <span className="font-semibold">{req.wallet_name}</span></p>
                <p className="text-gray-600">Details: <span className="font-semibold">{req.wallet_address}</span></p>
                <p className="text-xs text-gray-400">Date: {new Date(req.created_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleMarkAsPaid(req.id)}
                className="w-full md:w-auto bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors"
              >
                Mark as Paid
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">
            {searchQuery.trim() ? "No requests match your search." : "No pending withdrawal requests."}
          </p>
        )}
      </div>
    </>
  );
};

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
  const location = useLocation();

  // State for Withdrawals
  const [withdrawals, setWithdrawals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });


  // Fetch withdrawals when the component mounts or tab changes to 'Withdrawals'
  useEffect(() => {
    const fetchWithdrawals = async () => {
      if (activeTab !== 'Withdrawals') return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost/backend/admin_handler.php?action=fetch_withdrawals');
        const data = await response.json();
        if (data.success) {
          setWithdrawals(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch data.');
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch withdrawals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWithdrawals();
  }, [activeTab]);


  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) setActiveTab('Dashboard');
    else if (path.includes('/admin/generate-code')) setActiveTab('Generate Code');
    else if (path.includes('/admin/withdrawals')) setActiveTab('Withdrawals');
    else if (path.includes('/admin/promos')) setActiveTab('Promos');
    else if (path.includes('/admin/announcements')) setActiveTab('Announcements');
    else if (path.includes('/admin/profile')) setActiveTab('Profile');
  }, [location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMarkAsPaid = async (id) => {
    // Optimistically update UI
    const originalWithdrawals = [...withdrawals];
    setWithdrawals(prev => prev.filter(w => w.id !== id));

    try {
        const response = await fetch('http://localhost/backend/admin_handler.php?action=mark_as_paid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ withdrawal_id: id })
        });
        const data = await response.json();
        if (!data.success) {
            // Revert UI on failure
            setWithdrawals(originalWithdrawals);
            setAlert({ show: true, message: data.message || 'Failed to update status.', type: 'error' });
        } else {
            setAlert({ show: true, message: 'Withdrawal marked as paid!', type: 'success' });
        }
    } catch (err) {
        // Revert UI on network error
        setWithdrawals(originalWithdrawals);
        setAlert({ show: true, message: 'Network error. Please try again.', type: 'error' });
    }
  };

  const filteredWithdrawals = withdrawals.filter(req =>
    req.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.wallet_address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <MainDashboardView />;
      case 'Generate Code': return <GenerateCodeView />;
      case 'Withdrawals':
        return (
          <WithdrawalsView
            withdrawals={filteredWithdrawals}
            handleMarkAsPaid={handleMarkAsPaid}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'Promos': return <h1 className="text-3xl font-bold text-gray-800">Promos</h1>;
      case 'Announcements': return <CreateAnnouncement />;
      case 'Profile': return <AdminProfilePage />;
      default: return <MainDashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
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
