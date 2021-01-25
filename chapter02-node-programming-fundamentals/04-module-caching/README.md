# 04-module-caching
> Node.js module caching caveats

## Description
A main program requires three different modules: `shared-module`, `require1` and `require2`. Two of them `module1` and `module` also require the `shared-module`.

In the example, it is demonstrated that Node.js caches the required modules, so that the references of the two modules and the main program share the exact same copy of the shared module &mdash; including its internal state.
