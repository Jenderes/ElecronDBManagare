module.exports = {
  "env": {
      "jquery": true,
      "node": true,
      "browser": true
  },
  "extends": [
      "airbnb",
      "plugin:node/recommended"
  ],
  "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": 6
  },
"parser": "babel-eslint",
    "rules":{
    "linebreak-style": 0
  },
"globals": {
    "localStorage": true,
    "fetch": true
}
}