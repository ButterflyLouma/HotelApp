export enum Page {
  Login = 'login',
  List = 'list',
  Detail = 'detail',
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pricePerNight: number;
  rating: number;
  address: string;
}