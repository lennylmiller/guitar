import Strings from './guitar-strings.js';

export default class GuitarBody extends HTMLElement {
  connectedCallback() {
    this.orientation = this.getAttribute('orientation');

    this.innerHTML = `
      <guitar-strings strings="${this.getAttribute('strings')}" orientation="${this.orientation}"></guitar-strings>
    `;

    this.stringsElement = this.querySelector('guitar-strings');
    this.addEventListener('mousemove', e => this.onMouseMove(e));
  }

  onMouseMove(event) {
    this.stringsElement.positions = {
      last: this.lastPosition,
      current: {
        x: event.pageX,
        y: event.pageY
      }
    };
    this.lastPosition = {
      x: event.pageX,
      y: event.pageY
    };
  }
}

if (!customElements.get('guitar-body')) {
  customElements.define('guitar-body', GuitarBody);
}
