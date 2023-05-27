/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'login-background': '#F4F4F4',
        primary: '#061A40',
        'primary-1': '#0267C1',
        'hr-primary-1': '#44AF69',
        'primary-2': '#061A40',
        'primary-3': '#44AF69',
        'spend-primary-1': '#0267C1',
        'secondary-1': '#2A9D8F',
        'secondary-2': '#001984',
        'hr-secondary-1': '#44AF69',
        'secondary-2-light': '#FAFAFD',
        'secondary-2-extralight': 'rgba(0, 25, 132, 0.05)',
        'secondary-3': '#009DDC',
        'secondary-4': '#EFA00B',
        'secondary': '#CCE8FE',
        'color-warning-light': 'rgba(239, 160, 11, 0.05)',
        'color-black-3': 'rgba(27, 27, 27, 0.7)',
        'color-gray': '#9097a5',
        'color-gray-2': '#f2f2f2',
        'color-white': '#ffffff',
        'color-off-white': '#f9f9fc',
        'color-green-medium': '#44AF69',
        'color-green-light': 'rgba(68, 175, 105, 0.1)',
        'color-orange': 'rgba(239, 160, 11, 1)',
        'color-orange-light': 'rgba(239, 160, 11, 0.1)',
        'color-error': '#d34829',
        'color-error-light': 'rgba(211, 72, 41, 0.1)',
        'color-warning': '#ffd24c',
        'color-border': '#dddddd',
        'color-border-2': 'rgba(144, 151, 165, 0.2)',
        'color-table-text': 'rgba(24, 24, 25, 0.9)',
        'color-line': 'rgba(221, 220, 220, 0.6)',
        error: '#D34829',
      },
    },
  },
  plugins: [],
}
