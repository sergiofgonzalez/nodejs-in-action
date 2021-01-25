"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

const songs = [
  `Losing my religion - REM`,
  `Enjoy the Silence - Depeche Mode`,
  `Wish you were here - Pink Floyd`,
  `Under the Bridge - Red Hot Chili Peppers`
];

function playlist(songs, repeat = 1) {
  return {
    [Symbol.iterator]() {
      let copy = [];
      return {
        next() {
          if (copy.length === 0) {
            if (repeat < 1) {
              return { done: true };
            }
            copy = songs.slice();
            repeat--;
          }
          return { 
            value: copy.shift(), 
            done: false
          };
        }
      };
    }
  };
}

console.log([...playlist(["a", "b"])]);
console.log([...playlist(["a", "b"], 2)]);

console.log([...playlist(songs, 3)]);

/* Introducing the player */
console.log("=========================");
function player(sequence) {
  const g = sequence[Symbol.iterator]();
  more();

  function more() {
    const item = g.next();
    if (item.done) {
      return;
    }
    playSong(item.value, more);
  }

  function playSong(song, more) {
    console.log(`playing: "${ song }"`);
    setTimeout(more, 2000);
  }
}

const repeatOnce = playlist(songs, 2);
player(repeatOnce);


/* Introducing infinite playlist */
console.log("===================");
const infiniteLoop = playlist(songs, Infinity);
const [song1, song2, song3] = infiniteLoop;
console.log(song1);
console.log(song2);
console.log(song3);


/* Introducing shuffle */

// No function overloading in JavaScript
function playlistWithShuffle(songs, repeat = 1, shuffle = false) {
  return {
    [Symbol.iterator]() {
      let copy = [];
      return {
        next() {
          if (copy.length === 0) {
            if (repeat < 1) {
              return {
                done: true
              };
            }
            copy = songs.slice();
            repeat--;
          }
          const value = shuffle ? randomSong() : nextSong();
          return { done: false, value};
        }
      };
      function randomSong() {
        const index = Math.floor(Math.random() * copy.length);
        return copy.splice(index, 1)[0];
      }
      function nextSong() {
        return copy.shift();
      }
    }
  };
}

console.log("=============");
console.log([...playlistWithShuffle(["a", "b", "c"], 3, true)]);