import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiHome,
  FiUser,
  FiFileText,
  FiMessageSquare,
  FiCalendar,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiBarChart2,
  FiClock,
  FiBell,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data - replace with API calls
  const dashboardStats = {
    totalPosts: 24,
    totalComments: 156,
    recentActivity: [
      { id: 1, text: 'You published "React Advanced Patterns"', time: '2 hours ago' },
      { id: 2, text: 'Sarah commented on your post', time: '5 hours ago' },
      { id: 3, text: 'Your post reached 100 views', time: '1 day ago' }
    ],
    activityData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Posts',
          data: [3, 5, 2, 6, 4, 7],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)'
        },
        {
          label: 'Comments',
          data: [10, 15, 8, 20, 12, 25],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)'
        }
      ]
    }
  };

  const userBlogs = [
    { _id: '1', title: 'React Advanced Patterns', status: 'published', date: '2023-05-15' },
    { _id: '2', title: 'Tailwind CSS Tips', status: 'draft', date: '2023-05-10' },
    { _id: '3', title: 'Node.js Best Practices', status: 'published', date: '2023-04-28' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteBlog = (id) => {
    setBlogToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    console.log('Deleting blog:', blogToDelete);
    // await axios.delete(`/api/blogs/${blogToDelete}`);
    setShowDeleteConfirm(false);
    // Refresh blogs list
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Determine active menu based on route
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path.includes('profile')) return 'profile';
    if (path.includes('posts')) return 'posts';
    if (path.includes('comments')) return 'comments';
    if (path.includes('calendar')) return 'calendar';
    return 'dashboard';
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 shadow-md flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          {sidebarOpen ? (
            <h2 className="text-xl font-semibold dark:text-white">Dashboard</h2>
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-300 font-bold">D</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? (
              <span className="text-gray-500 dark:text-gray-300">←</span>
            ) : (
              <span className="text-gray-500 dark:text-gray-300">→</span>
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {/* Dashboard Overview */}
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-3 rounded-lg ${getActiveMenu() === 'dashboard' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <FiBarChart2 className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>Overview</span>}
              </Link>
            </li>

            {/* My Profile */}
            <li>
              <Link
                to="/dashboard/profile"
                className={`flex items-center p-3 rounded-lg ${getActiveMenu() === 'profile' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <FiUser className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>My Profile</span>}
              </Link>
            </li>

            {/* Blog Posts */}
            <li>
              <Link
                to="/dashboard/posts"
                className={`flex items-center p-3 rounded-lg ${getActiveMenu() === 'posts' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <FiFileText className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>Blog Posts</span>}
              </Link>
            </li>

            {/* Comments */}
            <li>
              <Link
                to="/dashboard/comments"
                className={`flex items-center p-3 rounded-lg ${getActiveMenu() === 'comments' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <FiMessageSquare className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>Comments</span>}
              </Link>
            </li>

            {/* Content Calendar */}
            <li>
              <Link
                to="/dashboard/calendar"
                className={`flex items-center p-3 rounded-lg ${getActiveMenu() === 'calendar' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <FiCalendar className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>Content Calendar</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t dark:border-gray-700 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <>
                <FiSun className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <FiMoon className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                {sidebarOpen && <span>Dark Mode</span>}
              </>
            )}
          </button>

          {/* Back to Home */}
          <Link
            to="/"
            className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FiHome className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
            {sidebarOpen && <span>Back to Home</span>}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <FiLogOut className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="text-gray-500 dark:text-gray-300">☰</span>
          </button>
          <h1 className="text-xl font-semibold dark:text-white">
            {getActiveMenu() === 'dashboard' && 'Dashboard Overview'}
            {getActiveMenu() === 'profile' && 'My Profile'}
            {getActiveMenu() === 'posts' && 'Blog Posts'}
            {getActiveMenu() === 'comments' && 'Comments'}
            {getActiveMenu() === 'calendar' && 'Content Calendar'}
          </h1>
          <div className="w-8"></div> {/* Spacer */}
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {getActiveMenu() === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold dark:text-white">Welcome back, {user?.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      Here's what's happening with your blog today
                    </p>
                  </div>
                  <div className="relative">
                    <FiBell className="text-2xl text-gray-500 dark:text-gray-400" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Total Posts</p>
                      <h3 className="text-3xl font-bold dark:text-white mt-2">
                        {dashboardStats.totalPosts}
                      </h3>
                    </div>
                    <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                      <FiFileText className="text-2xl" />
                    </div>
                  </div>
                  <p className="text-green-500 text-sm mt-3 flex items-center">
                    <span className="mr-1">↑</span>
                    <span>12% from last month</span>
                  </p>
                </div>

                {/* Total Comments */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Total Comments</p>
                      <h3 className="text-3xl font-bold dark:text-white mt-2">
                        {dashboardStats.totalComments}
                      </h3>
                    </div>
                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300">
                      <FiMessageSquare className="text-2xl" />
                    </div>
                  </div>
                  <p className="text-green-500 text-sm mt-3 flex items-center">
                    <span className="mr-1">↑</span>
                    <span>24% from last month</span>
                  </p>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Recent Activity</p>
                      <h3 className="text-3xl font-bold dark:text-white mt-2">
                        {dashboardStats.recentActivity.length}
                      </h3>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300">
                      <FiClock className="text-2xl" />
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
                    Last activity: {dashboardStats.recentActivity[0].time}
                  </p>
                </div>
              </div>

              {/* Activity Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white mb-4">Activity Overview</h3>
                <div className="h-64">
                  <Line
                    data={dashboardStats.activityData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: darkMode ? '#e5e7eb' : '#6b7280'
                          }
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                          },
                          ticks: {
                            color: darkMode ? '#9ca3af' : '#6b7280'
                          }
                        },
                        y: {
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                          },
                          ticks: {
                            color: darkMode ? '#9ca3af' : '#6b7280'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                  <h3 className="text-lg font-semibold dark:text-white mb-4">Recent Notifications</h3>
                  <div className="space-y-4">
                    {dashboardStats.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                          <FiBell className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{activity.text}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border dark:border-gray-700">
                  <h3 className="text-lg font-semibold dark:text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/dashboard/posts/new"
                      className="p-4 border rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors flex flex-col items-center justify-center"
                    >
                      <FiPlus className="text-2xl text-indigo-600 dark:text-indigo-400 mb-2" />
                      <span className="text-sm font-medium dark:text-white">New Post</span>
                    </Link>
                    <Link
                      to="/dashboard/calendar"
                      className="p-4 border rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors flex flex-col items-center justify-center"
                    >
                      <FiCalendar className="text-2xl text-indigo-600 dark:text-indigo-400 mb-2" />
                      <span className="text-sm font-medium dark:text-white">Schedule</span>
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="p-4 border rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors flex flex-col items-center justify-center"
                    >
                      <FiUser className="text-2xl text-indigo-600 dark:text-indigo-400 mb-2" />
                      <span className="text-sm font-medium dark:text-white">Profile</span>
                    </Link>
                    <Link
                      to="/dashboard/comments"
                      className="p-4 border rounded-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors flex flex-col items-center justify-center"
                    >
                      <FiMessageSquare className="text-2xl text-indigo-600 dark:text-indigo-400 mb-2" />
                      <span className="text-sm font-medium dark:text-white">Comments</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {getActiveMenu() === 'posts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold dark:text-white">Blog Posts</h1>
                <Link
                  to="/dashboard/posts/new"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                >
                  <FiPlus className="mr-2" />
                  New Post
                </Link>
              </div>

              {/* Blog Posts Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border dark:border-gray-700">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {userBlogs.map((blog) => (
                        <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {blog.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                blog.status === 'published'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}
                            >
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {new Date(blog.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link
                                to={`/dashboard/posts/${blog._id}/edit`}
                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                              >
                                <FiEdit2 />
                              </Link>
                              <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Empty State */}
              {userBlogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500 mb-4">
                    <FiFileText className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No blog posts yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Get started by creating a new blog post.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/dashboard/posts/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                    >
                      <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                      New Post
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other sections would be rendered here */}
          <Outlet />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full border dark:border-gray-700">
            <h3 className="text-lg font-medium dark:text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (Mobile) */}
      {getActiveMenu() === 'posts' && (
        <Link
          to="/dashboard/posts/new"
          className="fixed bottom-6 right-6 lg:hidden p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          <FiPlus className="text-2xl" />
        </Link>
      )}
    </div>
  );
};

export default DashboardLayout;