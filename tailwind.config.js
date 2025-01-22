/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      maxWidth: {
        '2xs': '16rem',
        '8xl': '90rem',
      },
      colors: {
        body: {
          light: '#F9FAFB',
          dark: '#111827',
        },
        container: {
          light: '#ffffff',
          dark: '#1F2937',
        },
        heading: {
          light: '#111827',
          dark: '#ffffff',
        },
        label: {
          light: '#6b7280',
          dark: '#9ca3af',
        },
        primary: {
          light: '#1469C0',
          dark: '#9EBBF3',
        },
        'form-field-container': {
          light: '#F9FAFB',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
};
