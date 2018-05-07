module.exports = function (env, argv) {
    return argv.mode === 'production' ?
        require('./config/webpack.production.js') :
        require('./config/webpack.development.js')
}