// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProfileDropdown = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   if (!user) return null;

//   return (
//     <div className="relative cursor-pointer " ref={dropdownRef}>
//       {/* Profile Button */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 focus:outline-none cursor-pointer "
//       >
//         <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
//           <img 
//             src={user.photo || '/default-avatar.png'} 
//             alt={user.name} 
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <span className="hidden md:inline text-sm font-medium text-indigo-700">
//           Welcome, {user.name.split(' ')[0]}
//         </span>
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//           <a
//             href="#"
//             onClick={() => navigate('/profile')}
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//           >
//             View Profile
//           </a>
//           <a
//             href="#"
//             onClick={() => navigate('/myblogs')}
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//           >
//             My Blogs
//           </a>
//           <a
//             href="#"
//             onClick={() => navigate('/blogs/new')}
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//           >
//             Create Blog
//           </a>
//           <div className="border-t border-gray-100 my-1"></div>
//           <button
//             onClick={() => {
//               logout();
//               navigate('/');
//             }}
//             className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileDropdown;

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiUser, 
  FiFileText, 
  FiEdit, 
  FiLogOut,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

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

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none group"
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500 group-hover:border-indigo-600 transition-colors">
          <img 
            src={user.photo || '/default-avatar.png'} 
            alt={user.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
        </div>
        <div className="hidden md:flex items-center">
          <span className="text-sm font-medium text-indigo-700 group-hover:text-indigo-800 transition-colors">
            {user.name.split(' ')[0]}
          </span>
          {isOpen ? (
            <FiChevronUp className="ml-1 text-indigo-600" />
          ) : (
            <FiChevronDown className="ml-1 text-indigo-600" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          <button
            onClick={() => handleNavigation('/profile')}
            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <FiUser className="mr-3 text-indigo-500" />
            View Profile
          </button>
          
          <button
            onClick={() => handleNavigation('/myblogs')}
            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <FiFileText className="mr-3 text-indigo-500" />
            My Blogs
          </button>
          
          <button
            onClick={() => handleNavigation('/blogs/new')}
            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <FiEdit className="mr-3 text-indigo-500" />
            Create Blog
          </button>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
