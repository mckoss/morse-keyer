export { MORSE_LETTERS, MORSE_DIGITS, MORSE_PUNCTUATION, MORSE_PROSIGNS, MORSE_ALL };

// Table of all Morse code letters
const MORSE_LETTERS = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..'
};

const MORSE_DIGITS = {
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.'
};

const MORSE_PUNCTUATION = {
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
