"use strict";

const fs = require("fs");

const tasks = [];
const wordCounts = {};
const filesDir = `${__dirname}/rsrc`;
let completedTasksCount = 0;

function checkIfAllComplete() {
  completedTasksCount++;
  if (completedTasksCount === tasks.length) {
    for (let key in wordCounts) {
      console.log(`${key}: ${wordCounts[key]}`);
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
  const words = text
                  .toString()
                  .toLowerCase()
                  .split(/\W+/)
                  .sort();
  words
    .filter(word => word)  // i guess this is to filter out empty words
    .forEach(word => addWordCount(word));
}

fs.readdir(filesDir, (err, files) => {
  if (err) {
    console.log(`Error getting contents from directory ${filesDir}: ${err}`);
    throw err;
  }

  files.forEach(file => {
    const task = (file => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) {
            console.log(`Error reading file ${file}: ${err}`);
            throw err;
          }
          countWordsInText(text);
          checkIfAllComplete();
        });
      };
    })(`${filesDir}/${file}`);
    tasks.push(task);
  });

  tasks.forEach(task => task());
});