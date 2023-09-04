import GuitarString from './guitar-string.js';

export default class GuitarStrings extends HTMLElement {
  connectedCallback() {
    this.orientation = this.getAttribute('orientation');

    let strings = '<div class="spacer"></div>';
    for (let c = 0; c < this.getAttribute('strings'); c++) {
      strings += `<guitar-string orientation="${this.orientation}"></guitar-string>`;
    }

    strings += this.orientation === 'vertical'
      ? `<style>
           guitar-strings { 
             height: 100%; 
             display: flex; 
           } 
           guitar-strings > guitar-string, div.spacer { 
             flex: 1; 
           } 
         </style>`
      : `<style>
           guitar-strings {
             display: grid;
             grid-template-rows: 2fr;
           }
           .spacer {
             height: 2em;
           }
         </style>`

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

    let magnitude = this.orientation === 'vertical'
      ? Math.abs(positions.current.x - positions.last.x)
      : Math.abs(positions.current.y - positions.last.y);

    let min = this.orientation === 'vertical'
      ? Math.min(positions.current.x, positions.last.x)
      : Math.min(positions.current.y, positions.last.y);

    let max = this.orientation === 'vertical'
      ? Math.max(positions.current.x, positions.last.x)
      : Math.max(positions.current.x, positions.last.x);

    for (let d = 0; d < this.stringsElements.length; d++) {
      if (this.stringsElements[d].between(min, max)) {
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
