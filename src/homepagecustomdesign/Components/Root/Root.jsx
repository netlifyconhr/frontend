import React from 'react';
import Navbar from '../Pages/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Footer/Footer';
import Main from '../Pages/Main/Main';
import ThemeToggle from '../Pages/ThemeToggle/ThemeToggle';
import FeatureGrid from '../Pages/Main/Main2/Main2';
import TestimonialSection from '../Pages/Main/Main3/Main3';
import ContactSection from '../Pages/Contactus/Contactus';
import ScrollToTop from '../Pages/ScrollToTop/ScrollToTop';
import ScrollDownArrow from '../Pages/ScrollToTop/ScrollToTop';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
         <Outlet></Outlet>
            <Footer></Footer>
            
            
        </div>
    );
};

export default Root;