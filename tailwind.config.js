/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/*.{html,js,ts,vue}',
    './layouts/*.{html,js,ts,vue}',
    './pages/*.{html,js,ts,vue}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "lofi", "retro"],
};
