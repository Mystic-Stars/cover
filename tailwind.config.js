/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: {
            DEFAULT: '#ffffff',
            secondary: '#fafafa',
          },
          foreground: {
            DEFAULT: '#000000',
            secondary: '#666666',
          },
          border: {
            DEFAULT: '#eaeaea',
            hover: '#999999',
          },
        },
        // Dark mode colors
        dark: {
          background: {
            DEFAULT: '#000000',
            secondary: '#111111',
          },
          foreground: {
            DEFAULT: '#ffffff',
            secondary: '#888888',
          },
          border: {
            DEFAULT: '#333333',
            hover: '#444444',
          },
        },
        accent: {
          blue: '#0070F3',
          cyan: '#50E3C2',
          violet: '#7928CA',
          success: '#0070F3',
          error: '#FF0000',
          warning: '#F5A623',
        },
        card: {
          light: {
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'rgba(0, 0, 0, 0.1)',
            hover: 'rgba(0, 0, 0, 0.02)',
          },
          dark: {
            background: 'rgba(255, 255, 255, 0.03)',
            border: 'rgba(255, 255, 255, 0.1)',
            hover: 'rgba(255, 255, 255, 0.05)',
          }
        }
      },
      fontFamily: {
        sans: ['LXGW WenKai GB Screen', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
