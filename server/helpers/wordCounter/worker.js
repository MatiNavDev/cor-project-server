"use strict";

const {
  isMainThread,
  parentPort,
  workerData: { lettersArray, f, c, start, bigger },
} = require("worker_threads");

const getAdyacentPositions = (x, y) => [
  [x - 1, y - 1],
  [x - 1, y],
  [x - 1, y + 1],
  [x + 1, y + 1],
  [x + 1, y],
  [x + 1, y - 1],
  [x, y - 1],
  [x, y + 1],
];

/**
 * Check For Specific Char
 * @param {string} char
 * @param {string[]} lettersArray
 * @param {number} x
 * @param {number} y
 */
const checkFinallyFor = (char, lettersArray, x, y) => {
  if (lettersArray[x] && lettersArray[x][y] === char) {
    parentPort.postMessage(1);
  }
};

/**
 * Check For Adyancents char
 * @param {string} char
 * @param {string[]} lettersArray
 * @param {number} x
 * @param {number} y
 */
const checkForAdyacents = (char, lettersArray, x, y) => {
  const adyacentPositions = getAdyacentPositions(x, y);
  for (let i = 0; i < adyacentPositions.length; i++) {
    const [adyacentX, adyacentY] = adyacentPositions[i];
    if (lettersArray[adyacentX] && lettersArray[adyacentX][adyacentY]) {
      const adyacentChar = lettersArray[adyacentX][adyacentY];
      if (char === adyacentChar) {
        checkFinallyFor(
          "E",
          lettersArray,
          adyacentX + (adyacentX - x),
          adyacentY + (adyacentY - y)
        );
      }
    }
  }
};

/**
 * Count 'OIE' appearance in array. Only search in f rows and c columns
 * @param {strings[]} lettersArray
 * @param {number} f
 * @param {number} c
 * @param {number} start
 * @param {string} bigger
 */
const countOIEAppearence = (lettersArray, f, c, start, bigger) => {
  let i = 0,
    ii = 0;

  if (bigger === "f") {
    i = start;
  } else {
    ii = start;
  }

  for (i; i < f; i++) {
    const letters = lettersArray[i];
    for (ii; ii < c; ii++) {
      const char = letters[ii];
      if (char === "O") {
        checkForAdyacents("I", lettersArray, i, ii);
      }
    }

    ii = bigger === "c" ? start : 0;
  }
};

countOIEAppearence(lettersArray, f, c, start, bigger);
