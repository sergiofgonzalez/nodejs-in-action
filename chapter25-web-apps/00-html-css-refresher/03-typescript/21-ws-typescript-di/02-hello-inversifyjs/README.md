# 02: Dependency Injection &mdash; Hello, InversifyJS!
> illustrates how to set up and work with InversifyJS with the most basic of examples.


## Prerequisites
Note that the `./ts.config.json` has been updated to comply with InversifyJS requirements.

Namely:

```json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "lib": ["ES2021", "DOM"],
    "moduleResolution": "node",
    "types": ["reflect-metadata"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
}
```

Also, you need to include `inversifyjs` and `reflect-metadata` in your dependencies:

```typescript
npm install --save inversify reflect-metadata
```

## Exercise 8.02

In the example, we will create a simple 'Hello, world!' application using InversifyJS. Instead of just using `console.log()` we'll create a class that will rely on a `Logger` instance to print a message in the console.

The project artifacts have been accommodated in *more or less* the recommended project structure for InversifyJS:

```
src/
├── config/
│   └── ioc.config.ts             -> InversifyJS IoC container configuration
├── constants/
│   └── types.ts                  -> Type identifiers for InversifyJS (associate symbols to interfaces)
├── interfaces/
│   └── logger.interface.ts       -> Interface definition
├── services/
│   └── logger.ts                 -> Concrete implementations
└── main.ts                       -> Main entry point (composition root)
```

1. Create the abstraction for your logger in a new file `interfaces/logger.interface.ts`. The exported interface `Logger` should expose a function `log()` which takes a message (string) and returns nothing (void).

2. Create a concrete implementation for your `Logger` interface named `ConsoleLogger` in `services/logger.ts`. It should use `console.log` to implement the `log()` function.

3. Decorate your concrete `ConsoleLogger` class with the `@injectable` annotation. This indicates InversifyJS that this class can be used as a dependency, and that can be injected into other dependencies.

4. Create a file `types.ts` in the `config/` directory. The file should create a constant literal object `TYPES` with entries that map each interface type to a `Symbol`. HINT: use `{ type }: Symbol.for('type')`.

5. Create a new file `ioc.config.ts` in the `config/` directory. This file will host the configuration of the IoC container. You should bind each and every abstract artifact to its corresponding concrete implementation. In our simple example, `TYPES.Logger` will be bound to `ConsoleLogger`. This is where everything gets wired: the `Logger` interface, the `ConsoleLogger` class, and the `TYPES.Logger` constant:

```typescript
import { Container } from 'inversify';
import { ConsoleLogger } from '../services/logger';
import { Logger } from '../interfaces/logger.interface';
import { TYPES } from '../constants/types';

export const container = new Container();
container.bind<Logger>(TYPES.Logger).to(ConsoleLogger);
```

6. Create the *composition root* (i.e., main application entrypoint) in `main.ts`. Create a `Main` class that features a constructor that receives an instance of the `Logger` interface as a parameter. Define also a `run()` method that uses the received logger to print a message on the screen.

7. Annotate the `Main` class with `@injectable()`. Then bootstrap the application doing:

```typescript
const main = container.resolve(Main);
main.run();
```

8. Type `npm start` and validate that it works.