"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


async function concurrent() {
  console.time(`concurrent`);
  const p1 = new Promise(resolve => setTimeout(resolve, 5000, "fast"));
  const p2 = new Promise(resolve => setTimeout(resolve, 2000, "faster"));
  const p3 = new Promise(resolve => setTimeout(resolve, 1000, "fastest"));
  const r1 = await p1; // execution suspended until r1 is resolved
  const r2 = await p2;
  const r3 = await p3;
  console.timeEnd(`concurrent`);
  console.log(`r1=${ r1 }, r2=${ r2 }, r3=${ r3 }`);
}

async function betterConcurrent() {
  console.time(`betterConcurrent`);
  const p1 = new Promise(resolve => setTimeout(resolve, 5000, "fast"));
  const p2 = new Promise(resolve => setTimeout(resolve, 2000, "faster"));
  const p3 = new Promise(resolve => setTimeout(resolve, 1000, "fastest"));
  const [r1, r2, r3] = await Promise.all([p1, p2, p3]); // execution suspended until all resolved
  console.timeEnd(`betterConcurrent`);
  console.log(`r1=${ r1 }, r2=${ r2 }, r3=${ r3 }`);
}

async function getResultsFromFastestOne() {
  console.time(`getResultsFromFastestOne`);
  const p1 = new Promise(resolve => setTimeout(resolve, 5000, "fast"));
  const p2 = new Promise(resolve => setTimeout(resolve, 2000, "faster"));
  const p3 = new Promise(resolve => setTimeout(resolve, 1000, "fastest"));
  const results = await Promise.race([p1, p2, p3]); // execution suspended until any resolved
  console.timeEnd(`getResultsFromFastestOne`);
  console.log(`results=${ results }`);
}

async function runner() {
  await concurrent();
  console.log("======================");

  await betterConcurrent();
  console.log("======================");

  await getResultsFromFastestOne();
  console.log("======================");

}


runner();