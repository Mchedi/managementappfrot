import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


import {AllSub,MyWorkers,EditProfile,HomeLoggedUser,  ProductList,Addproduct, Products2,Contact2, About2,Contact3, Sub ,Home2,Mysoc,AllSoc,Allusers, Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound,Soc,Home3,Products3, About3 } from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home2 />} />


        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product3" element={<Products3 />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/About2" element={<About2 />} />
        <Route path="/Addproduct" element={<Addproduct />} />



        
        
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Contact3" element={<Contact3 />} />

        <Route path="/Contact2" element={<Contact2 />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/createsociete" element={<Soc/>} />
        <Route path="/Mysoc" element={<Mysoc />} />
        <Route path="/Home3" element={<Home3 />} />
        
        <Route path="/Products2" element={<Products2 />} />

        <Route path="/Allusers" element={<Allusers />} />
        <Route path="/AllSoc" element={<AllSoc />} />
        <Route path="/Sub" element={<Sub />} />
        <Route path="/About3" element={<About3   />} />

        
        <Route path="/ProductList" element={<ProductList />} />

        
        
      </Routes>
    </Provider>
  </BrowserRouter>
);