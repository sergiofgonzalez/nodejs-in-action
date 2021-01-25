# 06-categorizing-event-names
> a simple approach to categorize event names using an object

## Description
A simple example that illustrates how you can use an object that holds event names in order to categorize the events that an application manages.

By doing so, you can make sure that properties, rather than strings, are used.

```javascript
class MusicPlayer extends EventEmitter {
  ...
}

const e = MusicPlayer.events = {
  play: "play",
  pause: "pause",
  stop: "stop",
  ff: "ff",
  rw: "rw",
  addTrack: "addTrack"
};
```

Note a couple of interesting points:
+ we are aliasing a long name with a short one when doing `e = MusicPlayer.events`. This will let some code use `e.play` for convenience instead of `MusicPlayer.events.e`.
+ we are defining a kind of *static enumeration* on the `MusicPlayer` class.