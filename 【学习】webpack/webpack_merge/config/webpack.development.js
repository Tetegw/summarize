const { smart } = require('webpack-merge')

const webpack = require('webpack')
const baseConfig = require('./webpack.base.js')

module.exports = smart(baseConfig, {
    
})