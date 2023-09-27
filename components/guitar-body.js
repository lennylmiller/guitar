import Strings from './guitar-strings.js';

export default class GuitarBody extends HTMLElement {
  static get observedAttributes() {
    return ['orientation'];
  }

  connectedCallback() {
    this.guitarBodyElement = document.createElement('div');
    this.templates = document.createElement('div');
    this.appendChild(this.guitarBodyElement);
    this.appendChild(this.templates);
    const request = new XMLHttpRequest();

    request.open('GET', 'templates.html', true);
    request.addEventListener('load', (event) => {
      this.templates.innerHTML = event.target.response;
      this.populateGuitarBody();
    });
    request.send();
  }

  populateGuitarBody() {
    const template = this.templates.querySelector('template.' + this.getAttribute('orientation'));
    if (template) {
      const clone = template.content.cloneNode(true);
      this.guitarBodyElement.innerHTML = '';
      this.guitarBodyElement.appendChild(clone);
    }
    this.stringsElement = this.querySelector('guitar-strings');
    this.addEventListener('mousemove', e => this.onMouseMove(e));
  }

  attributeChangedCallback(name, oldvalue, newvalue) {
    if (this.templates) {
      this.populateGuitarBody();
    }
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
