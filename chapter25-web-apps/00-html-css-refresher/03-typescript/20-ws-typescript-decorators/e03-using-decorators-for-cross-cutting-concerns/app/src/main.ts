import 'reflect-metadata';

type Constructable = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  new(...args: any[]): {}
}

/* class decorator factory */
function Authorize(permission: string) {
  return function <T extends Constructable>(constructor: T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedConstructor: any = function (...args: any[]) {
      if (Reflect.hasMetadata('permissions', wrappedConstructor)) {
        const permissions = <string[]>Reflect.getMetadata('permissions', wrappedConstructor);
        if (!permissions.includes(permission)) {
          throw new Error(`Authenticate: required '${ permission }' was not found in '${ permissions }'`);
        }
      }
      return new constructor(...args);
    };
    wrappedConstructor.prototype = constructor.prototype;
    return wrappedConstructor;
  };
}


/* method decorator */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MeasureDuration(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor.value = function (...args: any[]) {
    const startNanos = process.hrtime.bigint();
    const result = original.apply(this, args);
    const duration = process.hrtime.bigint() - startNanos;
    if (Reflect.hasMetadata('durations', target, propertyKey)) {
      const durations = <bigint[]>(Reflect.getMetadata('durations', target, propertyKey));
      durations.push(duration);
      Reflect.defineMetadata('durations', durations, target, propertyKey);
    } else {
      Reflect.defineMetadata('durations', [duration], target, propertyKey);
    }
    return result;
  };
}

/* method decorator factory */
function Audit(message: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args: any[]) {
      const result = original.apply(this, args);
      console.log(`[Audit] ${ propertyKey }(${ args.join(', ') }) called returning ${ result }:`, message);
      return result;
    };
  };
}

/* parameter decorator */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OneTwoThree(target: any, propertyName: string, parameterIndex: number) {
  if (Reflect.hasMetadata('one-two-three', target, propertyName)) {
    const parameters = <number[]>Reflect.getMetadata('one-two-three', target, propertyName);
    Reflect.defineMetadata('one-two-three', parameters.concat(parameterIndex), target, propertyName);
  } else{
    Reflect.defineMetadata('one-two-three', [parameterIndex], target, propertyName);
  }
}

/* method decorator */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor.value = function (...args: any[]) {
    if (Reflect.hasMetadata('one-two-three', target, propertyKey)) {
      const parameterIndices = <number[]>(Reflect.getMetadata('one-two-three', target, propertyKey));
      for (const index of parameterIndices) {
        const valueToValidate = args[index];
        if (typeof valueToValidate != 'number' || (valueToValidate < 1 || valueToValidate > 3)) {
          throw new Error(`Validate: value ${ valueToValidate } is not 1, 2, or 3`);
        }
      }
    }
    return original.apply(this, args);
  };
}

type Team = {
  score: number,
  name: string
}

@Authorize('canUpdateScore')
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

  @MeasureDuration
  @Audit('score updated')
  @Validate
  updateScore(@OneTwoThree byPoints: number, updateTeam1: boolean) {
    if (updateTeam1) {
      this.#team1.score += byPoints;
    } else {
      this.#team2.score += byPoints;
    }
  }
}


/*
  In a real-world scenario these definitions would have
  been taken from some sort of externalized configuration.
*/
function initializeApplicationPermissions() {
  Reflect.defineMetadata('permissions', ['canUpdateScore'], BasketballGame);
}


initializeApplicationPermissions();
const game = new BasketballGame('LA Lakers', 'Boston Celtics');

// game starts!
console.log(game.getScore());

// 3 pointer for Lakers
game.updateScore(3, true);
console.log(game.getScore());

// 2 pointer for Celtics
game.updateScore(2, false);
console.log(game.getScore());

// 2 points for Lakers
game.updateScore(2, true);
console.log(game.getScore());

// 2 points for Celtics
game.updateScore(2, false);
console.log(game.getScore());

// 4 points for Lakers (this is clearly a mistake!)
try {
  game.updateScore(4, true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err: any) {
  console.log(`Warning:`, err.message);
}
console.log(game.getScore());


console.log('updateScore() execution times (ns): ', Reflect.getMetadata('durations', game, 'updateScore'));
