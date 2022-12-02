export {
    MorseTable, MORSE_LETTERS, MORSE_DIGITS, MORSE_PUNCTUATION, MORSE_PROSIGNS, MORSE_ALL,
    MORSE_DOT, MORSE_DASH, htmlFromMorse, textToMorse, morseToTiming
};

interface MorseTable {
    [character: string]: string;
}

// These are close but imperfect approximations of correctly aligned
// and scaled dots and dashes.
const MORSE_DOT = "&sdot;";
const MORSE_DASH = "&minus;";

function htmlFromMorse(morse: string): string {
    return morse.replace(/\./g, MORSE_DOT).replace(/-/g, MORSE_DASH);
}

// Table of all Morse code letters
const MORSE_LETTERS: MorseTable = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..'
};

const MORSE_DIGITS: MorseTable = {
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.'
};

const MORSE_PUNCTUATION: MorseTable = {
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
    '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '@': '.--.-.'
};

// Prosigns as used in Amateur Radio CW contacts
const MORSE_PROSIGNS = {
    'AR': 'End of message',
    'AS': 'Wait',
    'BK': 'Break',
    'BT': 'New section',
    'SK': 'End of contact',
    'K': 'End of tranmission (over)',
    'KN': 'End of transmission - other station only reply',
    'HH': 'Sending error - retying',
};

const MORSE_ALL = { ...MORSE_LETTERS, ...MORSE_DIGITS, ...MORSE_PUNCTUATION };

// Convert string with '.', '-', and ' ' to an svg element that renders the morse code as dots and
// dashes. This uses morse.css for common styling of line width and color. This is based on an SVG
// coordinate system wher the dots are 10 units wide.  We also add 15 units of space before and
// after the symbols - so that abutting symbols would be correctly spaced at 30 units apart
// (inter-character spacing).
//
// Dot width: 10 units (same as line width)
// Dash width: 30 units (20 unit line with end-caps of 5 units each)
// Inter-symbol spacing: 10 units
// Inter-charcter spacing: 30 units
// Prefix/postfix spacing: 15 units
function morseToSvg(morse: string): string {
//     <svg width="40px" height="25px" viewBox="0 0 80 50" version="1.1" xmlns="http://www.w3.org/2000/svg">
//     <g class="morse">
//         <line x1="20" y1="25" x2="20" y2="25"  />
//         <line x1="40" y1="25" x2="60" y2="25"  />
//     </g>
// </svg>
//     return morse.replace(/\./g, MORSE_DOT).replace(/-/g, MORSE_DASH);
    return morse;
}

// Convert string of characters to string or morse code dots, dashes, and spaces.
// Inter-character spacing will output as a single space.  Inter-word spacing will output as a
// verticle bar surrounded by spaces (' | ').
//
// Prosigns can be input as <SK>, for example and there will be no space insterst in the
// sequence '...-.-'.
function textToMorse(text: string): string {
    text = text.trim();
    text = text.replace(/\s\s+/g, ' ');
    let result = '';
    let spacing = ' ';
    for (let c of text) {
        c = c.toUpperCase();
        switch (c) {
            case ' ':
                result += '| ';
                break;

            case '<':
                spacing = '';
                break;

            case '>':
                spacing = ' ';
                break;

            default:
                if (c in MORSE_ALL) {
                    result += MORSE_ALL[c] + spacing;
                }
                break;
        }
    }

    return result.trim();
}

// Return numerical timing for a morse text string as sequence of [on, off] pairs
// in units of 1 unit for a dot.  The first element is the on time, the second is the off time.
// The only characters affecting the output are '.', '-', ' ' and '|'.  All other characters
// are ignored.
function morseToTiming(morse: string): number[] {
    let result: number[] = [];
    let time = 0;
    for (let c of morse) {
        switch (c) {
            case '.':
                result.push(time, time + 1);
                time += 2;
                break;

            case '-':
                result.push(time, time + 3);
                time += 4;
                break;

            case ' ':
                // Previous symbol already added 1 unit of space.
                // Bring the total to 3.
                time += 2;
                break;

            case '|':
                // It is expected that | will be surrounded by spaces giving a total of 7 units of
                // space between words.
                time += 2;
                break;
        }
    }

    return result;
}