import { Hotel } from '../types';
import { MOCK_HOTELS } from '../constants';

export const fetchHotels = async (): Promise<Hotel[]> => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_HOTELS;
};

export const fetchHotelById = async (id: string): Promise<Hotel | undefined> => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_HOTELS.find(hotel => hotel.id === id);
};