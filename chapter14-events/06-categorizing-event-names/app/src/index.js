"use strict";

const { EventEmitter } = require("events");

class MusicPlayer extends EventEmitter {
  constructor() {
    super();
    this.playing = false;
    this.on(MusicPlayer.events.play, track => this.play(track));
  }

  play(track) {
    this.playing = true;
    console.log("Playing", track);
  }
}


const e = MusicPlayer.events = {
  play: "play",
  pause: "pause",
  stop: "stop",
  ff: "ff",
  rw: "rw",
  addTrack: "addTrack"
};

const musicPlayer = new MusicPlayer();

musicPlayer.emit(e.play, "Hello world! by Jason Isaacs");
setTimeout(() => {
  musicPlayer.emit(MusicPlayer.events.play, "Rainbow road by Idris Elba");
}, 5000);
