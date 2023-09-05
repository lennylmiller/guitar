import MIDI from '../lib/midi.wrapper.js';

export default class GuitarString extends HTMLElement {
  connectedCallback() {
    this.orientation = this.getAttribute('orientation');

    MIDI.loadPlugin({
      soundfontUrl: './',
      instrument: 'lib/acoustic_grand_piano',
      onsuccess: () => this.onLoaded()
    });

    console.log('orientation', this.orientation);

    const innerCss = this.orientation === 'vertical'
      ? `<style>
           guitar-string > .line { 
             background-color: white;
             height: 100%; 
             width: 2px; 
           }
        </style>`
      : `<style>
           guitar-string {
             padding-top: 3.5em;
           }
           guitar-string > .line {
             height: 2px;
             background-color: silver;
           }
         </style>`

    this.innerHTML = `
      <div class="line"></div> 
      ${innerCss}
    `;
  }

  strum(params) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    let dur = params.power * 10 + 250;
    this.classList.add(
      'shake',
      'shake-constant',
      this.orientation === 'vertical' ? 'shake-horizontal' : 'shake-vertical'
    );
    if (dur < 500) {
      this.classList.add('shake-little');
    }
    this.timer = setTimeout(() => this.stopStrum(), dur);
    this.playSound(params);
  }

  playSound(params) {
    if (!this._ready) {
      return;
    }

    let note = 60 + params.string * 5;
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, note, params.power, 0);
    MIDI.noteOff(0, note, 0.75);
  }

  stopStrum() {
    this.classList.remove(
      'shake',
      'shake-constant',
      this.orientation === 'vertical' ? 'shake-horizontal' : 'shake-vertical',
      'shake-little'
    );
  }

  onLoaded() {
    this._ready = true;
  }

  between(low, high) {
    const offset = this.orientation === 'vertical'
      ? this.offsetLeft
      : this.offsetTop + this.offsetHeight

    return low > high
      ? offset >= high && offset <= low
      : offset >= low && offset <= high
  }
}

if (!customElements.get('guitar-string')) {
  customElements.define('guitar-string', GuitarString);
}
