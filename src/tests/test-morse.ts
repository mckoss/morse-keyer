import { assert } from "chai";

import { MORSE_LETTERS } from "../morse.js";

suite("Morse", () => {
    test("number of letters", () => {
        assert.equal(Object.keys(MORSE_LETTERS).length, 26);
    });
});

