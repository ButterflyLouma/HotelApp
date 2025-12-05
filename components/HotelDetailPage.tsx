import React, { useCallback } from 'react';
import { Hotel } from '../types';

interface HotelDetailPageProps {
  hotel: Hotel;
  onBackToList: () => void;
}

export const HotelDetailPage: React.FC<HotelDetailPageProps> = ({ hotel, onBackToList }) => {
  const handleBackClick = useCallback(() => {
    onBackToList();
  }, [onBackToList]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={handleBackClick}
          className="p-2 mr-3 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full transition duration-150 ease-in-out"
          aria-label="Back to hotel list"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <h2 className="text-3xl font-extrabold text-gray-900 flex-grow">{hotel.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="w-full h-auto max-h-96 object-cover object-center rounded-lg shadow-md"
          />
        </div>
        <div className="md:col-span-1 flex flex-col">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{hotel.description}</p>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <span className="text-xl font-bold text-blue-700">${hotel.pricePerNight}<span className="text-base font-normal text-gray-500">/night</span></span>
              <span className="flex items-center text-yellow-500 text-lg font-medium">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.176 0l-2.817 2.034c-.785.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {hotel.rating.toFixed(1)} / 5
              </span>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-800 mb-1">Address:</h4>
              <p className="text-gray-600 text-base">{hotel.address}</p>
            </div>
          </div>
          <button
            onClick={handleBackClick}
            className="mt-8 self-start px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out text-lg"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};