import { assert } from "chai";

import { MORSE_LETTERS, MORSE_DIGITS, MORSE_ALL, textToMorse } from "../morse.js";

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

    test("textToMorse", () => {
        const test = [
            { text: "A", morse: ".-" },
            { text: "AA", morse: ".- .-" },
            { text: "A A", morse: ".- | .-" },
            { text: "<SOS>", morse: "...---..." },
            { text: "CQ CQ DE K7MCK <SK>", morse: "-.-. --.- | -.-. --.- | -.. . | -.- --... -- -.-. -.- | ...-.-" },
            { text: "Hello, world!", morse: ".... . .-.. .-.. --- --..-- | .-- --- .-. .-.. -.. -.-.--" },
        ];
        for (const { text, morse } of test) {
            assert.equal(textToMorse(text), morse);
        }
    });
});

