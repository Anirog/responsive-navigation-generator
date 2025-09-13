# Copilot Instructions

This project is a **website navigation generator**.  
Users can customise a navigation component (HTML + CSS) through a simple web-based UI.  
Copilot should prioritise clarity, usability, and clean, maintainable code.

---

## Key Requirements

- **Input/Customisation Options (must-have)**
  - Profile image  
    - Change image (URL or upload)  
    - Change alt text  
    - Adjust size (small / medium / large)  
  - Navigation links  
    - Add / remove links  
    - Edit link text  
    - Edit link destination (URL)  
  - Navigation alignment (left, centre, right)  
  - Hamburger menu toggle (enable/disable for mobile view)  
  - Colours  
    - Header background colour  
    - Link text colour (normal + hover)  
  - Typography (font family + size)  
  - Responsive breakpoint (when hamburger appears)  
  - Sticky header toggle (on/off)

---

## Output

- Provide a **live preview** of the navigation as the user customises it.  
- Generate **clean HTML and CSS** that the user can copy/paste into their project.  
- Optionally provide a **download button** for `nav.html` + `nav.css`.  
- The base navigation component HTML + CSS is already created and stored in the `component` folder.  
  - Always **pull the navigation code from the `component` folder** as the starting point.  
  - Do not generate a new component from scratch.  
  - Apply user customisations on top of this base component.  

---

## Implementation Guidelines

- Use **vanilla JavaScript, HTML, and CSS** (no frameworks).  
- Organise code clearly:  
  - `index.html` → main app UI (preview + form controls).  
  - `styles.css` → styles for both the UI and the navigation component.  
  - `generator.js` → logic for updating preview + generating code.  
- Keep UI **simple and form-based** (inputs, colour pickers, font dropdowns).  
- Avoid unnecessary complexity (e.g. drag & drop editors, animations) for now.  
- Ensure output HTML + CSS is **standalone and reusable** outside the tool.  
- Prioritise **accessibility** (labels, alt text, focus states).  
- Write CSS with sensible class names and avoid inline styles.

---

## Stretch Goals (optional, not required)

- Support exporting as a zip file.  
- Support light/dark theme switcher for the nav.  
- Allow import/export of settings as JSON.  
- Add "active link" styling options.

---

## Notes for Copilot

- Default to **practical, minimal solutions**.  
- Do not introduce frameworks unless explicitly asked.  
- Keep generated navigation code **semantic, responsive, and accessible**.