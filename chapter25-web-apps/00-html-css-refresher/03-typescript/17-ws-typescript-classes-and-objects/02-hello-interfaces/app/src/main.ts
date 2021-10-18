interface ITeam {
  name: string;
  drivers: string[];
}


class Team {
  name: string;
  drivers: string[];

  constructor(team: ITeam) {
    this.name = team.name;
    this.drivers = team.drivers;
  }

  generateLineup() {
    return this.drivers.join(', ');
  }
}

const mercedesDrivers = ['Lewis Hamilton', 'Valteri Bottas'];
const mercedes = new Team({ name: 'Mercedes', drivers: mercedesDrivers });
console.log(mercedes.generateLineup());
console.log(mercedes.name);

const ferrariDrivers = ['Charles Leclerc', 'Carlos Sainz Jr.'];
const ferrari = new Team({name: 'Ferrari', drivers: ferrariDrivers});
console.log(ferrari.generateLineup());
console.log(ferrari.name);
