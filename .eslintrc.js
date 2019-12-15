module.exports = {
   "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true
   },
   "extends": "eslint:recommended",
   "parserOptions": {
      "ecmaFeatures": {
         "experimentalObjectRestSpread": true,
         "jsx": true
      },
      "sourceType": "module"
   },
   "plugins": [
      "react"
   ],
   "parser": "babel-eslint",
   "globals": {
      "React": true,
      "_": true
   },
   "rules": {
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-no-undef": "error",
      "spaced-comment": [
         "warn",
         "always",
         {
            "block": {
               "balanced": true
            }
         }
      ],
      "no-trailing-spaces": [
         "warn",
         {
            "ignoreComments": true
         }
      ],
      "space-infix-ops": "error",
      "dot-notation": [
         "warn"
      ],
      "indent": [
         "error",
         4
      ],
      "space-in-parens": [
         "warn",
         "never"
      ],
      "comma-spacing": [
         "warn",
         {
            "after": true,
            "before": false
         }
      ],
      "comma-dangle": [
         "error",
         {
            "arrays": "always",
            "objects": "always",
            "imports": "always",
            "exports": "always",
            "functions": "ignore"
         }
      ],
      "key-spacing": [
         "warn",
         {
            "afterColon": true,
            "beforeColon": false
         }
      ],
      "switch-colon-spacing": [
         "warn",
         {
            "after": true,
            "before": false
         }
      ],
      "space-before-blocks": [
         "warn",
         "never"
      ],
      "keyword-spacing": [
         "warn",
         {
            "overrides": {
               "if": {
                  "before": false,
                  "after": false
               },
               "for": {
                  "before": false,
                  "after": false
               },
               "else": {
                  "before": false,
                  "after": false
               },
               "from": {
                  "before": true,
                  "after": true
               },
               "import": {
                  "after": true
               }
            }
         }
      ],
      "consistent-this": [
         "warn",
         "me"
      ],
      "quote-props": [
         "warn",
         "as-needed",
         {
            "keywords": true
         }
      ],
      "linebreak-style": [
         "error",
         "unix"
      ],
      "quotes": [
         "error",
         "single"
      ],
      "semi": [
         "error",
         "always"
      ]
   }
};
