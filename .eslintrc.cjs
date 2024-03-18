module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    "import/no-extraneous-dependencies": 0,
    "no-alert": 0,
    camelcase: 0,
    "no-console": 0,
    "no-unused-vars": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-restricted-exports": 0,
    "react/no-children-prop": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/no-array-index-key": 0,
    "no-promise-executor-return": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-shadow": 0,
    "react/function-component-definition": 0,
    "@typescript-eslint/naming-convention": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "consistent-return": 0,
    "import/no-cycle": 0,
    "react/prop-types": 0,
    "import/export": 0,
    "react/jsx-no-constructed-context-values": 0,
    "react-hooks/exhaustive-deps": 0,
    "import/no-named-as-default": 0,
    radix: "warn",
    eqeqeq: "warn",
    "no-plusplus": "warn",
    "no-nested-ternary": "warn",
    "jsx-a11y/tabindex-no-positive": "warn",
    "react/no-unused-prop-types": 0,
    "react/no-unescaped-entities": "warn",
    "react/button-has-type": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/label-has-associated-control": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "react/jsx-no-useless-fragment": [
      1,
      {
        allowExpressions: true,
      },
    ],
    "prefer-destructuring": [
      1,
      {
        object: true,
        array: true,
      },
    ],
    "react/no-unstable-nested-components": [
      1,
      {
        allowAsProps: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        args: "none",
      },
    ],
    "react/jsx-no-duplicate-props": [
      1,
      {
        ignoreCase: false,
      },
    ],
  },
};
