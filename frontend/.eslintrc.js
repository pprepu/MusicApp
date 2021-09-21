module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jest": true,
        "node": true,
        "cypress/globals": true
    },
    "extends": [
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "import", "react", "jest", "cypress"
    ],
    "root": true, 
    "rules": {
        "indent": [
            "error",
            2
          ],
        "quotes": [
            "error",
            "single"
          ],
        "semi": [
            "error",
            "never"
          ],
        "object-curly-spacing": [
            "error", "always"
          ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
          ],
        "no-trailing-spaces": "error"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}