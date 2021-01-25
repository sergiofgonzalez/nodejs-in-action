"use strict";

const { EventEmitter } = require("events");

class AudioDevice {
  static play(track) {
    console.log("playing:", track);
  }

  static stop() {
    console.log("stop!");
  }
}

class MusicPlayer extends EventEmitter {
  constructor() {
    super();
    this.playing = false;
    this.playingStartTs;

    this.on("play", track => {
      this.playing = true;
      AudioDevice.play(track);
    });

    this.on("stop", () => AudioDevice.stop());

    this.once("play", () => this.playingStartTs = new Date());
  }
}

const musicPlayer = new MusicPlayer();


musicPlayer.emit("play", "Hello, world! by Jason Isaacs");
console.log("Playing from", musicPlayer.playingStartTs);
setTimeout(() => {
  musicPlayer.emit("stop");
  musicPlayer.emit("play", "Hanging around by Idris Elba");
  console.log("Playing from", musicPlayer.playingStartTs); // it must not be updated, as the listener was using .once()  
}, 5000);

