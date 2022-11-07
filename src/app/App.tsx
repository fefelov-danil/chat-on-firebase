import React from 'react';
import 'assets/general-css/reset.css'
import 'assets/general-css/style.css'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "component/Navbar";

export const App = () => {
  return (
    <BrowserRouter>
        <Navbar/>
    </BrowserRouter>
  );
}