"use strict";

const { handleCommonError } = require("../helpers/responses");
const {
  REQUIRED_PARAMS,
  ERROR_FORMAT_PARAMS,
  ERROR_ARRAY_COLUMNS_LENGTH,
  ERROR_ARRAY_ROWS_LENGTH,
} = require("../constants/responsesMessages");

/**
 * Validate Bearer Token
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function validatorMiddleware(
  { body: { f, c, lettersArray, threadCount } },
  res,
  next
) {
  try {
    if (!f || !c || !lettersArray)
      return handleCommonError(res, { message: REQUIRED_PARAMS, status: 401 });

    f = +f;
    c = +c;
    threadCount = +threadCount;

    if (
      !Number.isInteger(+f) ||
      !Number.isInteger(+c) ||
      !Array.isArray(lettersArray) ||
      (threadCount && !Number.isInteger(threadCount))
    )
      return handleCommonError(res, {
        message: ERROR_FORMAT_PARAMS,
        status: 401,
      });

    if (lettersArray.length !== f)
      return handleCommonError(res, {
        message: ERROR_ARRAY_ROWS_LENGTH,
        status: 401,
      });

    if (lettersArray.some((LettersRow) => LettersRow.length !== c))
      return handleCommonError(res, {
        message: ERROR_ARRAY_COLUMNS_LENGTH,
        status: 401,
      });

    return next();
  } catch (error) {
    handleCommonError(res, error);
  }
}

module.exports = {
  validatorMiddleware,
};
