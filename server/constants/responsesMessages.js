"use strict";

module.exports = {
  REQUIRED_PARAMS:
    "f, c and lettersArray are required, threadCount is optional",
  ERROR_FORMAT_PARAMS:
    "f, c must be integers, lettersArray must be an array of Strings, threadCount is optional and must be an integer",
  ERROR_ARRAY_ROWS_LENGTH: "lettersArray length must be equal to 'f' param",
  ERROR_ARRAY_COLUMNS_LENGTH:
    "length of elements in lettersArray must be equal to 'c' param",
};
