# 02: Express &mdash; Hello, *Express Router* in TypeScript!!
> a simple *Express server* using the *Router* object to split endpoint declaration across multiple files.

In the example, you will find a `routes/` folder that contain two separate files with the endpoint declaration:
+ `index.ts` is used to declare the root endpoints.
+ `login.ts` is used to declare the `/login` endpoints.

The *Express* server is established and configured in the `main.ts` file.