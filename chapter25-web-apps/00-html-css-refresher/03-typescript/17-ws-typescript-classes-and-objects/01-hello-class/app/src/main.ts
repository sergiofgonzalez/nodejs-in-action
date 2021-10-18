class Team {
  name: string;
  drivers: string[];

  constructor(name: string, drivers: string[]) {
    this.name = name;
    this.drivers = drivers;
  }

  generateLineup() {
    return this.drivers.join(', ');
  }
}

const mercedesDrivers = ['Lewis Hamilton', 'Valteri Bottas'];
const mercedes = new Team('Mercedes', mercedesDrivers);
console.log(mercedes.generateLineup());
console.log(mercedes.name);

const ferrariDrivers = ['Charles Leclerc', 'Carlos Sainz Jr.'];
const ferrari = new Team('Ferrari', ferrariDrivers);
console.log(ferrari.generateLineup());
console.log(ferrari.name);
