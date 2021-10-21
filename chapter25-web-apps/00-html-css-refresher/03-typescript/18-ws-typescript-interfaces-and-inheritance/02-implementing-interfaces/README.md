# 02: Interfaces and inheritance in TypeScript &mdash; Implementing interfaces
> Learning how to implement interfaces by creating a prototype blogging application

## Exercise 5.02

You are assigned the task of setting up a blogging system that will allow users to post content to the site. The main focus of the task is coding in a manner that will lead to bug-free code that is well supported and understood.

First, we start with the main object &mdash; the blog post.

1. Create a *type alias* `BlogPost`. We could have used an interface for this, but types are more suited to simple objects. A type is more of a descriptor of a unit of something, while an interface is more of a contract on how to interact with something, not what it is.

A type definition looks like:
```typescript
type BlogPost = {
  post: string,
  timestamp: number,
  user: string
}
```

2. Create an interface `AddToPost` that describes the signature of a function that will be used to add a blog post. It will receive a `BlogPost` instance and it will return an array of `BlogPost` objects.

3. Create an interface `IBlogPost` that will define how we interact with the BlogPostClass that we will subsequently create. The interface features a property `allPosts` which is an array of `BlogPost` elements, and an `addToPost` function that satisfies the `AddToPost` function interface.

4. Create a class `BlogPostClass` that implements the `IBlogPost` interface. The `allPost` property should be *statically* initialized to an empty array. The function `addToPost` should append the blogPost received as argument at the end of the existing posts, and return the existing posts array.

5. Validate that the program works as expected by creating a few posts and using `addToPost` function.