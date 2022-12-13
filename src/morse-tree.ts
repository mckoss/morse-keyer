import { MorseTable, symbolCategory } from './morse.js';

export { makeMorseTree, rotate, findPosition };

const WIDTH = 4;
const HEIGHT = 4;
const SYM_RADIUS = 0.1;
const NUDGE_BASELINE = -SYM_RADIUS * 0.2;

function makeMorseTree(symbols: MorseTable): string {
    let result = `<svg class="morse-tree" viewBox="${-WIDTH/2} ${-HEIGHT/2} ${WIDTH} ${HEIGHT}">`;
    result += `\n<style>
        circle.start {
            fill: green;
            stroke: none;
            r: ${SYM_RADIUS/2};
        }

        circle.letter {
            fill: white;
            stroke: black;
            stroke-width: 0.01;
            r: ${SYM_RADIUS};
        }

        circle.digit {
            fill: lightgray;
            stroke: black;
            stroke-width: 0.01;
            r: ${SYM_RADIUS};
        }

        circle.symbol {
            fill: tan;
            stroke: black;
            stroke-width: 0.01;
            r: ${SYM_RADIUS};
        }

        text {
            font-size: ${SYM_RADIUS * 1.5}px;
            text-anchor: middle;
            dominant-baseline: mathematical;
        }

        line.dot {
            stroke-width: ${SYM_RADIUS / 3};
            stroke-linecap: round;
            stroke: red;
        }

        line.dash {
            stroke-width: ${SYM_RADIUS / 3};
            stroke-linecap: round;
            stroke: black;
        }
    </style>
    `;

    const cache: Set<string> = new Set();

    for (const [letter, morse] of Object.entries(symbols)) {
        for (let i = 1; i <= morse.length; i++) {
            const prefix = morse.slice(0, i);
            if (!cache.has(prefix)) {
                result += terminalSegment(prefix);
                cache.add(prefix);
            }
        }
    }

    for (const [letter, morse] of Object.entries(symbols)) {
        const [x, y] = findPosition(morse);
        result += `\n<circle class="${symbolCategory(letter)}" cx="${x}" cy="${y}" />`;
        result += `\n<text x="${x}" y="${y + NUDGE_BASELINE}">${letter}</text>`;
    }

    result += `\n<circle class="start" cx="0" cy="0" />`;

    result += `\n</svg>`;

    return result;
}

type Coord = [number, number];

// Poistion of letter in a 2d quadtree rooted at the origin.
// By scanning the morse code string, each dot traverses the
// left branch and each dash traverses the right branch.
function findPosition(morse: string): Coord {
    let result = [0, 0];
    let dir: Coord = [0, -1];
    let scale = WIDTH / 4;
    let isSquare = true;
    let pos: Coord = [0, 0];

    for (let c of morse) {
        let turn = c === '.' ? 1 : -1;
        dir = rotate(dir, turn);
        pos = add(pos, mult(dir, scale));
        if (isSquare) {
            isSquare = false;
        } else {
            scale /= 2;
            isSquare = true;
        }
    }

    return pos;
}

function terminalSegment(morse: string): string {
    if (morse.length === 0) {
        return '';
    }
    const cls = morse.endsWith('.') ? 'dot' : 'dash';
    const p1 = findPosition(morse.slice(0, -1));
    const p2 = findPosition(morse);
    return `<line class="${cls}" x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" />`;
}

// Rotate a vector by 90 degrees counterclockwise for each turn.
// Turns can be positive or negative.
// Assume a left-handed coordinate system (y-axis points down).
function rotate(dir: Coord, turns: number): Coord {
    const COS = [1, 0, -1, 0];
    const SIN = [0, -1, 0, 1];

    turns = turns % 4;
    if (turns < 0) {
        turns += 4;
    }

    const x = dir[0] * COS[turns] - dir[1] * SIN[turns];
    const y = dir[0] * SIN[turns] + dir[1] * COS[turns];

    return [x, y];
}

function add(a: Coord, b: Coord): Coord {
    return [a[0] + b[0], a[1] + b[1]];
}

function mult(a: Coord, scalar: number): Coord {
    return [a[0] * scalar, a[1] * scalar];
}
