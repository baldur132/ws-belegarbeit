const fs = require('fs')
const axios = require('axios')

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        return reply.view('redirect.hbs', {path: '/word/Wörterbuch'})
    })

    fastify.get('/word/*', async function (request, reply) {
        
        // find target word
        let word = decodeURIComponent(request.url.split('/')[2])
        // get word data
        let response = await callWiktionaryAPI(word)
        if (response.code.match(/ERR_.*/)) {
            // axios threw an error
            console.log(response)
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
    const parts = response.split(/\n\s*\n/)
    let word = raw.request.path.split('/')
    word = word[word.length - 1]
    if (word.length < 2) {
        parts.shift()
        parts.shift()
    }
    const head = parts.shift()

    let wordjson = parseHead(head);
    for (let i = 0; i < parts.length; i++) {
        //console.log(parts[i])
        let parsed = parsePart(parts[i], wordjson);
        wordjson = parsed[0]
        if (parsed[1] === "Quellen") {
            break
        }
    }

    return wordjson
}

function parseHead(head) {
    head = head.split("\n")
    let lineA = "", lineB = ""
    for (let i = 0; i < head.length; i++) {
        if (head[i].trim().match(/^.*\s\({{.*\|.*}}\)$/)) {
            lineA = head[i].trim().split(/\s/)
        }
        if (head[i].trim().match(/^{{.*}}/)) {
            lineB = head[i].trim().split(/}}/)
            lineB[0] = `${lineB[0]}}}`
        }
    }
    //console.log(head, lineA, lineB)
    let output = {
        code: 'SUCCESS',
        wort: lineA[0],
        sprache: lineA[1].replace(/\({{.*\|(.*)}}\)/, "$1"),
        wortart: lineB[0].replace(/{{.*\|(.*)\|.*}}/, "$1"),
        genus: resolveGender(lineB[1].replace(',', '').trim()),
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
    switch(sectionTitle) {
        case "Nebenformen":
            let forms = []
            while (lines.length > 0) {
                forms.push(lines.shift())
            }
            wordjson.nebenformen = forms;
            break
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
            break
        case "Beispiele":
            let examples = []
            for (let i = 0; i < lines.length; i++) {
                let id = lines[i].split(/\s/, 1)[0]
                let ex = lines[i].replace(id, '').trim()
                id = id.replace(/\[(.*)\]/, "$1")
                ex = ex.replace(/<.*>.*<\/.*>/g, '')
                if (ex.match(/''/)) {
                    ex = ex.split(/''/)
                    let out = ""
                    for (let j = 0; j < ex.length; j++) {
                        if (j % 2) {
                            // odd
                            if (j + 1 >= ex.length) {
                                out += ex[j]
                            } else {
                                out += `<i>${ex[j]}`
                            }
                        } else {
                            // even
                            out += `</i>${ex[j]}`
                        }
                    }
                    ex = out
                }
                if (ex.match(/{{.*\|.*}}/)) {
                    ex = ex.replace(/{{(.*)\|.*}}/, "$1")
                }
                examples.push(`<b>${id}.</b> ${ex}`)
            }
            wordjson.beispiele = examples
            break
        case "Grammatische Merkmale":
            let grammar = []
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i].replace("*", "")
                line = line.replace(/'''(.*)'''/, '<a href="/word/$1">$1</a>')
                grammar.push(line)
            }
            if (wordjson.wortart.match(/(form|erweit.*)/i)) {
                wordjson.grammatische_merkmale = grammar
            }
            break
        case "Worttrennung":
            wordjson.worttrennung = lines[0]
            break
        case "Alternative Schreibweisen":
            let alternatives = []
            for (let i = 0; i < lines.length; i++) {
                alternatives.push(lines[i].replace(/\d*\-(.*)/, '<a href="/word/$1">$1</a>'))
            }
            wordjson.alternativen = alternatives
            break
        case "Abkürzungen":
            let shorts = []
            for (let i = 0; i < lines.length; i++) {
                shorts.push(lines[i])
            }
            wordjson.kurz = shorts
            break
    }
    return [wordjson, sectionTitle]
}