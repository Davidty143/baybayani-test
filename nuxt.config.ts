// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt/icon",
  ],
  icon: {
    serverBundle: {
      collections: ["mdi"], // <!--- this
    },
  },
  supabase: {
    redirect: false,
    // redirectOptions: {
    //   login: "/login",
    //   callback: "/confirm",
    //   include: undefined,
    //   exclude: ["/register"],
    //   cookieRedirect: false,
    // },
  },
});
