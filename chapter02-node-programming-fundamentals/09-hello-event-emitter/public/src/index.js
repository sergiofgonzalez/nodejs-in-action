"use strict";

/* Create a new EventEmitter that will allow us to generate custom events */
const EventEmitter = require("events").EventEmitter;
const channel = new EventEmitter();

/* Registering a listener */
channel.on("join", () => console.log("Welcome! You've just joined the channel!"));

/* Registering a listener with `addListener` which is a synonym for `on` */
channel.addListener("join", () => console.log("Another observer of the same event"));

/* Emitting events */
channel.emit("join");