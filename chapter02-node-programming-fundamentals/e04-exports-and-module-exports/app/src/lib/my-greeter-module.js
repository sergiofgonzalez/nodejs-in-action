"use strict";

function defaultGreeting() {
  console.log(`Hello to Jason Isaacs`);
}

function personalizedGreeting(name) {
  console.log(`Hello to ${ name }`);
}

exports.sayHelloToJson = defaultGreeting;

exports.sayHello = personalizedGreeting;