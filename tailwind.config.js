/**
 * Brand tokens for shadahm.github.io.
 *
 * Palette is adapted from the City of Stockholm graphic profile
 * (https://varumarkesmanual.stockholm/grafisk-profil/farg/) — colour values only,
 * none of the city's identity. See CLAUDE.md for the full brand rules, including
 * the "professional resume, not a marketing site" design tone.
 *
 * Add new colours here rather than hardcoding hex values in templates.
 */
const path = require('path');

module.exports = {
  // Absolute so content scanning works regardless of the cwd Vite is launched from.
  content: [path.join(__dirname, 'src/**/*.{html,ts}')],
  theme: {
    extend: {
      colors: {
        // Stockholm profile colours. primary/secondary/accent carry the design;
        // pink/green/yellow are supporting and used sparingly.
        primary: {
          DEFAULT: '#007FC8',
          dark: '#00659F',
          light: '#E7F3FA'
        },
        secondary: {
          DEFAULT: '#76368C',
          dark: '#5D2B6F',
          light: '#F1EAF4'
        },
        accent: {
          DEFAULT: '#E9500E',
          dark: '#BC400B',
          light: '#FDEDE6'
        },
        brandPink: '#E5006C',
        brandGreen: '#009991',
        // Yellow needs large text only — never a body-text or small-button background.
        brandYellow: '#FCBF0A',

        // Neutral ramp for text, borders, and backgrounds.
        ink: {
          50: '#F6F8FA',
          100: '#EDF0F3',
          200: '#DFE4E9',
          300: '#C2C9D0',
          400: '#9AA3AD',
          500: '#77818C',
          600: '#5D6670',
          700: '#454D57',
          800: '#2E353D',
          900: '#1F2429'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};
