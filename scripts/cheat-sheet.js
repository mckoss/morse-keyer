import { morseToSvg } from './morse.js';
export { tableFromElements, morseTableFromElements };
function morseTableFromElements(elements, keys) {
    return tableFromElements(elements, 'morse-table', morseToSvg, keys);
}
function tableFromElements(elements, className, mapping, keys) {
    const table = document.createElement('div');
    table.className = className;
    keys = keys || Object.keys(elements).sort();
    for (const key of keys) {
        const elt = document.createElement('div');
        const sym = document.createElement('span');
        sym.textContent = key;
        elt.appendChild(sym);
        elt.insertAdjacentHTML('beforeend', mapping(elements[key]));
        table.appendChild(elt);
    }
    return table;
}
//# sourceMappingURL=cheat-sheet.js.map