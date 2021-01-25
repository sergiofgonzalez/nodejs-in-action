#!/usr/bin/env node

"use strict";

process.stdin.pipe(process.stdout);
const start = Date.now();
process.on("exit", () => {
  const timeTaken = Date.now() - start;
  console.error(`${ timeTaken / 1000} second(s)`);
});