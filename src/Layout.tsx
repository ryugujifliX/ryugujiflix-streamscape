
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow mt-16 md:mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
