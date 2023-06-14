/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '33vh': '33vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '33vw': '33vw',
        '50vw': '50vw',
        '80vw': '80vw',
        '30%': '30%',
        '45%': '45%',
        '128': '32rem',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
}

