# 09-file-watching-alternatives
> discussing the two implementations for file watching in Node.js: `fs.watch` and `fs.watchFile`

## Description
Node has *two* implementations for file watching:
+ `fs.watch`
+ `fs.watchFile`

Node's documentation recommends using `fs.watch` if possible, as it is considered more efficient, fast and reliable. However, there are some caveats associated to `fs.watch` because it depends on some OS specific functionality that might not work as expected under certain circumstances, or may fail when using virtualization software like Docker or in network file systems.

By contrast, `fs.watchFile` doesn't rely on that specifics, and just polls with a given frequence to see if a file has changed. This makes `fs.watchFile` consistent across platforms and ready for network file systems.

This example, lets you verify those:
1. Type `npm start`
2. Open a terminal and cd to the `watched-dir/` directory
3. Type `touch hello.txt` &mdash; you will get an output similar to this:
```
rename hello.txt
change hello.txt
Stats {
  dev: 64512,
  mode: 16893,
  nlink: 2,
  uid: 1000,
  gid: 1000,
  rdev: 0,
  blksize: 4096,
  ino: 2636150,
  size: 4096,
  blocks: 8,
 ...
  ctime: 2017-06-23T11:34:30.686Z,
  birthtime: 2017-06-23T11:34:30.686Z }
```

The first two lines are the ones reported by `fs.watch` while the output of `fs.watchFile` is completely different.

Note also that if you do now `touch hello.txt` you'll only see
```
change hello.txt
```

meaning that only `fs.watch` will be able to spot the change.

As a result:
+ Whenever implementing a file watching solution, prepare a thorough test case
+ Run the test with the `fs.watch` solution first and see if you're getting the expected events.
+ If you also need the stats for the file, take into account that `fs.watchFile` provides them for you
+ Just because `fs.watch` on your machine, it doesn't mean it works on a different one &mdas; remember that `fs.watch` implementation is platform dependent.