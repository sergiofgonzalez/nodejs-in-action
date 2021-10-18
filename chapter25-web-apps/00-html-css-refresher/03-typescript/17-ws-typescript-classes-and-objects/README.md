# TypeScript: Chapter 17 &mdash; Workshop: TypeScript Classes and Objects
> first steps into classes, interfaces and objects

## Contents
+ Classes and objects in TypeScript
+ Introduction to TypeScript interfaces

## What are classes and objects?

The following snippet illustrates how classes and objects are used in TypeScript:

```typescript
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  read() {
    console.log(`${ this.name } likes to read`);
  }
}

const obj = new Person('Jason Isaacs');
obj.read(); // -> Jason Isaacs likes to read
console.log(obj.name); // -> Jason Isaacs
```

The *constructor* is a special method that is run automatically anytime that you create an object. They're typically used to set up data for attributes or to run any setup processes our object may need.

When using classes, `this` refers to the instance of the class that is currently being executed. Through `this` you will have access to the data atributes (properties) and behavior (methods) of the instance.

## Intro to TypeScript interfaces

Interfaces will be discussed in detal in subsequent chapters, but we will introduce it here to explain how it can be used in the context of classes and objects.

An interface allows you to describe the data passed to a class when you're creating an object.

The following code illustrates how to define an interface that is then used by the class and the main program when instantiating objects:

```typescript
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
}

const mercedesDrivers = ['Lewis Hamilton', 'Valteri Bottas'];
const mercedes = new Team({ name: 'Mercedes', drivers: mercedesDrivers });
```

## You know you've mastered this chapter when...

+ You're comfortable defining classes and instantiating objects.

+ You're familiar with TypeScript interfaces, and understand that interfaces are very useful to describe the information passed to a class constructor.

+ You're aware that it is a common idiom to define 

## Exercises, code examples, and mini-projects

### [01: Building your first class](01-hello-class)
First steps into classes and objects with TypeScript.

### [02: Building interfaces](02-hello-interfaces)
First steps into interfaces in the context of classes and objects with TypeScript.

### [03: Generating and viewing HTML code in methods](03-generating-html)
Generating HTML in a class method. This is exercise is used as a starting point for subsequent exercises.

### [04: TypeScript classes and objects &mdash; Combining classes](04-combining-classes)
Using classes as arguments to other classes and interfaces.

### [e01: Creating a user model using classes, objects, and interfaces](e01-creating-a-user-model)
Illustrating the definition of classes, interfaces and objects.

## ToDo

