"use strict";

const request = require("supertest");
const using = require("jasmine-data-provider");

const { app, routeInitialText } = require("../index");

const route = `${routeInitialText}/word-counter`;

describe("(POST) Word Counter Tests Suite ", () => {
  using(
    [
      {
        f: 3,
        c: 3,
        lettersArray: ["OIE", "IIX", "EXE"],
        resultExpected: 3,
      },
      {
        f: 1,
        c: 10,
        lettersArray: ["EIOIEIOEIO"],
        resultExpected: 4,
      },
      {
        f: 5,
        c: 5,
        lettersArray: ["EAEAE", "AIIIA", "EIOIE", "AIIIA", "EAEAE"],
        resultExpected: 8,
      },
      {
        f: 7,
        c: 2,
        lettersArray: ["OX", "IO", "EX", "II", "OX", "IE", "EX"],
        resultExpected: 3,
      },
      {
        f: 1,
        c: 1,
        lettersArray: ["E"],
        resultExpected: 0,
      },
    ],
    (data) => {
      it("should get correct result", async () => {
        try {
          const { f, c, lettersArray, resultExpected } = data;
          const {
            body: {
              data: { result },
            },
          } = await request(app)
            .post(route)
            .send({ f, c, lettersArray })
            .expect(200);

          expect(result).toBe(resultExpected);
        } catch (error) {
          console.log(error);
          expect(error).toBeFalsy();
        }
      });
    }
  );
});
