import { assert } from "chai";
import { rotate, findPosition, makeMorseTree } from "../morse-tree.js";
suite("Morse", () => {
    test("rotate", () => {
        const tests = [
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
        const tests = [
            { morse: "", expected: [0, 0] },
            { morse: ".", expected: [-1, 0] },
            { morse: "-", expected: [1, 0] },
            { morse: "..", expected: [-1, 1] },
            { morse: ".-", expected: [-1, -1] },
            { morse: "-.", expected: [1, -1] },
            { morse: "--", expected: [1, 1] },
        ];
        for (const { morse, expected } of tests) {
            const result = findPosition(morse);
            assert.equal(result[0], expected[0]);
            assert.equal(result[1], expected[1]);
        }
    });
    test("makeMorseTree", () => {
        const tree = makeMorseTree({ 'A': '.-' });
        assert.isTrue(tree.startsWith(`<svg class="morse-tree" viewBox="-2 -2 4 4">`));
        assert.isTrue(tree.endsWith(`\n</svg>`));
    });
});
//# sourceMappingURL=test-morse-tree.js.map