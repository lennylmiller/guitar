import GuitarString from './guitar-string.js';

export default class GuitarStrings extends HTMLElement {
  /**
   * set points
   * @param pts
   */
  set points(pts) {
    if (!this.stringsElements) {
      return;
    }
    if (!pts.last || !pts.current) {
      return;
    }
    let magnitude = Math.abs(pts.current.x - pts.last.x);

    let xMin = Math.min(pts.current.x, pts.last.x);
    let xMax = Math.max(pts.current.x, pts.last.x);

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
}

if (!customElements.get('guitar-strings')) {
  customElements.define('guitar-strings', GuitarStrings);
}
