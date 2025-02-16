/** @type {import('tailwindcss').Config} */
export default {
    content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: { entrance:  'entrance 5s forwards' },

            keyframes: {
                entrance: {
                    '0%': {
                        transform: 'translateX(200%)'
                    },
                    '10%': {
                        transform: 'translateX(0)'
                    },
                    '90%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(200%)'
                    }
                },
            },
        },
    },
    plugins: [],
}