import { checkAvailability, Flight, holdSeats, reserveSeats } from './flights';

let id = 1;

export interface Booking {
  id: number;
  paid: boolean;
  flight: Flight;
  numSeats: number;
}

export function createBooking(flight: Flight, numSeatsToBook: number): Booking | null {
  if (!checkAvailability(flight, numSeatsToBook)) {
    console.log(`Sorry, there are not ${ numSeatsToBook } seats available in the flight to ${ flight.destination }: ${ { ...flight } }`);
    return null;
  }

  if (!holdSeats(flight, numSeatsToBook)) {
    console.log(`Sorry, there are not ${ numSeatsToBook } seats available in the flight to ${ flight.destination }: ${ { ...flight } }`);
    return null;
  }

  return {
    id: id++,
    paid: false,
    flight: flight,
    numSeats: numSeatsToBook
  };
}

export function processPayment(amount: number): void {
  console.log(`Processing payment for $${ amount.toFixed(2) }: successful`);
}

export function completeBooking(booking: Booking): boolean {
  return reserveSeats(booking.flight, booking.numSeats);
}
