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
          dark: '#1E293B',
        },
        container: {
          light: '#ffffff',
          dark: '#1E293B',
        },
        input: {
          light: '#f9fafb',
          dark: '#334155',
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
          dark: '#334155',
        },
        primary: {
          light: '#005cbb',
          dark: '#abc7ff',
        },
        'mat-text': {
          light: '#ffffff',
          dark: '#002f65',
        },
      },
      screens: {
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};
