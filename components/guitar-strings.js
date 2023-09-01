import GuitarString from './guitar-string.js';

export default class GuitarStrings extends HTMLElement {
  connectedCallback() {
    let strings = '<div class="spacer"></div>';
    for (let c = 0; c < this.getAttribute('strings'); c++) {
      strings += `<guitar-string></guitar-string>`;
    }

    strings += `
      <style>
        guitar-strings { 
          height: 100%; 
          display: flex; 
        } 
        guitar-strings > guitar-string, div.spacer { 
          flex: 1; 
        } 
      </style>`;
    this.innerHTML = strings;
    this.stringsElements = this.querySelectorAll('guitar-string');
  }

  /**
   * set positions
   * @param positions
   */
  set positions(positions) {
    if (!this.stringsElements) {
      return;
    }
    if (!positions.last || !positions.current) {
      return;
    }
    let magnitude = Math.abs(positions.current.x - positions.last.x);

    let xMin = Math.min(positions.current.x, positions.last.x);
    let xMax = Math.max(positions.current.x, positions.last.x);

    for (let d = 0; d < this.stringsElements.length; d++) {
      if (xMin <= this.stringsElements[d].offsetLeft && xMax >= this.stringsElements[d].offsetLeft) {
        let strum = {
          power: magnitude,
          string: d
        };
        this.stringsElements[d].strum(strum);
      }
    }
  }
}

if (!customElements.get('guitar-strings')) {
  customElements.define('guitar-strings', GuitarStrings);
}
