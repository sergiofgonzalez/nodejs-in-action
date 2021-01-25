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

    this.on("play", track => {
      this.playing = true;
      AudioDevice.play(track);
    });

    this.on("stop", () => AudioDevice.stop());

    this.once("error", err => {
      console.error("Error found:", err.message);
    });
  }
}

const musicPlayer = new MusicPlayer();


musicPlayer.emit("play", "Hello, world! by Jason Isaacs");

setTimeout(() => {
  musicPlayer.emit("error", new Error("Fabricated error"));
  console.log("This will be printed");
}, 2500);

// Node.js has a default handler for "error" evts that print the stack trace
// and *exit the program*
setTimeout(() => {
  musicPlayer.emit("error", new Error("Fabricated error"));  
  console.log("This will never be printed");
}, 5000);
