const fs = require('fs')
const axios = require('axios')

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const data = {
            wort: 'Pflanze',
        }
        return reply.view('root.hbs', data)
    })

    fastify.get('/word/*', async function (request, reply) {
        
        // find target word
        let word = decodeURIComponent(request.url.split('/')[2])
        // get word data
        let response = await callWiktionaryAPI(word)
        if (response.code.match(/ERR_.*/)) {
            // axios threw an error
            if (response.response.status === 404) {
                // word page does not exist
                return reply.view('word404.hbs', {word: word})
            } else {
                return {error: 500}
            }
        } else {
            return reply.view('root.hbs', response)
        }
    })
}

function callWiktionaryAPI(word) {
    const endpoint = 'https://de.wiktionary.org/w/rest.php/v1/page/'
    const url = `${endpoint}${word}`

    console.log(`API Request to: ${url}`)
    return axios.get(url)
    .then(function (response) {
        let wordjson = {}
        try {
            wordjson = parseWiktionaryResponse(response)
        } catch (error) {
            console.error(error)
            wordjson = {code: "ERR_PARSING", response: {status: 500}}
        }
        return wordjson
    })
    .catch(function (error) {
        console.error(`Axios Error, code: ${ error.code }, status: ${ error.response.status }`)
        return error
    })
}

function parseWiktionaryResponse(raw) {
    // clean response
    // remove heading labels
    let response = raw.data.source
    response = response.replace(/(==+)/gi, '')
    // replace section header brackets
    response = response.replace(/{{([^\|]+?)}}/g, "$1")
    // remove list delimiters
    response = response.replace(/\n:/g, "\n")
    // remove wiki internal links
    response = response.replace(/\[\[([^\|]+?)\]\]/g, "$1")
    response = response.replace(/\[\[.+?\|{1}(.+?)\]\]/g, "$1")

    // write cleaned response to file
    //fs.writeFile('output.txt', response, e => {})

    // parse individual parts
    const parts = response.split(/\n\n/)
    const head = parts.shift()

    let wordjson = parseHead(head);
    for (let i = 0; i < parts.length; i++) {
        //console.log(parts[i])
        let parsed = parsePart(parts[i], wordjson);
        wordjson = parsed[0]
        if (parsed[1] === "Quellen") {
            break;
        }
    }

    return wordjson
}

function parseHead(head) {
    head = head.split("\n")
    let lineA = "", lineB = ""
    switch (head.length) {
        case 4:
            // see also, word of the week, word, wordtype
            lineA = head[2].trim().split(/\s/)
            lineB = head[3].trim().split(/\s/)
            break;
        case 3:
            lineA = head[1].trim().split(/\s/)
            lineB = head[2].trim().split(/}}/)
            lineB[0] = `${lineB[0]}}}`
            break;
        default:
            lineA = head[0].trim().split(/\s/)
            lineB = head[1].trim().split(/\s/)
    }
    let output = {
        code: 'SUCCESS',
        wort: lineA[0],
        wortart: lineB[0].replace(/{{.*\|(.*)\|.*}}/, "$1").replace(',', ''),
        genus: resolveGender(lineB[1])
    }
    return output
}

function resolveGender(letter) {
    let gender = ""
    switch(letter) {
        case 'm':
            gender = 'maskulin'
            break
        case 'f':
            gender = 'feminin'
            break
        case 'n':
            gender = 'Neutrum'
            break
        case 'u':
            gender = 'Utrum'
            break
    }
    return gender
}

function parsePart(part, wordjson) {
    let lines = part.split("\n")
    let sectionTitle = lines.shift()
    console.log(`Parsing section ${sectionTitle}`)
    switch(sectionTitle) {
        case "Nebenformen":
            let forms = []
            while (lines.length > 0) {
                forms.push(lines.shift())
            }
            wordjson.nebenformen = forms;
            break;
        case "Bedeutungen":
            let defs = []
            while (lines.length > 0) {
                let line = lines.shift()
                let id = line.split(/\s/, 1)
                let def = line.replace(id, '').trim()
                let tags = ''
                if (def.match(/{{.*}}/)) {
                    tags = def.split(/\s/, 1)[0]
                    def = def.replace(tags, '').trim()
                }
                if (tags !== '') {
                    // fix prefixed tags
                    tags = tags.trim().replace(/{{K(\|.*)+}}/, "$1")
                    tags = tags.split("|")
                    tags.shift()
                    console.log(tags)
                }
                if (def.match(/''.+''/)) {
                    // replace italic markers
                    def.split("''")
                    for (let i = 0; i < def.length; i++) {
                        
                    }
                }   
                defs.push(def)
            }
            wordjson.bedeutungen = defs
            break;
    }
    return [wordjson, sectionTitle]
}