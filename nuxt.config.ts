// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-free/css/all.css'],
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
})
