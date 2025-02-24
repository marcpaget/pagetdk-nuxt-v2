// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
   // daisyUI config (optional - here are the default values)
  //  daisyui: {
  //   themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  //   darkTheme: 'dark', // name of one of the included themes for dark mode
  //   base: true, // applies background color and foreground color for root element by default
  //   styled: true, // include daisyUI colors and design decisions for all components
  //   utils: true, // adds responsive and modifier utility classes
  //   prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  //   logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  //   themeRoot: ':root', // The element that receives theme color CSS variables
  // },
  // content: [
  //   './components/**/*.{js,vue,ts}',
  //   './layouts/**/*.vue',
  //   './pages/**/*.vue',
  //   './plugins/**/*.{js,ts}',
  //   './nuxt.config.{js,ts}',
  //   './app.vue',
  // ],
    //...
    // theme: {
    //   extend: {
    //     fontFamily: {
    //       sans: ['Nunito Sans', 'sans-serif'],
    //       // header: ['Nunito Sans'],
    //       quicksand: ['Quicksand', 'sans-serif'],
    //       // sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
    //       permanentmarker: ['Permanent Marker', 'cursive'],
    //       mavenpro: ['Maven Pro', 'sans-serif'],
    //       // roboto: ['Roboto', 'sans-serif'],
    //       // raleway: ['Raleway', 'sans-serif'],
    //       // poppins: ['Poppins', 'sans-serif'],
    //       aptos: ['Aptos', 'sans-serif'],
    //       // custom: ['Permanent Marker', 'cursive'],
    //     }
    //     },
    //     colors: {
    //       kaldi: '#ff0000',
    //     },
    //     textColor: {
    //       kaldi: '#ff0000',
    //     },
    //   },
    plugins: [require("@tailwindcss/typography"), require("daisyui"),],
  };
