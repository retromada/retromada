module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    'transform-inline-environment-variables',
    [
      'module-resolver',
      {
        // root: './core/**',
        alias: {
          '@structures': './core/structures',
          '@database': './core/database',
          '@http': './core/http',
          '@utils': './core/utils'
        }
      }
    ]
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
