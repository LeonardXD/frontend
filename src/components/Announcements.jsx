import React, { useState } from 'react';
import AnnouncementModal from './AnnouncementModal';

const announcements = [
  {
    id: 1,
    title: 'New Feature: Dark Mode',
    preview: 'We are excited to announce the launch of our new dark mode feature. You can now switch to a darker theme for a more comfortable viewing experience at night.',
    content: 'We are excited to announce the launch of our new dark mode feature. You can now switch to a darker theme for a more comfortable viewing experience at night. To enable dark mode, go to your profile settings and select the "Dark Mode" option. We hope you enjoy this new feature!',
  },
  {
    id: 2,
    title: 'Scheduled Maintenance',
    preview: 'We will be performing scheduled maintenance on our servers this weekend to improve performance and reliability. The platform may be temporarily unavailable.',
    content: 'We will be performing scheduled maintenance on our servers this weekend to improve performance and reliability. The platform may be temporarily unavailable on Saturday from 10 PM to 11 PM PST. We apologize for any inconvenience this may cause.',
  },
  {
    id: 3,
    title: 'Community Guidelines Update',
    preview: 'We have updated our community guidelines to ensure a safe and respectful environment for all users. Please take a moment to review the new guidelines.',
    content: 'We have updated our community guidelines to ensure a safe and respectful environment for all users. Please take a moment to review the new guidelines in the FAQ section. The key changes include stricter policies against spam and harassment. Your cooperation is appreciated.',
  },
];

const Announcements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Announcements</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => openModal(announcement)}
          >
            <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
            <p className="text-gray-600">{announcement.preview}</p>
          </div>
        ))}
      </div>
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
