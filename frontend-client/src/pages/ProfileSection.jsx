import { useState, useEffect } from "react";
import { FiSave, FiEdit, FiCamera } from "react-icons/fi";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profilePic: "",
    social: {
      twitter: "",
      github: "",
      linkedin: "",
    },
  });
  
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const apiData = response.data;
        setProfile({
          name: apiData.name,
          email: apiData.email,
          bio: apiData.bio || "",
          profilePic: apiData.profilePic || "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png",
          social: {
            twitter: apiData.social?.twitter || "",
            github: apiData.social?.github || "",
            linkedin: apiData.social?.linkedin || "",
          }
        });
        
        setTempProfile({
          name: apiData.name,
          email: apiData.email,
          bio: apiData.bio || "",
          profilePic: apiData.profilePic || "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png",
          social: {
            twitter: apiData.social?.twitter || "",
            github: apiData.social?.github || "",
            linkedin: apiData.social?.linkedin || "",
          }
        });
        
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        console.error("Profile fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/profile",
        {
          name: tempProfile.name,
          bio: tempProfile.bio,
          profilePic: tempProfile.profilePic,
          social: tempProfile.social
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const updatedData = response.data;
      setProfile({
        name: updatedData.name,
        email: updatedData.email,
        bio: updatedData.bio || "",
        profilePic: updatedData.profilePic || "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png",
        social: {
          twitter: updatedData.social?.twitter || "",
          github: updatedData.social?.github || "",
          linkedin: updatedData.social?.linkedin || "",
        }
      });
      
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      console.error("Profile update error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 px-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold">My Profile</h2>
        {editMode ? (
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiEdit className="mr-2" /> Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={tempProfile.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="px-3 py-2">{profile.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="px-3 py-2">{profile.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={tempProfile.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              ) : (
                <p className="px-3 py-2">{profile.bio || "No bio provided"}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Profile Picture</h3>
          <div className="flex flex-col items-center">
            <img
              src={editMode ? tempProfile.profilePic : profile.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-100"
            />
            {editMode && (
              <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="profilePic"
                  value={tempProfile.profilePic}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter image URL"
                />
              </div>
            )}
            {editMode ? (
              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <FiCamera className="mr-2" /> Upload New Photo
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Change Photo
              </button>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-semibold mb-4">Social Links</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaTwitter className="text-blue-400 mr-2" />
                {editMode ? (
                  <input
                    type="text"
                    name="twitter"
                    value={tempProfile.social.twitter}
                    onChange={handleSocialChange}
                    placeholder="Twitter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="flex-1 px-3 py-2">
                    {profile.social.twitter || "Not provided"}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <FaGithub className="text-gray-700 mr-2" />
                {editMode ? (
                  <input
                    type="text"
                    name="github"
                    value={tempProfile.social.github}
                    onChange={handleSocialChange}
                    placeholder="GitHub"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="flex-1 px-3 py-2">
                    {profile.social.github || "Not provided"}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <FaLinkedin className="text-blue-600 mr-2" />
                {editMode ? (
                  <input
                    type="text"
                    name="linkedin"
                    value={tempProfile.social.linkedin}
                    onChange={handleSocialChange}
                    placeholder="LinkedIn"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="flex-1 px-3 py-2">
                    {profile.social.linkedin || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;