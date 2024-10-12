/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image' : "url('./src/assets/bg1.jpg')",
        'custom-image2' : "url('./src/assets/FA20_ZoomFamily_NikeNYC_NA_RXD_10_kD4s4l0.max-2400x1200.jpg')",
        'custom-image3' : "url('/src/assets/craig-lovelidge-4O9NJ3cJo88-unsplash.jpg')"
      }
    },
  },
  plugins: [],
}