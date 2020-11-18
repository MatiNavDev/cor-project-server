"use strict";

const request = require("supertest");
const using = require("jasmine-data-provider");

const { app, routeInitialText } = require("../../index");
const {
  REQUIRED_PARAMS,
  ERROR_FORMAT_PARAMS,
  ERROR_ARRAY_ROWS_WITH_F,
  ERROR_ARRAY_COLUMNS_WITH_C,
} = require("../../constants/responsesMessages");

const route = `${routeInitialText}/word-counter`;

describe("Validator Middleware Word Counter Tests Suite ", () => {
  using(
    [
      {
        f: 3,
        lettersArray: ["OIE", "IIX", "EXE"],
        reason: "no c param",
      },
      {
        c: 10,
        lettersArray: ["EIOIEIOEIO"],
        reason: "no f param",
      },
      {
        f: 3,
        c: 10,
        reason: "no lettersArray param",
      },
    ],
    (data) => {
      it(`should get REQUIRED_PARAMS result, because ${data.reason}`, async () => {
        try {
          const { f, c, lettersArray } = data;
          const {
            body: { message },
          } = await request(app)
            .post(route)
            .send({ f, c, lettersArray })
            .expect(401);

          expect(message).toBe(REQUIRED_PARAMS);
        } catch (error) {
          console.log(error);
          expect(error).toBeFalsy();
        }
      });
    }
  );
});
