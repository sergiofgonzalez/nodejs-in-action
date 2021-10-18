# 03: TypeScript classes and objects &mdash; Generating and viewing HTML code in methods
> generating HTML in a class method

## Exercise 4.05

In this exercise we will create a class with a method that generates HTML code.

1. Create a class `Team` that accepts in the constructor an array of strings that represents the players in the team.

2. Create a method `generateLineup()` that returns a string corresponding to the team players, with each player wrapped in a `<div>` element with the following structure:
```html
<div>{ index-of-the-player-in-the-array } - { player-name }</div>
```

3. Create two teams and validate the output of `generateLineup()`.