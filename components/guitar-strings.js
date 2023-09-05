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
             height: 4em;
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

    const current = this.orientation === 'vertical' ? positions.current.x : positions.current.y
    const last = this.orientation === 'vertical' ? positions.last.x : positions.last.y
    const magnitude = Math.abs(current - last);
    const min = Math.min(current, last);
    const max = Math.max(current, last);

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
