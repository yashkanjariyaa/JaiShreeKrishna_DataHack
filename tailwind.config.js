// tailwind.config.js
export default {
    darkMode: 'class', // Enable class-based dark mode
    content: [
      "./index.html",  // Ensure Vite HTML is scanned
      "./src/**/*.{js,jsx,ts,tsx}",  // Include all React components
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  