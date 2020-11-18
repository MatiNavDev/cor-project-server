"use strict";

const request = require("supertest");
const using = require("jasmine-data-provider");

const { app, routeInitialText } = require("../../index");
const { ERROR_FORMAT_PARAMS } = require("../../constants/responsesMessages");

const route = `${routeInitialText}/word-counter`;

describe("Validator Middleware Word Counter Tests Suite ", () => {
  using(
    [
      {
        f: 3,
        c: [3, 3],
        lettersArray: ["OIE", "IIX", "EXE"],
        reason: "c has wrong format",
      },
      {
        f: [1, 1],
        c: 10,
        lettersArray: ["EIOIEIOEIO"],
        reason: "f has wrong format",
      },
      {
        f: 10,
        c: 10,
        lettersArray: "wrong",
        reason: "lettersArray has wrong format",
      },
    ],
    (data) => {
      it(`should get ERROR_FORMAT_PARAMS result, because ${data.reason}`, async () => {
        try {
          const { f, c, lettersArray } = data;
          const {
            body: { message },
          } = await request(app)
            .post(route)
            .send({ f, c, lettersArray })
            .expect(401);

          expect(message).toBe(ERROR_FORMAT_PARAMS);
        } catch (error) {
          console.log(error);
          expect(error).toBeFalsy();
        }
      });
    }
  );
});
