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
        'body-primary': {
          light: '#ffffff',
          dark: '#111827',
        },
        'body-secondary': {
          light: '#f9fafb',
          dark: '#1f2937',
        },
        container: {
          light: '#ffffff',
          dark: '#1F2937',
        },
        input: {
          light: '#f9fafb',
          dark: '#374151',
        },
        text: {
          light: '#6b7280',
          dark: '#9ca3af',
        },
        title: {
          light: '#111827',
          dark: '#ffffff',
        },
        card: {
          light: '#ffffff',
          dark: '#374151',
        },
        primary: {
          light: '#1469C0',
          dark: '#9EBBF3',
        },
        'mat-text': {
          light: '#ffffff',
          dark: '#002f65',
        },
      },
    },
  },
  plugins: [],
};
