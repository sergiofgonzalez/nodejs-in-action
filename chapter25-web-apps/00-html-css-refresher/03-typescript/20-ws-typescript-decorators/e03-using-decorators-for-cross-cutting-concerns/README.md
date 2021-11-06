# e03: Decorators &mdash; Using decorators to apply cross-cutting concerns
> summary exercise illustrating the use of decorators for classes, methods and parameters, along with metadata and reflection in a more contrived example.

## Activity 7.02

In this activity, you are tasked with adding all the necessary cross-cutting concerns, such as authentication, performance metrics, auditing, and validation to a class that models a basketball game.

The starting point for the program is:
+ a type `Team` that models what a team looks like in the game (with a `score` and `name`).
+ a `BacketBallGame` class that models the operations and state that let us keep track of the score and display it:

```typescript
// Starting point
type Team = {
  score: number,
  name: string
}

class BasketballGame {
  #team1: Team;
  #team2: Team;

  constructor(teamName1: string, teamName2: string) {
    this.#team1 = { score: 0, name: teamName1 };
    this.#team2 = { score: 0, name: teamName2 };
  }

  getScore() {
    return `${ this.#team1.score }:${ this.#team2.score }`;
  }

  updateScore(byPoints: number, updateTeam1: boolean) {
    if (updateTeam1) {
      this.#team1.score += byPoints;
    } else {
      this.#team2.score += byPoints;
    }
  }
}
```

Then to apply the cross-cutting concerns without making intrusive changes in the code you should:

1. Create a class decorator called `@Authorize` that will take a `permission` parameter and return a class decorator with constructor wrapping. The class decorator should load the permissions metadata property (array of strings), then check if the passed parameter is an element of the array, the class decorator should throw an error, and if it's present, it should continue with the class creation.

2. Define a metadata property of the `BasketballGame` class called `permissions` with the value `['canUpdateScore']`.

3. Create a method decorator `MeasureDuration` that will use method wrapping to start a timer before the method body is executed and then calculates the duration once it's done. The duration should be pushed to a metadata property called `durations` and bound to the method.

4. Apply the `@MeasureDuration` decorator on the `updateScore()` method.

5. Create a method decorator factory `@Audit` that will take a message parameter and return a method decorator. The method decorator should use method wrapping to get the arguments and return the value of the original method. After the successful execution of the original method it should display something like: `[Audit] {methodName}(arg1, arg2, ..., argN) called returning {returnedValue}: {message}`.

6. Apply the `@Audit('score updated')` decorator to the `updateScore` method.

7. Create a parameter decorator called `OneTwoThree` that will add the decorated parameter index in the `'one-two-three'` metadata property.

8. Create a method decorator `Validate` that will use method wrapping to load all values for the `'one-two-three'` metadata property, and will check the value for all the marked parameters. If the value is not 1, 2, or 3 it should raise an exception.

9. Apply the `@OneTwoThree` decorator to the `byPoints` parameter of `updateScore`. Apply the `@Validate` decorator to the `updateScore` method.

10. Confirm that the application works as expected.