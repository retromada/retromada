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
            path: '.env.development',
            allowUndefined: true
          }
        ]
      ]
    }
  }
}
