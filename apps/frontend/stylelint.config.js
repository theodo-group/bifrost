module.exports = {
  plugins: ['stylelint-declaration-strict-value'],
  processors: [],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    // Giving false positives with styled-components
    'value-keyword-case': null,

    /*
     * These rules are here to prevent CSS bad practices.
     * Most of the time they introduce tech debt, checkout the links above each rule for more info.
     * When some of these rules are not relevant (there are rare edge cases), you can
     * // stylelint-disable-next-line
     * Check with a member of the CSS guild if you have any doubt
     */
    // https://github.com/theodo/theodo-code-principles/blob/master/css.md#no-important
    'declaration-no-important': true,
    // https://github.com/theodo/theodo-code-principles/blob/master/css.md#no-id-in-selectors
    'selector-max-id': 0,
    // https://github.com/theodo/theodo-code-principles/blob/master/css.md#no-more-than-two-classes-in-selectors
    'selector-max-class': 2,
    // https://github.com/theodo/theodo-code-principles/blob/master/css.md#no-html-tags-in-selectors
    'selector-max-type': 0,
    // https://github.com/theodo/theodo-code-principles/blob/master/css.md#no-hardcoded-values
    'scale-unlimited/declaration-strict-value': [
      [
        'font-size',
        'line-height',
        'z-index',
        'color',
        'background-color',
        'border-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'fill',
      ],
      {
        ignoreKeywords: [
          'transparent',
          'inherit',
          'initial',
          'unset',
          'none',
          'currentColor',
        ],
      },
    ],
  },
};
