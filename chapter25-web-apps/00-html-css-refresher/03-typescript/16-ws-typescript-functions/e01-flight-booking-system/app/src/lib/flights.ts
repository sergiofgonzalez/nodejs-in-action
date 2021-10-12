export interface Flight {
  destination: string;
  totalSeats: number;
  availableSeats: number;
  heldSeats: number;
}

const flightOne: Flight = {
  destination: 'Madrid',
  totalSeats: 255,
  availableSeats: 255,
  heldSeats: 0
};

const flightTwo: Flight = {
  destination: 'Tenerife',
  totalSeats: 127,
  availableSeats: 127,
  heldSeats: 0
};

const flightThree: Flight = {
  destination: 'Menorca',
  totalSeats: 63,
  availableSeats: 63,
  heldSeats: 0
};


export function getFlights(): Flight[] {
  const flights: Flight[] = [ flightOne, flightTwo, flightThree ];
  return flights;
}

export function checkAvailability(flight: Flight, numSeats: number): boolean {
  return numSeats < flight.availableSeats;
}

export function holdSeats(flight: Flight, numSeats: number): boolean {
  if (checkAvailability(flight, numSeats)) {
    flight.availableSeats -= numSeats;
    flight.heldSeats += numSeats;
    return true;
  } else {
    return false;
  }
}

export function reserveSeats(flight: Flight, numSeats: number): boolean {
  flight.heldSeats -= numSeats;
  return true;
}