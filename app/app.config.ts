export default defineAppConfig({
  // ui: {
  //   primary: 'lime',
  //   gray: ' cool',
  // }

  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
  ui: {
    navigationMenu: {
      variants: {},
    },
    container: {
      base: 'w-1/2 max-w-(--ui-container) mx-auto px-4 sm:px-3 lg:px-4',
    },
  },
})
