import Strings from './guitar-strings.js';

export default class GuitarBody extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <guitar-strings strings="${this.getAttribute('strings')}"></guitar-strings>
    `;
    this.stringsElement = this.querySelector('guitar-strings');
    this.addEventListener('mousemove', e => this.onMouseMove(e));
  }

  onMouseMove(event) {
    this.stringsElement.points = {
      last: this.lastPoint,
      current: {
        x: event.pageX,
        y: event.pageY
      }
    };
    this.lastPoint = {
      x: event.pageX,
      y: event.pageY
    };
  }
}

if (!customElements.get('guitar-body')) {
  customElements.define('guitar-body', GuitarBody);
}
