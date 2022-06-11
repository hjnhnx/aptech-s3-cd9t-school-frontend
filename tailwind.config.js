module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "var(--ant-primary-1)",
          200: "var(--ant-primary-2)",
          300: "var(--ant-primary-3)",
          400: "var(--ant-primary-4)",
          500: "var(--ant-primary-5)",
          600: "var(--ant-primary-6)",
          700: "var(--ant-primary-7)",
          800: "var(--ant-primary-8)",
          900: "var(--ant-primary-9)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
