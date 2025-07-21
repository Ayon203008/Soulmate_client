import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Home/Footer/Footer';

const MainLayOut = () => {
    return (
        <div className='min-h-screen w-11/12 mx-auto flex flex-col'>
            <Navbar></Navbar>
            <div className='flex-grow'>

            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default MainLayOut;