import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#1a5c3a',
          600: '#166534',
          700: '#14532d',
          800: '#0f4024',
          900: '#052e16',
        },
        accent: '#1a5c3a',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a5c3a 0%, #166534 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1a5c3a 0%, #166534 50%, #14532d 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
