import { MorseTable, morseToSvg } from './morse.js';

export { tableFromElements, morseTableFromElements };

function morseTableFromElements(elements: MorseTable, keys?: string[]): HTMLDivElement {
    return tableFromElements(elements, 'morse', morseToSvg, keys);
}

function tableFromElements(elements: MorseTable, className: string, mapping?: (val: string) => string, keys?: string[]): HTMLDivElement {
    const table = document.createElement('div');
    table.classList.add(className, 'table');
    keys = keys || Object.keys(elements).sort();

    for (const key of keys) {
        const elt = document.createElement('div');
        const sym = document.createElement('span');
        sym.textContent = key;
        elt.appendChild(sym);
        let value = elements[key];
        if (mapping) {
            value = mapping(value);
        }
        elt.insertAdjacentHTML('beforeend', value);
        table.appendChild(elt);
    }

    return table;
}
