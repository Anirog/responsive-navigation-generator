# Prompt for Copilot

I’m building a **website navigation generator** based on the instructions in `copilot-instructions.md`.

Please scaffold the project with the following files:

* `index.html` → the main app UI with a form for customisation options and a live preview area.
* `styles.css` → styling for both the UI and preview.
* `generator.js` → JavaScript to update the preview in real time and generate downloadable HTML/CSS.

The base navigation component HTML + CSS is already in the `component` folder — always use that as the starting point for the preview and generated code.

For now, focus only on the **must-have customisations**:

* Profile image (URL, alt text, size small/medium/large).
* Navigation links (add/remove, edit text + URL).
* Navigation alignment (left, centre, right).
* Hamburger toggle (on/off for mobile).
* Header background colour.
* Link text colour (normal + hover).
* Typography (font family + size).
* Responsive breakpoint for hamburger.
* Sticky header toggle.

Make the UI **simple and form-based** (inputs, colour pickers, dropdowns).
Ensure accessibility (labels, alt text, focus states).
The output should be clean HTML + CSS that a user can copy or download.