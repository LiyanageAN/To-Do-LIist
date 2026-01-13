import React, { useState } from 'react';
import { User, Mail, Edit2, Save } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Task management enthusiast'
    };
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('userProfile', JSON.stringify(editedProfile));
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User size={24} className="text-indigo-500 mr-2" />
          <h2 className="text-xl font-bold">Profile</h2>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          {isEditing ? (
            <>
              <Save size={18} />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit2 size={18} />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-400" />
                <p className="text-lg">{profile.email}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
              />
            ) : (
              <p className="text-lg">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;