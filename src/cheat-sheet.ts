import { MorseTable, morseToSvg } from './morse.js';

export { tableFromElements, morseTableFromElements };

function morseTableFromElements(elements: MorseTable, keys?: string[]): HTMLDivElement {
    return tableFromElements(elements, 'morse', morseToSvg, keys);
}

function tableFromElements(elements: MorseTable, className: string, mapping?: (val: string) => string, keys?: string[]): HTMLDivElement {
    const table = document.createElement('div');
    table.classList.add(className, 'table');
    keys = keys || Object.keys(elements).sort();

    for (let key of keys) {
        const elt = document.createElement('div');
        const sym = document.createElement('span');
        let value = elements[key];

        // Process Prosigns in brackets
        if (typeof key === 'string' && key.match(/^\<.*\>$/)) {
            key = key.replace(/^\<(.*)\>$/, '$1');
            sym.classList.add('over');
        }

        sym.textContent = key;
        elt.appendChild(sym);

        if (mapping) {
            value = mapping(value);
        }
        elt.insertAdjacentHTML('beforeend', value);
        table.appendChild(elt);
    }

    return table;
}
