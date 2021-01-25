# e08-hello-file-locations
> introducing `__dirname` and `__filename` globals and the `path.join` method.

## Description
The example illustrates the basics of accessing files and introduces the `__dirname` and `__filename` globals.

First the variables:
+ `__dirname` &mdash; the directory of the current script being run
+ `__filename` &mdash; the absolute path of the current script being run

Note that those globals depend on the *script being run*, meaning that when executing a module, both `__dirname` and `__filename` will be different than when executing the *main* script.

In particular, `__dirname` is extremely useful when you want to load a file from a script, as you'll typically do:
```javascript
const data = await readFileAsync(path.join(__dirname, "./data/input.csv"));
```

to prevent hardcoding the path while reading the file.

