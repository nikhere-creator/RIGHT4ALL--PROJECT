import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#dc2626',
          navy: '#1e293b'
        }
      }
    }
  },
  plugins: []
} satisfies Config
