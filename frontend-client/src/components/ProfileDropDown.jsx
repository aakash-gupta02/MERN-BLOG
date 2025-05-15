import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative cursor-pointer " ref={dropdownRef}>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none cursor-pointer "
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
          <img 
            src={user.photo || '/default-avatar.png'} 
            alt={user.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="hidden md:inline text-sm font-medium text-indigo-700">
          Welcome, {user.name.split(' ')[0]}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a
            href="#"
            onClick={() => navigate('/profile')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            View Profile
          </a>
          <a
            href="#"
            onClick={() => navigate('/profile/edit')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Edit Profile
          </a>
          <a
            href="#"
            onClick={() => navigate('/blogs/new')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            Create Blog
          </a>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;