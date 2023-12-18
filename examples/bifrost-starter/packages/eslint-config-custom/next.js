module.exports = {
  plugins: ['jsx-a11y', 'risxss'],
  extends: ['next/core-web-vitals', './base', 'plugin:jsx-a11y/strict'],
  rules: {
    // Specific NextJS accessibility config
    // Not necessary with NextJS links
    'jsx-a11y/anchor-is-valid': 'off',
    // Add alt attributes to NextJS Images
    'jsx-a11y/alt-text': [
      2,
      {
        img: ['Image'],
      },
    ],
    'risxss/catch-potential-xss-react': 'error',
    'react/no-string-refs': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
      },
      extends: ['./base'],
      rules: {
        'react-hooks/exhaustive-deps': 'error',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              SFC: 'Use `const MyComponent = (props: Props): JSX.Element` instead',
              'React.SFC':
                'Use `const MyComponent = (props: Props): JSX.Element` instead',
            },
            extendDefaults: true,
          },
        ],
      },
    },
  ],
};
