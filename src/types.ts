export type ScreenType = 'login' | 'home' | 'bookings' | 'menu' | 'profile';

export interface TicketDetails {
  bookingDate: Date; // State-driven Date
  timeString: string; // e.g. "10:45 AM"
  source: string; // e.g. "KALYAN JN."
  destination: string; // e.g. "KURLA JN."
  distanceKm: number; // e.g. 38
  ticketType: string; // e.g. "JOURNEY"
  utsCode: string; // e.g. "X00KEDX1D6"
}

export interface Booking {
  id: string;
  ticketType: string;
  bookingDate: Date;
  timeString: string;
  utsCode: string;
  source: string;
  destination: string;
  distanceKm: number;
}
