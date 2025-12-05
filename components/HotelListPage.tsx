import React, { useState, useEffect, useCallback } from 'react';
import { Hotel } from '../types';
import { fetchHotels } from '../services/hotelService';

interface HotelListPageProps {
  onSelectHotel: (hotel: Hotel) => void;
  onLogout: () => void;
}

export const HotelListPage: React.FC<HotelListPageProps> = ({ onSelectHotel, onLogout }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHotels = async () => {
      try {
        setLoading(true);
        const data = await fetchHotels();
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels. Please try again later.');
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };
    getHotels();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleHotelClick = useCallback((hotel: Hotel) => {
    onSelectHotel(hotel);
  }, [onSelectHotel]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-600">Loading hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900">Available Hotels</h2>
        <button
          onClick={onLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-150 ease-in-out text-sm md:text-base"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
            onClick={() => handleHotelClick(hotel)}
          >
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.name}</h3>
              <p className="text-sm text-gray-600 mb-3 flex-grow">{hotel.description.substring(0, 100)}...</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="text-lg font-bold text-blue-700">${hotel.pricePerNight}<span className="text-sm font-normal text-gray-500">/night</span></span>
                <span className="flex items-center text-yellow-500 text-sm font-medium">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.176 0l-2.817 2.034c-.785.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {hotel.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};