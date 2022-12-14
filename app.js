'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const Handlebars = require('handlebars')

module.exports = async function (fastify, opts) {
    // fastify view is a templating manager for fastify
    fastify.register(require("@fastify/view"), {
        engine: {
            handlebars: require("handlebars")
        },
        root: path.join(__dirname, 'pages'),
        options: {
            /* optinally declare partial templates
            partials: {
                name: "path"
            } */
        }
    })
    // fastify static provides static file serving
    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'public'),
        prefix: '/', // optional: default '/'
    })
    Handlebars.registerHelper('hanging', function(word) {
        if (word.match(/[gjpq]/)) {
            return true
        } else {
            return false
        }
    })

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })
}
