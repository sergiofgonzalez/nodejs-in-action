# 04: TypeScript classes and objects &mdash; Combining classes
> using classes as arguments to other classes and interfaces

## Exercise 4.06

This exercise uses [03: Generating and viewing HTML code in methods](03-generating-html) as a starting point. In this exercises we will be creating a `Scoreboard` class that will accept other classes as arguments.

1. Create an interface `IScoreboard` that will model the data attributes of the `Scoreboard` class:

 ```typescript
 interface IScoreboard {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
}
 ```

2. Create the `Scoreboard` class, that features three data attributes `homeTeam`, `awayTeam` and `date`. The constructor will accept an object of type `IScoreboard`.

3. Create a method `scoreboardHtml()` in the `Scoreboard` class that returns the following HTML string:

```HTML
<h1>{ date }</h1>
<h2>${ name }</h2>
<div>${ generateLineup() }</div>
<h2>${ awayTeam.name }</h2>
<div>${ generateLineup() }</div>
```

4. Update the `Team` class so that it features a `name` data attribute that is initialized in the constructor.