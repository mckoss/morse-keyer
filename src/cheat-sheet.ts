import { MorseTable, morseToSvg } from './morse.js';

export { tableFromElements };

function tableFromElements(elements: MorseTable): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'morse-table';
  const ordered = Object.keys(elements).sort();
  for (const key of ordered) {
    const row = table.insertRow();
    row.insertCell().textContent = key;
    row.insertCell().innerHTML = morseToSvg(elements[key]);
  }
  return table;
}
