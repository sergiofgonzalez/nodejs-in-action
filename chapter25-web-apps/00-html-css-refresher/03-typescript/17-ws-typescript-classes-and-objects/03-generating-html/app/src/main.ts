class Team {
  players: string[];

  constructor(players: string[]) {
    this.players = players;
  }

  generateLineup() {
    const playersWithOrderNumberDivs = this.players.map((player, idx) => `<div>${ idx + 1} &mdash; ${ player }</div>`);
    return playersWithOrderNumberDivs.join('');
  }
}

const spainPlayers = ['Pau Gasol', 'Rudy Fernandez', 'Ricky Rubio', 'Marc Gasol', 'Sergio Llul'];
const spainTeam = new Team(spainPlayers);
console.log(spainTeam.generateLineup());

const usPlayers = ['Zach Lavine', 'Jayson Tatum', 'Kevin Durant', 'Jerami Grat', 'Bam Adebayo'];
const usTeam = new Team(usPlayers);
console.log(usTeam.generateLineup());
