import React, { useState, useEffect } from 'react';
import AnnouncementModal from './AnnouncementModal';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0,
    has_more: false
  });

  // Fetch announcements from backend
  const fetchAnnouncements = async (offset = 0, limit = 50) => {
    try {
      setLoading(true);
      // In Announcements.jsx, change back to:
      const response = await fetch(`http://localhost/backend/get_announcements.php?limit=${limit}&offset=${offset}&active_only=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // If this is the first load (offset = 0), replace the array
        // If loading more (offset > 0), append to existing announcements
        if (offset === 0) {
          setAnnouncements(data.data);
        } else {
          setAnnouncements(prev => [...prev, ...data.data]);
        }
        
        setPagination(data.pagination);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch announcements');
      }
    } catch (err) {
      console.error('Fetch announcements error:', err);
      setError(err.message || 'Failed to load announcements');
      
      // If it's the first load and there's an error, show fallback data
      if (offset === 0) {
        const fallbackAnnouncements = [
          {
            id: 1,
            title: 'Welcome to DemoTasker',
            preview: 'Welcome to our platform! We are excited to have you here. This is a sample announcement to show how the system works.',
            content: 'Welcome to our platform! We are excited to have you here. This is a sample announcement to show how the system works. You can create, edit, and manage announcements from the admin dashboard.',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            title: 'System Notice',
            preview: 'Please note that this is a demo version. Some features may be limited or not fully functional.',
            content: 'Please note that this is a demo version. Some features may be limited or not fully functional. For any questions or support, please contact the administrator.',
            created_at: new Date().toISOString()
          }
        ];
        setAnnouncements(fallbackAnnouncements);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle opening modal
  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  // Handle closing modal
  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  // Handle loading more announcements
  const loadMore = () => {
    if (!loading && pagination.has_more) {
      fetchAnnouncements(pagination.offset + pagination.limit, pagination.limit);
    }
  };

  // Handle refresh
  const refreshAnnouncements = () => {
    fetchAnnouncements(0, pagination.limit);
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Recently';
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <button
          onClick={refreshAnnouncements}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          ) : (
            'Refresh'
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && announcements.length === 0 && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Error: {error}</p>
              <p className="text-sm mt-1">Showing sample announcements below.</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && announcements.length === 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Announcements grid */}
      {announcements.length > 0 && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                onClick={() => openModal(announcement)}
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {announcement.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {announcement.preview || announcement.content}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Click to read more</span>
                  <span>{formatDate(announcement.created_at)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Load more button */}
          {pagination.has_more && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading More...
                  </div>
                ) : (
                  `Load More (${pagination.total - announcements.length} remaining)`
                )}
              </button>
            </div>
          )}

          {/* Results info */}
          <div className="text-center mt-4 text-gray-500 text-sm">
            Showing {announcements.length} of {pagination.total} announcements
          </div>
        </>
      )}

      {/* No announcements message */}
      {!loading && announcements.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
          <p className="text-gray-500">Check back later for new announcements and updates.</p>
        </div>
      )}

      {/* Modal */}
      {selectedAnnouncement && (
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Announcements;