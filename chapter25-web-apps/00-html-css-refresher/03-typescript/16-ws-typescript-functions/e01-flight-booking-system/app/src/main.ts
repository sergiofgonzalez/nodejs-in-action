import { completeBooking, createBooking, processPayment } from './lib/bookings';
import { getFlights } from './lib/flights';

// 1. search for flights
console.log(`Searching for flights`);
const flights = getFlights();
console.log(flights);

// 2. booking for a flight to Menorca, 3 seats
console.log(`Booking for Menorca`);
const menorcaBooking = createBooking(flights.filter(flight => flight.destination === 'Menorca')[0], 3);
if (menorcaBooking) {
  console.log(menorcaBooking);
} else {
  console.error(`ERROR: Could not complete booking`);
  process.exit(0);
}


// 3. Process payment
console.log(`Processing payment: each seat $99.99`);
processPayment(menorcaBooking.numSeats * 99.99);
menorcaBooking.paid = true;

// 4. Completing booking
console.log(`Completing booking`);
if (completeBooking(menorcaBooking)) {
  console.log(`Booking to ${ menorcaBooking.flight.destination } successfully completed:\n`, menorcaBooking);
} else {
  console.error(`Could not complete booking for ${ menorcaBooking.flight.destination }`);
  process.exit(1);
}
