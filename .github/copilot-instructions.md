# Project Overview
This project is a web prototype that blends design systems, HTML prototypes, and JavaScript utilities. The project is structured to quickly explore design layouts and experimental features while maintaining a production-ready base.

## Architecture & File Structure
- **HTML Files**: Files like `index.html`, `merci.html`, `prototype-ameliore.html`, and `design-system-examples.html` serve as the entry points and prototyping pages. They illustrate different UX flows and component usage.
- **CSS Files**: Multiple stylesheets (`design-system.css`, `prototype-styles.css`, `styles.css`, `components.css`, `leaflet.css`) indicate a separation of design concerns, with a specific design system and tailored layouts for prototypes.
- **JavaScript Utilities**: Files like `script.js`, `prototype-script.js`, and `security-monitor.js` contain business logic and interactive behaviors, with testing conducted in `tests/vibecoding-tests.js`.
- **Build Tools**: Configuration files such as `postcss.config.js` and `tailwind.config.js` show that PostCSS and Tailwind CSS are used to process and compile styles.
- **Package Management**: `package.json` manages dependencies and scripts, driving automated build and test commands.

## Developer Workflows
- **Building & Styling**: Use PostCSS and Tailwind CSS workflows to compile and optimize styles. Check `postcss.config.js` and `tailwind.config.js` for custom settings.
- **Testing**: Automated tests are set up in the `tests` directory (e.g., `vibecoding-tests.js`). Running these tests helps verify functionality in JavaScript modules.
- **Debugging & Troubleshooting**: The `TROUBLESHOOTING.md` file provides guidance for common issues encountered during development.

## Conventions & Patterns
- **Separation of Concerns**: HTML, CSS, and JS files are divided based on purpose (prototyping vs. production-ready).
- **Design System**: The `design-system.css` and its corresponding examples (`design-system-examples.html`) serve as a blueprint for UI consistency across prototypes.
- **Prototype Variants**: Files prefixed with `prototype-` indicate experimental features. Compare these against the main files (`index.html`, `script.js`) to understand iterative improvements.
- **Security Practices**: The presence of `security-monitor.js` suggests integrated security checks; review its implementation for application-specific safeguards.

## Integration & Communication
- **Cross-Component Communication**: JavaScript modules interact directly through globally defined functions and DOM events. Ensure patterns from `script.js` are followed in prototyping scripts.
- **External Dependencies**: Dependencies are managed via `package.json`. Consult this file for versioned libraries, especially for Tailwind CSS and PostCSS.

## Final Notes for AI Agents
- **Focus on File Conventions**: Prioritize understanding HTML prototypes and their linkage with designated CSS and JS components.
- **Build & Test Commands**: Look into `package.json` scripts for commands that drive builds and tests; these are critical for reproducing developer workflows.
- **Iterative Development**: Compare experimental prototyping files (prefixed with `prototype-`) against stable implementations to extract design evolution insights.

Please review these instructions and provide feedback if any sections are unclear or need additional details.
