class Team {
  name: string;
  players: string[];

  constructor(name: string, players: string[]) {
    this.name = name;
    this.players = players;
  }

  generateLineup() {
    const playersWithOrderNumberDivs = this.players.map((player, idx) => `<div>${ idx + 1} &mdash; ${ player }</div>`);
    return playersWithOrderNumberDivs.join('');
  }
}

class Scoreboard {
  homeTeam: Team;
  awayTeam: Team;
  date: string;

  constructor(args: IScoreboard) {
    this.homeTeam = args.homeTeam;
    this.awayTeam = args.awayTeam;
    this.date = args.date;
  }

  scoreboardHtml(): string {
    return `
    <h1>${ this.date }</h1>
    <h2>${ this.homeTeam.name }</h2>
    <div>${ this.homeTeam.generateLineup() }</div>
    <h2>${ this.awayTeam.name }</h2>
    <div>${ this.awayTeam.generateLineup() }</div>
    `;
  }
}

interface IScoreboard {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
}

const spainPlayers = ['Pau Gasol', 'Rudy Fernandez', 'Ricky Rubio', 'Marc Gasol', 'Sergio Llul'];
const spainTeam = new Team('Spain', spainPlayers);

const usPlayers = ['Zach Lavine', 'Jayson Tatum', 'Kevin Durant', 'Jerami Grat', 'Bam Adebayo'];
const usTeam = new Team('USA', usPlayers);

const lastGame = new Scoreboard({
  date: 'Aug 3, 2021',
  homeTeam: spainTeam,
  awayTeam: usTeam
});

console.log(lastGame.scoreboardHtml());