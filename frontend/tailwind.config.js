/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-svg': "url('/svgs/loginBg.svg')",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        backgroundPrimary: 'var(--background-primary)',
        backgroundSecondary: 'var(--background-secondary)',
        backgroundPrimaryHover: 'var(--background-primary-hover)',
        backgroundSlate500Hover: 'var(--background-slate-500-hover)',
        backgroundStone300: 'var(--background-stone-300)',
        backgroundGreen500: 'var(--background-green-500)',
        textPrimary: 'var(--text-primary)',
        textPrimaryHover: 'var(--text-primary-hover)',
        stone300: 'var(--stone-300)',
        neutral400: 'var(--neutral-400)',
        slate500: 'var(--slate-500)',

          border: 'var(--surface-overlay)',
          input: 'var(--surface-overlay)',
          ring: 'var(--surface-brand)',
          background: 'var(--background-primary)',
          foreground: 'var(--foreground-primary)',
          borderPrimary: 'var(--surface-foreground)',
          neutral200: 'var(--neutral-200)',
          neutral500: 'var(--neutral-500)',
          neutral700: 'var(--neutral-700)',
          neutral800: 'var(--neutral-800)',
          neutral1000: 'var(--neutral-1000)',
          neutral1100: 'var(--neutral-1100)',
          surfaceBrand: 'var(--surface-brand)',
          surfaceForeground: 'var(--surface-foreground)',
          surfaceOverlay: 'var(--surface-overlay)',
          eerieBlack: 'var(--eerie-black)',
          purpleBlue: 'var(--purple-blue)',
          indigo100: 'var(--indigo100)',
          gray350: 'var(--gray-350)',
          zinc500: 'var(--zinc-500)',
          borderGray: 'var(--border-primary)'
        },
    },
  },
  plugins: [],
}

