import React, { useState, useEffect, useCallback } from 'react';
import { AuthPage } from './components/AuthPage';
import { HotelListPage } from './components/HotelListPage';
import { HotelDetailPage } from './components/HotelDetailPage';
import { Page, Hotel } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Simulate persistent login status
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      setCurrentPage(Page.List);
    }
  }, []);

  const handleLogin = useCallback((success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      setCurrentPage(Page.List);
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setCurrentPage(Page.Login);
    setSelectedHotel(null); // Clear selected hotel on logout
  }, []);

  const handleSelectHotel = useCallback((hotel: Hotel) => {
    setSelectedHotel(hotel);
    setCurrentPage(Page.Detail);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedHotel(null);
    setCurrentPage(Page.List);
  }, []);

  let content;
  switch (currentPage) {
    case Page.Login:
      content = <AuthPage onLogin={handleLogin} />;
      break;
    case Page.List:
      content = (
        <HotelListPage onSelectHotel={handleSelectHotel} onLogout={handleLogout} />
      );
      break;
    case Page.Detail:
      if (selectedHotel) {
        content = (
          <HotelDetailPage hotel={selectedHotel} onBackToList={handleBackToList} />
        );
      } else {
        // If no hotel is selected but we are on detail page, go back to list
        setCurrentPage(Page.List);
        content = null;
      }
      break;
    default:
      content = <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 md:p-8">
        {content}
      </div>
    </div>
  );
}

export default App;