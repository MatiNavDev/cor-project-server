"use strict";

const {
  handleCommonError,
  handleCommonResponse,
} = require("../helpers/responses");

const { countWord } = require("../helpers/wordCounter/main");

/**
 * Creates a new user
 * @param {*} req
 * @param {*} res
 */
const countOIEAppearance = async ({ body }, res) => {
  try {
    const result = await countWord(body);
    handleCommonResponse(res, { ...result });
  } catch (error) {
    console.log(error);
    handleCommonError(res, error);
  }
};

module.exports = {
  countOIEAppearance,
};
