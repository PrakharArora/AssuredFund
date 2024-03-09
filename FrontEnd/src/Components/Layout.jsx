import React, { useState , useEffect } from 'react';
import { Outlet , useLocation } from 'react-router-dom';
import Header from './Header';
import SideNav from './SideNav';
import MidNav from './MidNav';

const Layout = () => {
  const [midNav , setMidNav] = useState(true);
  const location = useLocation();

  const toggleMidNav = () => {
    setMidNav(false);
  };
  useEffect(() => {
    if (location.pathname === '/bookings' || location.pathname.startsWith ('/Profile/')  || location.pathname === '/CreateFundraiser') {
      setMidNav(false); 
    } else {
      setMidNav(true); 
    }
  }, [location.pathname]); 
  

  return (
    <>
      <Header />
      <div className='flex'>
        <SideNav className='sticky top-0'  onToggleMidNav={toggleMidNav} />
        <div className='flex flex-col'>
         { midNav && <MidNav />}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
