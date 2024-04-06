export default defineNuxtConfig({
  devtools: { enabled: true },

  // Nuxt 3 doesn't require routeRules for prerendering; it's smart about static generation.
  // You can remove this unless you have specific custom prerendering needs.

  nitro: {
    debug: true, // Enable debug mode for Nitro server (useful for development)
  },

  css: ['~/assets/css/main.css'], // Ensure this CSS file imports Tailwind CSS directives

  build: {
    postcss: {
      postcssOptions: {
        // Instead of requiring an external config, specify plugins directly
        plugins: {
          tailwindcss: {}, // Path to your tailwind.config.js file
          autoprefixer: {}, // Automatically add vendor prefixes to CSS
          // You can add more PostCSS plugins here if needed.
        },
      },
    },
  },

  // If you're using any Nuxt modules, like content or i18n, configure them here
  modules: [
    // '@nuxt/content',
    // '@nuxtjs/i18n',
  ],

  // Module configuration
  // content: {}, // If you're using @nuxt/content
  // i18n: {}, // If you're using @nuxtjs/i18n

  // DaisyUI and other Tailwind CSS plugins do not need to be configured here.
  // They are configured in the tailwind.config.js file.
});