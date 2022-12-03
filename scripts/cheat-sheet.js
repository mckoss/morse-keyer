import { morseToSvg } from './morse.js';
export { tableFromElements, morseTableFromElements };
function morseTableFromElements(elements, keys) {
    return tableFromElements(elements, 'morse', morseToSvg, keys);
}
function tableFromElements(elements, className, mapping, keys) {
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
//# sourceMappingURL=cheat-sheet.js.map