"use strict";

const request = require("supertest");
const using = require("jasmine-data-provider");

const { app, routeInitialText } = require("../../index");
const {
  ERROR_ARRAY_COLUMNS_LENGTH,
} = require("../../constants/responsesMessages");

const route = `${routeInitialText}/word-counter`;

describe("Validator Middleware Word Counter Tests Suite ", () => {
  using(
    [
      {
        f: 3,
        c: 2,
        lettersArray: ["OIE", "IIX", "EXE"],
        reason: "f not match with rows length",
      },
      {
        f: 1,
        c: 1,
        lettersArray: ["EIOIEIOEIO"],
        reason: "f not match with rows length",
      },
    ],
    (data) => {
      it(`should get ERROR_ARRAY_COLUMNS_LENGTH result, because ${data.reason}`, async () => {
        try {
          const { f, c, lettersArray } = data;
          const {
            body: { message },
          } = await request(app)
            .post(route)
            .send({ f, c, lettersArray })
            .expect(401);

          expect(message).toBe(ERROR_ARRAY_COLUMNS_LENGTH);
        } catch (error) {
          console.log(error);
          expect(error).toBeFalsy();
        }
      });
    }
  );
});
