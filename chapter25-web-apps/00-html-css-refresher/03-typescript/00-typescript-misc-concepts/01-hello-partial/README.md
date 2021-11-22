# 01: Misc concepts &mdash; Hello, `Partial<T>`!
> illustrates the use of the utility type `Partial<Type>` which constructs a type from another type in which all the properties are set to optional.

## Concept description

TypeScript provides several *utility types* to facilitate common type transformations.

The `Partial<Type>` constructs a type with all the properties of `Type` set to optional.

## Example description

In the example we defines a simple interface `ToDo` that describes a task. Then we create a function that lets you update an existing record by supplying the original record to be updates and the subset of the fields that have to be modified. This part is typed using `Partial`.

```typescript
function updateToDo(toDo: ToDo, fieldsToUpdate: Partial<ToDo>) {
  return { ...toDo, ...fieldsToUpdate };
}
```
