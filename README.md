## Web Component - Raw

The `head` of this document has three imports, the first is the `guitar-body.js` script module. The second is the `csshake.min.css` third party css module used to shake an element. The final is the `main.css` css module, which is used to style the elements place in the `body`.

The `body` contains two elements, the `<guitar-body>` element and a `<div>` element.    
Per the `main.css` `guitar-body` css the `<guitar-body>` element is initially not displayed until you click the `Click Me To Start`  button.

Clicking the `Click Me To Start` button hides the `Click Me To Start` button and displays the guitar.
## `<guitar-body></guitar-body>`

This component, at this point, has two responsibilities;
1. Seed the number of strings to the `<guitar-strings>` `string` attribute
2. Listen for mouse movements to detect when a particular `<guitar-string>` is strummed

   When the `<guitar-body>` is first completely rendered a `stringsElement`  element is created, this references the outer `div` containing the
    1. shoves it in innerHtml
    2. creates the `this.stringsElement` to reference the `<guitar--strings>` in the html
    3. add a event listener to monitor mouse movements  
       The `onMouseMove` captures the positions and transfers this to the `<guitar-strings>`  position property.
## `<guitar-strings></guitar-strings>`

1. For the initial render it generates the html representing the guitar strings, this uses the strings attribute passed int the `<guitar-strings>` . It then assigns this the the `innerHtml`
2. During runtime determines which string(s) were hovered over and how hard the string was hit.
3. Pass what string(s) were strummed and how hard they were strummed to the individual (or multiple) `<guitar-string>`
## `<guitar-string></guitar-string>`
1. Initialize sound source at initial render
2. Set the innerHtml and styles for the string
3. Define the strum method, which is called from the mouse handler's call to `set positions`

While each `<guitar-string>` has a `strum()` method, this method is called from the `<guitar-strings>` from it's `positions` method. The `positions` method is called from the `onMouseMove` method located in the `<guitar-body>` component.


## Third Party Libraries
* https://github.com/mudcube/MIDI.js/
* http://elrumordelaluz.github.io/csshake/
* https://github.com/backspaces/as-app3d/blob/master/bin/wraplib.js
* https://www.liutaiomottola.com/formulae/fret.htm

The third item above is a tool to allow us to use the first library. The MIDI.js library is not a module, so in order to use the MIDI.js library we'll wrap it in a module using wraplib.js
The command used; `node ./bin/wraplib.js midi.min.js MIDI > midi.wrapper.js`


