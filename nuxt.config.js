export default defineNuxtConfig({
    components: true,
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL || 'http://localhost:8080/',
        },
    },
})
