import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ConfirmedBooking from './components/ConfirmedBooking';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              fontSize: '0.95rem',
              fontWeight: 500,
            },
          }}
        />
        <div className="app-frame">
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/confirmed" element={<ConfirmedBooking />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </>
    </CartProvider>
  );
}

export default App;
