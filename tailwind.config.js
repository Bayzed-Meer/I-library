/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          dark: '#111827',
        },
        'on-primary': {
          light: '#6b7280',
          dark: '#9ca3af',
        },
        surface: {
          light: '#f9fafb',
          dark: '#1f2937',
        },
        'on-surface': {
          light: '#6b7280',
          dark: '#9ca3af',
        },
        'surface-container': {
          light: '#ffffff',
          dark: '#374151',
        },
        'form-field': {
          light: '#e2e8f0',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
};
