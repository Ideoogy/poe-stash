module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          'modules':false,
          'targets': {
            'browsers': [
              '> 1%',
              'last 2 versions',
              'not ie <= 8'
            ]
          }
        }
      ],
      "@babel/preset-react"
    ],   
    plugins: [
      [
        '@babel/plugin-proposal-class-properties',
        {
          'legacy': true
        }
      ]
	]  
  }
}