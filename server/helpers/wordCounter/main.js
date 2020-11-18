"use strict";

const performance = require("performance-now");
const { Worker } = require("worker_threads");

/**
 * Create Workers and configure their scripts
 * @param {*} params
 * @returns {any[]} threads
 */
const createWorkers = (params) => {
  const threadCount = params.threadCount;
  const threads = [];
  let bigger, lower;
  if (params.f > params.c) {
    bigger = "f";
    lower = "c";
  } else {
    bigger = "c";
    lower = "f";
  }

  const range = Math.ceil(params[bigger] / threadCount);
  let start = 0;

  for (let i = 0; i < threadCount - 1; i++) {
    threads.push(
      new Worker(__dirname + "/worker.js", {
        workerData: {
          lettersArray: params.lettersArray,
          bigger,
          [bigger]: range + start,
          [lower]: params[lower],
          start,
        },
      })
    );
    start += range;
  }

  threads.push(
    new Worker(__dirname + "/worker.js", {
      workerData: {
        lettersArray: params.lettersArray,
        bigger,
        [bigger]: params[bigger],
        [lower]: params[lower],
        start,
      },
    })
  );

  return threads;
};

/**
 * Create Workers and start running script
 * @param {*} params
 */
const initWorkers = (params) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const t0 = performance();
    const threads = createWorkers(params);

    for (let worker of threads) {
      worker.on("error", (err) => {
        reject(err);
      });
      worker.on("exit", () => {
        threads.pop();
        if (threads.length === 0) {
          resolve({ result: count, timeMs: performance() - t0 });
        }
      });
      worker.on("message", () => {
        count++;
      });
    }
  });
};

/**
 * Count appearance of specific word in alphabet soup
 * @param {*} params
 */
const countWord = (params) => {
  return initWorkers(params);
};

module.exports = {
  countWord,
};
