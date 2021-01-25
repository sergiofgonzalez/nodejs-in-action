# 17 &mdash; Hello, Flame Graphs!
> Practicing Flame Graphs

## Intro to Flame Graphs
Flame graphs are a way of visualizing CPU time spent in functions. They can help you identify where you spend too much time doing synchronous operations.

Technically, a flame graph tool collects snapshots of the stack and performs an aggregated visualization of those stacks over time.

The easiest way to generate a flamegraph for your application is to use a prepackaged tool such as [0x](https://www.npmjs.com/package/0x).

In order to get the necessary profiling information with *0x* when running in your local you just need to run the command `0x <app>`. This will start gathering profiling information for your application until you send a `SIGINT` signal to the application. Once the signal is received, *0x* will generate a folder with the information and an HTML page to browse the information.

Alternatively, you can do `0x -o <app>` to immediately open in a browser the HTML with the flamegraph once finished.

## Understanding the Flame Graph
The last function to be called is referred to as being at the top of the stack. 

If a function is observed being at the top of the stack more time than other functions, this function maybe be blocking the event loop. If a function is observed being at the top of the stack in higher ratio it's referred to as being *hot*.

Each function (*a frame*) is represented by a block (a rectangle in the flame graph).

The X-axis is the collection of functions sorted according to its name. However, the width of a block in the flamegraph represents the amount of time a function appears in the same stack in relation to the total amount of samples.

The color of the block represents the heat, that is, the amount of time a function appears at the topo of a stack in relation to the total samples.

### Additional Parameters Found in *0x* Flame Graph

+ Optimized &mdash; highlights all optimized functions (only applies to JavaScript frames)
+ Unoptimized &mdash; highlights all unoptimized functions (only applies to JavaScript frames)
+ Merge &mdash; merges optimized and unoptimized functions
+ Unmerge &mdash; separates optimized and unoptimized functions from a merged graph
+ Tiers &mdash; frames in the graph are subdivided into categories. Each category has a button that hides or shows the particular frame-type in the flamegraph. Pressing the Tiers button will result in the categories being highlighted according to their type.
  + app &mdash; application level JavaScript function
  + deps &mdash; Functions in dependencies (functions that are in files within the `node_modules` folder)
  + core &mdash; JavaScript functions bundled with Node core.
  + inlinable &mdash; inlinable blocks are functions that are captured during profiling, which later become inlined into their parent calling function.
  + native &mdash; native JavaScript functions that are compiled into V8 (e.g. `Array.prototype.join`).
  + rx &mdash; regular expressions.
  + v8 &mdash; V8 frames pertaining to runtime operations.
  + cpp &mdash; C++ frames called by the V8 layer.
  + init &mdash; core functions that are either internal module system functions, or other initialization functions not related to the module system.

## Obtaining Flame Graphs in Production Servers
As generating a flamegraph can be quite intense on CPU and memory, it is better to generate the flamegraph in two pieces.

The first one consists of capturing the stacks:

```bash
0x --collect-only <app>
```

Once ready, you need to send the `SIGINT` signal (CTRL+C), which will create the usual profile folder.

After that, you can transfer the folder from the production server to another machine, in which you can run:

```bash
0x --visualize-only <pid>.0x
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Practicing Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apB.md#practicing-prototypes) section.
