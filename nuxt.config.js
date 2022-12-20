export default defineNuxtConfig({

    components: true,
    // router: {
    //     linkActiveClass: 'text-sky-500 font-semibold',
    //     linkExactActiveClass: 'text-sky-500 font-semibold',
    // },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    css: ['~/assets/css/main.css'],
})
