# Wörterbuch: Web Services (WebEng2 Labor) Belegarbeit
**Teammitglieder:** Baldur Siegel, Jannik Herzner, Jonas Straub

## Projektbeschreibung
Dieses Projekt ist eine Web-Applikation die als npm Package mittels IBM Cloud (PaaS) veröffentlicht wird. Mit dieser Web-Applikation können Nutzer einzelne Worter mit ihrer Bedeutung und andere Informationen aufrufen. 

---

## Projektaufbau
Hier werden die Dependencies sowie die backend Struktur erläutert.

### Dependencies
 - node.js ^18.12.0
 - npm ^8.19.2
 - fastify
    - fastify-plugin
    - fastify-cli
    - fastify-sensible
    - fastify-autoload
    - fastify-view
    - fastify-static
 - handlebars

### Backend Struktur
Cloud Foundry mittels IBM Cloud wird als PaaS für eine Node.js instance verwendet. Die Wiktionary API wird aufgerufen bei einem Wortzugriff um die jeweiligen Daten zu holen.

---

## Usage

### Installation
Die Web-Applikation sowie die Dependencies können mittels [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installiert werden. Falls Node.js und npm installiert sind, kann das Repository mit den folgenden Kommandos die Web-Applikation installiert und gestartet werden.

```
# git clone https://github.com/baldur132/ws-belegarbeit.git

# cd ./ws-belegarbeit

# npm install

# npm start
```

Hiernach kann die Applikation local bei `http://localhost:3000` abgerufen werden.

### Deployment

### npm Kommandos

#### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm start`

For production mode

#### `npm run test`

Run the test cases.
