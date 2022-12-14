/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx}',
    'src/modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ['ct-primary']: {
          50: '#e7fae9',
          100: '#c5ebc9',
          200: '#a2dba8',
          300: '#7ecd87',
          400: '#5bbf65',
          500: '#42a54c',
          600: '#32813a',
          700: '#235c28',
          800: '#113717',
          900: '#001401',
        },
        ['ct-secondary']: {
          50: '#d8feff',
          100: '#abf3ff',
          200: '#7ceafe',
          300: '#4ce0fc',
          400: '#1fd7fa',
          500: '#05bee0',
          600: '#0093af',
          700: '#00697f',
          800: '#00404e',
          900: '#00171e',
        },
        ['ct-success']: {
          50: '#eafae4',
          100: '#ccebc3',
          200: '#acdca0',
          300: '#8dce7c',
          400: '#6ec058',
          500: '#54a73f',
          600: '#418230',
          700: '#2d5d21',
          800: '#193911',
          900: '#021500',
        },
        ['ct-info']: {
          50: '#def9ff',
          100: '#b7e9f8',
          200: '#8ed8ef',
          300: '#64c8e8',
          400: '#3db9e0',
          500: '#269fc6',
          600: '#177c9b',
          700: '#0a5870',
          800: '#003645',
          900: '#00141b',
        },
        ['ct-warning']: {
          50: '#fff2de',
          100: '#f7dab9',
          200: '#edc390',
          300: '#e5aa66',
          400: '#dd923c',
          500: '#c37922',
          600: '#985e19',
          700: '#6d4310',
          800: '#432705',
          900: '#1c0b00',
        },
        ['ct-error']: {
          50: '#ffe2f2',
          100: '#ffb1d4',
          200: '#ff7fb6',
          300: '#ff4d99',
          400: '#fe1e7b',
          500: '#e50762',
          600: '#b3004c',
          700: '#810036',
          800: '#4f0021',
          900: '#20000c',
        },
        ['ct-neutral']: {
          dark: {
            50: '#ecedfd',
            100: '#c9cae9',
            200: '#a6a7d8',
            300: '#8284c8',
            400: '#5f61b8',
            500: '#45499e',
            600: '#36387b',
            700: '#262858',
            800: '#161836',
            900: '#060816',
          },
          medium: {
            50: '#e6f3ff',
            100: '#c6d7ec',
            200: '#a4bcda',
            300: '#81a1ca',
            400: '#5e87ba',
            500: '#456da1',
            600: '#35557e',
            700: '#253d5b',
            800: '#142439',
            900: '#020c19',
          },
          ligth: {
            50: '#f8e8ff',
            100: '#dfbef6',
            200: '#c494ec',
            300: '#a969e3',
            400: '#9a3fd9',
            500: '#8b26c0',
            600: '#741c96',
            700: '#5a136c',
            800: '#3b0b42',
            900: '#19021a',
          },
        },
        ['ct-special']: {
          ligth: {
            50: '#fffce1',
            100: '#fef7b3',
            200: '#fdf284',
            300: '#fded55',
            400: '#fce82b',
            500: '#e3cf1b',
            600: '#b0a111',
            700: '#7e7309',
            800: '#4c4501',
            900: '#1a1700',
          },
        },
      },
      fontFamily: {
        nunito: "'Nunito', sans-serif",
      },
    },
  },
  plugins: [],
};
