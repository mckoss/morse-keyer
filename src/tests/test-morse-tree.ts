import { assert } from "chai";

import {
    rotate, findPosition
} from "../morse-tree.js";

suite("Morse", () => {
    test("rotate", () => {
        const tests: { dir: [number, number], turns: number, expected: [number, number]}[] = [
            { dir: [0, -1], turns: 0, expected: [0, -1] },
            { dir: [0, -1], turns: 1, expected: [-1, 0] },
            { dir: [0, -1], turns: 2, expected: [0, 1] },
            { dir: [0, -1], turns: 3, expected: [1, 0] },
            { dir: [0, -1], turns: 4, expected: [0, -1] },
            { dir: [0, 1], turns: 1, expected: [1, 0] },
            { dir: [-1, 0], turns: 1, expected: [0, 1] },
        ];

        for (const { dir, turns, expected } of tests) {
            const result = rotate(dir, turns);
            // console.log(`${dir} ${turns} ${result} ${expected}`);
            assert.equal(result[0], expected[0]);
            assert.equal(result[1], expected[1]);
        }
    });

    test("findPosition", () => {
        const tests: { morse: string, expected: [number, number] }[] = [
            { morse: "", expected: [0, 0]},
            { morse: ".", expected: [-1, 0]},
            { morse: "-", expected: [1, 0]},
            { morse: "..", expected: [-1, 1]},
            { morse: ".-", expected: [-1, -1]},
            { morse: "-.", expected: [1, -1]},
            { morse: "--", expected: [1, 1]},
        ];

        for (const { morse, expected } of tests) {
            const result = findPosition(morse);
            assert.equal(result[0], expected[0]);
            assert.equal(result[1], expected[1]);
        }
    });

});
