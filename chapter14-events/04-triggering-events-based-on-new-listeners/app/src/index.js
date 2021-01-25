"use strict";

const { EventEmitter } = require("events");

class Pulsar extends EventEmitter {
  constructor(speed, times) {
    super();
    this.speed = speed;
    this.times = times;

    this.on("newListener", eventName => {
      if (eventName === "pulse") {
        this.start();
      }
    });
  }

  start() {
    const id = setInterval(() => {
      console.log("Current number of pulse listeners registered:", this.listeners("pulse").length);
      this.emit("pulse");
      this.times--;
      if (this.times <= 0) {
        clearInterval(id);
      }
    }, this.speed);
  }

  stop() {
    if (this.listeners("pulse").length === 0) {
      throw new Error("No listeners have been added");
    }
  }
}

const pulsar = new Pulsar(500, 5);

pulsar.on("pulse", () => console.log("."));
