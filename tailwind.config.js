/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-marianne)',
      },
      colors: {
        primary: {
          50: '#f0f4fd',
          100: '#e3ebfc',
          200: '#cdd9f8',
          300: '#afbff2',
          400: '#8e9eeb',
          500: '#737de1',
          600: '#585ad3',
          700: '#4949ba',
          800: '#3d3f96',
          900: '#373978',
          950: '#202046',
        },
        secondary: {
          50: '#fef1fa',
          100: '#fde6f7',
          200: '#feccf1',
          300: '#ffa2e4',
          400: '#fd69d0',
          500: '#f73dba',
          600: '#e81a9b',
          700: '#d40d83',
          800: '#a60e66',
          900: '#8b1058',
          950: '#550232',
        },
        emerald: {
          light: '#CEF1D5',
          default: '#6BC47B',
          dark: '#147826',
          extraDark: '#0D4A1C',
          evenDarker: '#08300F',
          megaDark: '#041807',
        },
        yellow: {
          light: '#FFEFBC',
          default: '#F9CD49',
          dark: '#79621D',
          // Add an extraDark color to the yellow palette
          extraDark: '#4D3A0F',
          evenDarker: '#2E2409',
          megaDark: '#171105',
        },
        orange: {
          light: '#FFDBBC',
          default: '#FDA354',
          dark: '#A04B00',
          extraDark: '#6D2E00',
          evenDarker: '#3F1A00',
          megaDark: '#1F0D00',
        },
        blue: {
          light: '#E0EFFD',
          default: '#A2D2FD',
          dark: '#326FA3',
          extraDark: '#1F3F5C',
          evenDarker: '#0F1F2E',
          megaDark: '#071019',
        },
        lavender: {
          // Add an extra light color to the lavender palette
          extraLight: '#F4F1FE',
          light: '#E9E6FE',
          default: '#9E8EF5',
          dark: '#685CB9',
          extraDark: '#3F2F6C',
          evenDarker: '#1F1736',
          megaDark: '#0F0B1B',
        },
        default: '#1A1A1A',
        grey: {
          100: '#F7FBFF',
          200: '#E3E3DB',
        },
        categories: {
          transport: '#A2D2FD',
          alimentation: '#FDA354',
          logement: '#6BC47B',
          divers: '#F9CD49',
          servicessocietaux: '#9E8EF5',
        },
      },
      fontSize: {
        '3xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        valuechange: {
          '0%': { opacity: 0, transform: 'translateX(-10%)' },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(10%)' },
        },
        iconsRotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        valuechange: 'valuechange 3s ease-out infinite',
        iconsRotation: 'iconsRotation 1s ease-in-out',
      },
      backgroundImage: {
        'icons-mobile': "url('/images/misc/mobileIcons.svg')",
      },
      screens: {
        xs: '320px',
      },
    },
  },
  safelist: [
    'text-categories-transport',
    'text-categories-alimentation',
    'text-categories-logement',
    'text-categories-divers',
    'text-categories-servicessocietaux',
    'bg-categories-transport',
    'bg-categories-alimentation',
    'bg-categories-logement',
    'bg-categories-divers',
    'bg-categories-servicessocietaux',
    'fill-categories-transport',
    'fill-categories-alimentation',
    'fill-categories-logement',
    'fill-categories-divers',
    'fill-categories-servicessocietaux',
    'border-categories-transport',
    'border-categories-alimentation',
    'border-categories-logement',
    'border-categories-divers',
    'border-categories-servicessocietaux',
  ],
  plugins: [],
}
