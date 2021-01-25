# 01-hello-custom-event-emitter
> creating a class that inherits from `EventEmitter`

## Description
In this example, we illustrate how to create a class that inherits from `EventEmitter` and therefore, can generate and listen to events.

In the example, we create a class `MusicPlayer` which inherits from `EventEmitter` and in its constructor registers a couple of *event listeners*. Then in the main program it emits a couple of events which are then handled.

```javascript
class MusicPlayer extends EventEmitter {
  constructor() {
    super();
    this.playing = false;

    this.on("play", track => {
      this.playing = true;
      AudioDevice.play(track);
    });

    this.on("stop", () => AudioDevice.stop());
  }
}

const musicPlayer = new MusicPlayer();

musicPlayer.emit("play", "Hello, world! by Jason Isaacs");
setTimeout(() => musicPlayer.emit("stop"), 5000);
```