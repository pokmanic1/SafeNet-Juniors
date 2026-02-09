module.exports = {
  plugins: {
    // Tailwind configurat inline (nu trebuie tailwind.config.js separat)
    tailwindcss: {
      content: [
        "./index.html",
        "./public/**/*.html",
        "./src/**/*.{html,js}"
      ],
      theme: {
        extend: {
          colors: {
            primary: "#2563eb",
            secondary: "#16a34a",
            accent: "#f59e0b",
          }
        },
      },
      plugins: [],
    },
    autoprefixer: {},
  }
}
