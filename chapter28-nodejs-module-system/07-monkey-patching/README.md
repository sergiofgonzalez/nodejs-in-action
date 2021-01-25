# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 07 &mdash; Monkey Patching
> **monkey patching** is the technique used to modify objects at runtime to change or extend their behavior or apply temporary fixes.

#### Description
In the example, an existing `logger` module is patched using a `patcher` module that extends its functionality and does not *exports* anything &mdash; it just modifies the global exported scope with respect to `logger`.

In the main program, the patch is applied before using the `logger` module and it is confirmed that the extended functionality is available.
