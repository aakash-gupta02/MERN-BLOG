import React from "react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Articles", href: "#" },
    { name: "Popular Topics", href: "#" },
    { name: "Authors", href: "#" },
    { name: "About Us", href: "#" },
  ];

  const categories = [
    { name: "Design", href: "#" },
    { name: "Technology", href: "#" },
    { name: "Business", href: "#" },
    { name: "Productivity", href: "#" },
    { name: "Artificial Intelligence", href: "#" },
  ];

  const contactItems = [
    { icon: "fas fa-envelope", text: "hello@readify.com" },
    { icon: "fas fa-phone", text: "+1 (555) 123-4567" },
    { icon: "fas fa-map-marker-alt", text: "123 Blog Street, San Francisco, CA 94107" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and description */}
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-book-open text-indigo-400 text-2xl mr-2"></i>
              <span className="text-xl font-bold">Readify</span>
            </div>
            <p className="text-gray-400 mb-4">
              Curating the most insightful articles on design, technology and business for curious minds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-smooth">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a href={category.href} className="text-gray-400 hover:text-white transition-smooth">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              {contactItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <i className={`${item.icon} mt-1 mr-3 text-indigo-400`}></i>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2023 Readify. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-smooth text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-smooth text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-smooth text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
