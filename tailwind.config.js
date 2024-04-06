// tailwind.config.js
export default {
  // Nuxt 3 automatically handles the content configuration by scanning your components for class names,
  // so you typically don't need to specify the 'content' array in Nuxt 3 projects.

  theme: {
    extend: {
      // Here, you can extend the default theme
      // For example, adding custom colors, spacing, breakpoints, etc.
      colors: {
        'custom-blue': '#007bff', // Example custom color
        // Add more custom colors or extend other theme properties as needed
      },
      // Extend other theme properties like fontSize, spacing, etc. here
    },
  },

  plugins: [
    require('daisyui'), // Include DaisyUI plugin for Tailwind CSS
  ],

  // DaisyUI theme customization (optional)
  daisyui: {
    themes: [
      'light', // Use predefined themes
      'dark',
      // Or define your custom theme
      {
        mytheme: {                          // custom theme name
          "primary": "#570df8",             // primary color
          "primary-focus": "#4506cb",       // primary color - focused
          "primary-content": "#ffffff",     // primary color - text
          // Other colors...
        },
      },
    ],
  },
}
