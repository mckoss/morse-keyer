import { assert } from "chai";
import { MORSE_LETTERS, MORSE_DIGITS, MORSE_ALL, textToMorse, morseToTiming, morseToSvg, htmlFromMorse, symbolCategory } from "../morse.js";
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
    test("morseToTiming", () => {
        const test = [
            { morse: "", timing: [] },
            { morse: " ", timing: [] },
            { morse: "ignored stuff", timing: [] },
            { morse: '.', timing: [0, 1] },
            { morse: '-', timing: [0, 3] },
            { morse: ".-", timing: [0, 1, 2, 5] },
            { morse: "..-.", timing: [0, 1, 2, 3, 4, 7, 8, 9] },
            { morse: "-.-. --.- | -.-. --.-",
                timing: [0, 3, 4, 5, 6, 9, 10, 11, 14, 17, 18, 21, 22, 23, 24, 27,
                    34, 37, 38, 39, 40, 43, 44, 45, 48, 51, 52, 55, 56, 57, 58, 61] },
        ];
        for (const { morse, timing } of test) {
            assert.deepEqual(morseToTiming(morse), timing);
        }
    });
    test("morseToSvg", () => {
        const test = [
            { morse: "", svg: "" },
            { morse: ".",
                svg: '<svg class="morse" viewBox="0 0 40 50"><g>' +
                    '\n  <line x1="20" y1="25" x2="20" y2="25" />' +
                    '\n</g></svg>' },
        ];
        for (const { morse, svg } of test) {
            assert.equal(morseToSvg(morse), svg);
        }
    });
    test("htmlFromMorse", () => {
        assert.equal(htmlFromMorse('.-'), '&sdot;&minus;');
    });
    test("symbolCategory", () => {
        const tests = [
            { symbol: 'a', category: 'letter' },
            { symbol: 'A', category: 'letter' },
            { symbol: '1', category: 'digit' },
            { symbol: ' ', category: 'NA' },
            { symbol: '!', category: 'symbol' },
        ];
        for (const { symbol, category } of tests) {
            assert.equal(symbolCategory(symbol), category);
        }
    });
});
//# sourceMappingURL=test-morse.js.map