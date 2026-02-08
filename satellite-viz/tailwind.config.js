/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    dark: '#0a0e27',
                    darker: '#050816',
                },
            },
        },
    },
    plugins: [],
}
