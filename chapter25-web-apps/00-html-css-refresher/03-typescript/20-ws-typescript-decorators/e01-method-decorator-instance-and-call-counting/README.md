# 12: Decorators &mdash; Method Decorators: Instance and call counting
> wrapping class decorators and wrapping method decorators in action

## Activity 7.01

As a developer of a backend class, you are tasked with creating a solution that will enable auditing on the usage of classes:
+ tracking how many instances of the class are created
+ tracking how many times instance methods are invoked
+ tracking how many times property getters and setters are used

Being a cross-cutting concern, you wouldn't want to change the class code to include such logic, so class and method decorators seem like a good solution to keep the class focused and yet be able to include the auditing logic.

1. Create a class `Person` with public properties `firstName`, `lastName`, and `birthday`.

2. Add a constructor that initializes the properties via the constructor parameters.

3. Add a private field `#title` and expose it via a getter and a setter property called `title`.

4. Add a method `getFullName()` that returns the full name of a person.

5. Add a method `getAge()` that returns the current age of the person.

6. Create a global object called `count`. HINT: consider using a `Map<string,number>`.

7. Create a constructor wrapping decorator factory called `CountClass` that takes a string parameter called `counterName`. The parameter name will be used as a key in the `count` object. The count should be incremented each time a new instance of the class is created.

8. Create a method wrapping decorator factory called `CountMethod` that will take a string parameter called `counterName`. Inside the decorator function check for the `value`, `get`, and `set` properties to cover the cases where the decorator is applied to an instance method, a getter or a setter. The count should be incremented each time a method, getter or setter is invoked.

9. Write some code to validate that it works as expected.

### NOTES

In my first try at implementing the exercise I tried to include the counter object as a static property of the class. However, I could validate that the static properties and methods did not get copied when substituting the prototype.

```typescript
function CountClass(counterName: string) {
  return function <T extends Constructable>(constructor: T) {
    ...
    wrappedConstructor.prototype = constructor.prototype;
    return wrappedConstructor;
  };
}
```

Note that being a cross-cutting concern, it makes more sense to have the counter separate, but it is interesting that decorators are challenging to work when static properties and methods are used.

Also, I could see that there is no plans to work further on decorators until the final JavaScript decorators specification is done: https://github.com/microsoft/TypeScript/issues/40805.