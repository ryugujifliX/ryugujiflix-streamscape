
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, User, Heart, Home, PlayCircle, LogOut } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Desktop Navbar */}
      <div className="ryugu-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-display font-bold text-white">
            <span className="text-ryugu-red">RYUGUJI</span>FLIX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'text-ryugu-red' : 'text-white/80 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchForm 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleSearch={handleSearch} 
          />
          <UserActions />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white/80 hover:text-ryugu-red transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </header>
  );
};

// Navigation links data
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/trending', label: 'Trending' },
  { path: '/recent', label: 'Recent' },
  { path: '/watchlist', label: 'Watchlist' }
];

// Search form component
const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }) => (
  <form onSubmit={handleSearch} className="relative">
    <div className="flex items-center bg-ryugu-dark/80 border border-ryugu-red/30 rounded-full overflow-hidden px-3">
      <input
        type="text"
        placeholder="Search anime..."
        className="bg-transparent text-white py-2 pl-1 pr-8 focus:outline-none w-40 lg:w-56"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="absolute right-3 text-white/70 hover:text-ryugu-red">
        <Search size={18} />
      </button>
    </div>
  </form>
);

// User actions component
const UserActions = () => (
  <>
    <button className="text-white/80 hover:text-ryugu-red transition-colors">
      <Bell size={20} />
    </button>
    <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-ryugu-red/30 hover:border-ryugu-red transition-all">
      <User size={18} className="text-white/80" />
    </Link>
  </>
);

// Mobile menu component
const MobileMenu = ({ isOpen, searchQuery, setSearchQuery, handleSearch }) => {
  const mobileLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/trending', label: 'Trending', icon: PlayCircle },
    { path: '/recent', label: 'Recent', icon: PlayCircle },
    { path: '/watchlist', label: 'Watchlist', icon: Heart },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div
      className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
    >
      <div className="flex flex-col h-full pt-20 px-6">
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <div className="flex items-center bg-ryugu-dark/80 border border-ryugu-red/30 rounded-full overflow-hidden px-3">
            <input
              type="text"
              placeholder="Search anime..."
              className="bg-transparent text-white py-3 pl-1 pr-10 focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 text-white/70 hover:text-ryugu-red">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Mobile Menu Items */}
        <div className="flex flex-col space-y-4">
          {mobileLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ryugu-red/10"
            >
              <link.icon size={20} className="text-ryugu-red" />
              <span className="text-lg">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Footer Actions */}
        <div className="mt-auto mb-10 border-t border-white/10 pt-4">
          <Link to="/login" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-ryugu-red/10">
            <LogOut size={20} className="text-ryugu-red" />
            <span className="text-lg">Sign In / Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
