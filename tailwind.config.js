/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        header: ['var(--font-gt-america)', 'sans-serif'],
        sans: ['var(--font-nuzeit)', 'sans-serif'],
      },
      keyframes: {
        expand: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        collapse: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        revealRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        expand: 'expand 400ms cubic-bezier(1, 0, 0.25, 1)',
        collapse: 'collapse 400ms cubic-bezier(1, 0, 0.25, 1)',
        revealRight: 'revealRight 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
        scrollLeft: 'scrollLeft var(--marquee-duration) linear infinite',
      },
      colors: {
        beige: {
          100: '#f7eee3',
          200: '#e5d7cc',
        },
        canary: '#fcee71',
        gray: {
          100: '#767472',
          200: '#514f4d',
          300: '#474543',
          400: '#383633',
        },
        red: '#B05D54',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
}
