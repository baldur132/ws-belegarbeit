'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const axios = require('axios')
const fs = require('fs')

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


        // call wiktionary api
        const endpoint = 'https://de.wiktionary.org/w/rest.php/v1/page/'
        const word = 'Katze'
        const url = `${endpoint}${word}`

        console.log(url, typeof(url))
        axios.get(url)
        .then(function (response) {
            let pagestring = response.data.source
            // remove heading labels
            pagestring = pagestring.replace(/(==+)/gi, '')
            // replace section header brackets
            pagestring = pagestring.replace(/{{([^\|]+?)}}/g, "$1")
            // remove list delimiters
            pagestring = pagestring.replace(/\n:/g, "\n")
            // remove wiki internal links
            pagestring = pagestring.replace(/\[\[([^\|]+?)\]\]/g, "$1")
            pagestring = pagestring.replace(/\[\[.+?\|{1}(.+?)\]\]/g, "$1")
            const parts = pagestring.split(/\n\n/)
            fs.writeFile('output.txt', pagestring, function (err) {
                if (err) return console.log(err);
            })
        })
        .catch(function (error) {
            console.log(error)
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
