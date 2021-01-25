'use strict';

const levenshtein = require('fast-levenshtein');
const HOW_OBVIOUS_THE_FLAME_GRAPH_SHOULD_BE_ON_SCALE_1_TO_100 = 50;

const someFakeModule = (() => {
  return {
    calculateStringDistance(a, b) {
      return levenshtein.get(a, b, { useCollator: true });
    }
  };
})();

async function doSomeUnitOfWork() {
  const text = 'asynchronous flow will make our stacktrace more realistic'.repeat(HOW_OBVIOUS_THE_FLAME_GRAPH_SHOULD_BE_ON_SCALE_1_TO_100);
  const randomText = Math.random().toString(32).repeat(HOW_OBVIOUS_THE_FLAME_GRAPH_SHOULD_BE_ON_SCALE_1_TO_100);
  return someFakeModule.calculateStringDistance(text, randomText);
}


async function processWork() {
  function loops(fn) {
    return fn().then(() => setTimeout(loops, 20, fn));
  }

  loops(doSomeUnitOfWork);
}

console.log(`Processing... [Press CTRL+C] to stop`);
processWork();