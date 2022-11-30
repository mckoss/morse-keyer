import { htmlFromMorse } from './morse.js';
export { tableFromElements };
function tableFromElements(elements) {
    const table = document.createElement('table');
    table.className = 'morse-table';
    const ordered = Object.keys(elements).sort();
    for (const key of ordered) {
        const row = table.insertRow();
        row.insertCell().textContent = key;
        row.insertCell().innerHTML = htmlFromMorse(elements[key]);
    }
    return table;
}
//# sourceMappingURL=cheat-sheet.js.map