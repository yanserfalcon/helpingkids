// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html"], // Solo purga index.html por ahora
    theme: {
      extend: {
        colors: {
          'sage-green': '#98A086',
          'dusty-rose': '#A76D5E',
          'golden-tan': '#C4A071',
          'warm-beige': '#DFCCB1',
          'terracotta-brown': '#846044',
        },
        fontFamily: {
          // Sugiero usar una fuente sans-serif limpia y moderna de 2026, ej. Varela Round
          'varela': ['"Varela Round"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }