'use strict';

const levenshtein = require('fast-levenshtein');
const express = require('express');

const HOW_OBVIOUS_THE_FLAME_GRAPH_SHOULD_BE_ON_SCALE_1_TO_100 = 50;

const someFakeModule = (() => {
  return {
    calculateStringDistance(a, b) {
      return levenshtein.get(a, b, { useCollator: true });
    }
  };
})();

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>Take a look at the network tab in devtools</h2>
    <script>
      function loops(fn) {
        return fn().then(() => setTimeout(loops, 20, fn));
      }

      loops(() => fetch('api/tick'));
    </script>`);
});

app.get('/api/tick', (req, res) => {
  Promise.resolve('asynchronous flow will make our stacktrace more realistic'.repeat(HOW_OBVIOUS_THE_FLAME_GRAPH_SHOULD_BE_ON_SCALE_1_TO_100))
    .then(text => {
      const randomText = Math.random().toString(32).repeat(HOW_OBVIOUS_THE_FLAME_GRAPH_SHOULD_BE_ON_SCALE_1_TO_100);
      return someFakeModule.calculateStringDistance(text, randomText);
    })
    .then(result => res.end(`result: ${result}`));
});

app.get('/api/end', () => process.exit());

app.listen(8080, () => {
  console.log(`Navigate to http://localhost:8080`);
});