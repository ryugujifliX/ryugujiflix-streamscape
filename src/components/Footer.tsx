
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Youtube, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black py-8 mt-auto">
      <div className="ryugu-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold text-white">
                <span className="text-ryugu-red">RYUGUJI</span>FLIX
              </span>
            </Link>
            <p className="text-sm text-white/70">
              The ultimate anime streaming platform with premium content and outstanding user experience.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-ryugu-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-ryugu-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-ryugu-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-ryugu-red transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-ryugu-red transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/trending" className="text-white/70 hover:text-ryugu-red transition-colors">Trending</Link>
              </li>
              <li>
                <Link to="/recent" className="text-white/70 hover:text-ryugu-red transition-colors">Recently Added</Link>
              </li>
              <li>
                <Link to="/top-rated" className="text-white/70 hover:text-ryugu-red transition-colors">Top Rated</Link>
              </li>
              <li>
                <Link to="/movies" className="text-white/70 hover:text-ryugu-red transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/series" className="text-white/70 hover:text-ryugu-red transition-colors">TV Series</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Genres</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/genre/action" className="text-white/70 hover:text-ryugu-red transition-colors">Action</Link>
              </li>
              <li>
                <Link to="/genre/adventure" className="text-white/70 hover:text-ryugu-red transition-colors">Adventure</Link>
              </li>
              <li>
                <Link to="/genre/comedy" className="text-white/70 hover:text-ryugu-red transition-colors">Comedy</Link>
              </li>
              <li>
                <Link to="/genre/drama" className="text-white/70 hover:text-ryugu-red transition-colors">Drama</Link>
              </li>
              <li>
                <Link to="/genre/fantasy" className="text-white/70 hover:text-ryugu-red transition-colors">Fantasy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-ryugu-red transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-ryugu-red transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-ryugu-red transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 hover:text-ryugu-red transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} RyugujiFlixStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
