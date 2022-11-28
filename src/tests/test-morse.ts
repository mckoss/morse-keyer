import { assert } from "chai";

import { MORSE_LETTERS, MORSE_DIGITS, MORSE_PUNCTUATION, MORSE_PROSIGNS, MORSE_ALL } from "../morse.js";

suite("Morse", () => {
    test("number of letters", () => {
        assert.equal(Object.keys(MORSE_LETTERS).length, 26);
    });

    test("number of digits", () => {
        assert.equal(Object.keys(MORSE_DIGITS).length, 10);
    });

    test("all unique", () => {
        const encodings = Object.values(MORSE_ALL);
        const unique = new Set(encodings);
        assert.equal(encodings.length, unique.size);
    });
});

