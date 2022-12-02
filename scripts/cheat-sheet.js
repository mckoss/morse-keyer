import { morseToSvg } from './morse.js';
export { tableFromElements };
function tableFromElements(elements, keys) {
    const table = document.createElement('div');
    table.className = 'morse-table';
    keys = keys || Object.keys(elements).sort();
    for (const key of keys) {
        const elt = document.createElement('div');
        const sym = document.createElement('span');
        sym.textContent = key;
        elt.appendChild(sym);
        elt.insertAdjacentHTML('beforeend', morseToSvg(elements[key]));
        table.appendChild(elt);
    }
    return table;
}
//# sourceMappingURL=cheat-sheet.js.map