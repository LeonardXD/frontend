import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import FAQ from './components/FAQ';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';
import NotFoundPage from './components/NotFoundPage';
import Leaderboard from './components/Leaderboard';
import './index.css';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Paths where the sidebar should be hidden
  const sidebarHiddenPaths = ['/', '/signin', '/signup'];
  const shouldShowSidebar = !sidebarHiddenPaths.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {shouldShowSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <NotFoundPage />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
