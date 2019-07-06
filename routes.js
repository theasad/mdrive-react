const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes()
    .add('home', '/', 'index')
    .add('folder', '/folders/:slug', 'index');