module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    'transform-inline-environment-variables'
  ],
  env: {
    production: {
      plugins: [
        [
          'dotenv-import',
          {
            moduleName: '@env',
            allowUndefined: true
          }
        ]
      ]
    },
    development: {
      plugins: [
        [
          'dotenv-import',
          {
            moduleName: '@env',
            path: '.env.development',
            allowUndefined: true
          }
        ]
      ]
    }
  }
}
