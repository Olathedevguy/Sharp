/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image' : "url('/bg1.jpg')",
        'custom-image2' : "url('/FA20_ZoomFamily_NikeNYC_NA_RXD_10_kD4s4l0.max-2400x1200.jpg')",
        'custom-image3' : "url('/craig-lovelidge-4O9NJ3cJo88-unsplash.jpg')",
        'custom-image4' : "url('/excercising_woman.jpg')",
        'custom-image5' : "url('/download (8).jpeg')",
        'custom-image6' : "url('/download (7).jpeg')",
        'custom-image7' : "url('/medel2.jpeg')",
      }
    },
  },
  plugins: [],
}