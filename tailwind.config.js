module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: [],
  theme: {
    extend: {},
    flex: {
      '100': '1 1 100%',
      '100per': '0 0 100%',
      '25per': '1 1 25%'
    }
  },
  variants: {},
  plugins: []
}
