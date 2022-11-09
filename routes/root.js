'use strict'


let wordjson = {
    "pos": "noun",
    "head_templates": [
        {
            "name": "de-noun",
            "args": {
                "1": "f"
            },
            "expansion": "Pflanze f (genitive Pflanze, plural Pflanzen)"
        }
    ],
    "forms": [
        {
            "form": "Pflanze",
            "tags": [
                "genitive"
            ]
        },
        {
            "form": "Pflanzen",
            "tags": [
                "plural"
            ]
        },
        {
            "form": "",
            "source": "declension",
            "tags": [
                "table-tags"
            ]
        },
        {
            "form": "Pflanze",
            "tags": [
                "nominative",
                "singular"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanzen",
            "tags": [
                "definite",
                "nominative",
                "plural"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanze",
            "tags": [
                "genitive",
                "singular"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanzen",
            "tags": [
                "definite",
                "genitive",
                "plural"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanze",
            "tags": [
                "dative",
                "singular"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanzen",
            "tags": [
                "dative",
                "definite",
                "plural"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanze",
            "tags": [
                "accusative",
                "singular"
            ],
            "source": "declension"
        },
        {
            "form": "Pflanzen",
            "tags": [
                "accusative",
                "definite",
                "plural"
            ],
            "source": "declension"
        }
    ],
    "inflection_templates": [
        {
            "name": "de-ndecl",
            "args": {
                "1": "f"
            }
        }
    ],
    "etymology_text": "From Middle High German [Term?], from Old High German pflanza, borrowed from Latin planta. Cognate with Hunsrik and Luxembourgish Planz. Doublet of Clan.",
    "etymology_templates": [
        {
            "name": "inh",
            "args": {
                "1": "de",
                "2": "gmh",
                "3": ""
            },
            "expansion": "Middle High German [Term?]"
        },
        {
            "name": "inh",
            "args": {
                "1": "de",
                "2": "goh",
                "3": "pflanza"
            },
            "expansion": "Old High German pflanza"
        },
        {
            "name": "der",
            "args": {
                "1": "de",
                "2": "la",
                "3": "planta"
            },
            "expansion": "Latin planta"
        },
        {
            "name": "cog",
            "args": {
                "1": "hrx",
                "2": "-"
            },
            "expansion": "Hunsrik"
        },
        {
            "name": "cog",
            "args": {
                "1": "lb",
                "2": "Planz"
            },
            "expansion": "Luxembourgish Planz"
        },
        {
            "name": "doublet",
            "args": {
                "1": "de",
                "2": "Clan"
            },
            "expansion": "Doublet of Clan"
        }
    ],
    "sounds": [
        {
            "ipa": "/\u02c8pflan(t)s\u0259/"
        },
        {
            "ipa": "[\u02c8pflants\u0259]"
        },
        {
            "ipa": "[\u02c8pflans\u0259]"
        },
        {
            "ipa": "/\u02c8flan(t)s\u0259/"
        },
        {
            "audio": "De-Pflanze.ogg",
            "text": "Audio",
            "ogg_url": "https://upload.wikimedia.org/wikipedia/commons/7/76/De-Pflanze.ogg",
            "mp3_url": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/76/De-Pflanze.ogg/De-Pflanze.ogg.mp3"
        }
    ],
    "word": "Pflanze",
    "lang": "German",
    "lang_code": "de",
    "senses": [
        {
            "raw_glosses": [
                "plant"
            ],
            "examples": [
                {
                    "text": "Der Garten war voll mit vielen verschiedenen Arten von Pflanzen.",
                    "english": "The garden was full of many different kinds of plants.",
                    "type": "example"
                }
            ],
            "tags": [
                "feminine"
            ],
            "glosses": [
                "plant"
            ],
            "id": "Pflanze-de-noun-lgRNlzS2",
            "categories": [
                {
                    "name": "Plants",
                    "kind": "lifeform",
                    "parents": [
                        "Lifeforms",
                        "List of sets",
                        "All sets",
                        "Nature",
                        "Fundamental",
                        "All topics"
                    ],
                    "source": "w",
                    "orig": "de:Plants",
                    "langcode": "de"
                }
            ],
            "derived": [
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Gew\u00fcrzpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Giftpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Heilpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Kulturpflanze"
                },
                {
                    "word": "pflanzenfressend"
                },
                {
                    "tags": [
                        "masculine"
                    ],
                    "word": "Pflanzenfresser"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Topfpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Wasserpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Wildpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Zierpflanze"
                },
                {
                    "tags": [
                        "feminine"
                    ],
                    "word": "Zimmerpflanze"
                }
            ],
            "related": [
                {
                    "tags": [
                        "neuter"
                    ],
                    "word": "Gew\u00e4chs"
                }
            ]
        }
    ]
}

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {


        const data = {
            word: wordjson.word,
            partofspeech: wordjson.pos,
            article: wordjson.senses[0].tags[0]
        }
        return reply.view('root.hbs', data)
    })
}
