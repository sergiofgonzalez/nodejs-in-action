import { getFlights, Flight, checkAvailability, holdSeats, reserveSeats } from '../src/lib/flights';

describe('flights tests', () => {


  test('get destinations', () => {
    const destinations = getFlights();
    expect(destinations).toBeTruthy();
    expect(destinations.length).toBeGreaterThan(0);
  });


  test('checking availability', () => {
    const flight: Flight = {
      destination: 'the destination',
      availableSeats: 1,
      heldSeats: 0,
      totalSeats: 1
    };
    expect(checkAvailability(flight, 1)).toBeTruthy();
    expect(checkAvailability(flight, 2)).toBeFalsy();
  });

  test('hold seats', () => {
    const flight: Flight = {
      destination: 'the destination',
      availableSeats: 1,
      heldSeats: 0,
      totalSeats: 1
    };
    expect(holdSeats(flight, 2)).toBeFalsy();
    expect(holdSeats(flight, 1)).toBeTruthy();
    expect(flight.availableSeats).toBe(0);
    expect(flight.heldSeats).toBe(1);
  });

  test('reserve seats', () => {
    const flight: Flight = {
      destination: 'the destination',
      availableSeats: 0,
      heldSeats: 1,
      totalSeats: 1
    };

    expect(reserveSeats(flight, 1)).toBeTruthy();
    expect(flight.heldSeats).toBe(0);
    expect(flight.availableSeats).toBe(0);
  });
});