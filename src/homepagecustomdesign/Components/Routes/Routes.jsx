import React from 'react';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router";
import Root from '../Root/Root';
import Error from '../Pages/Error/Error';
import Main from '../Pages/Main/Main';
import Abaoutus from '../Pages/About/About';
import About from '../Pages/About/About';
import Contactus from '../Pages/Contactus/Contactus';
import TermsConditions from '../Pages/Footerpages/Terms & Conditions/Terms & Conditions';
import Antispam from '../Pages/Footerpages/Antispam/Antispam.jsx';
import PrivacyPolicy from '../Pages/Footerpages/Privacy/Privacy.jsx';
import FooterLegal from '../Pages/Footerpages/Legal/Legal.jsx';
import Cookie from '../Pages/Footerpages/Cookie/Cookie.jsx';


export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<Error></Error>,
    children:[
      {
        index:true,
        
        Component:Main,

      },
      {
        path:'/about',
        Component:About
      },
      {
        path:"Contactus",
      Component:Contactus
      },
      {
        path:"TermsConditions",
        Component:TermsConditions
      },
      {
        path:"/Antispam",
        Component:Antispam
      },
      {
        path:"/PrivacyPolicy",
        Component:PrivacyPolicy
      },
      {
        path:"/FooterLegal",
        Component:FooterLegal
      },
      {
        path:"/Cookie",
        Component:Cookie
      }
      
    ]
  },
]);