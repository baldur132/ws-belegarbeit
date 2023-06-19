# Wörterbuch: Web Services (WebEng2 Labor) Belegarbeit
**Teammitglieder:** Baldur Siegel, Jannik Herzner, Jonas Straub

## Projektbeschreibung
Dieses Projekt ist eine Web-Applikation die als npm Package mittels IBM Cloud (PaaS) veröffentlicht wird. Mit dieser Web-Applikation können Nutzer einzelne Worter mit ihrer Bedeutung und andere Informationen aufrufen. 


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


## Usage

### Installation
Die Web-Applikation sowie die Dependencies können mittels [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installiert werden. Falls Node.js und npm installiert sind, kann das Repository mit den folgenden Kommandos die Web-Applikation installiert und gestartet werden.

```sh
git clone https://github.com/baldur132/ws-belegarbeit.git && cd ./ws-belegarbeit

npm install && npm start
```

Hiernach kann die Applikation local bei `http://localhost:3000` abgerufen werden.

### Deployment
Deployment kann über einen beliebigen PaaS Anbieter gemacht werden, jedoch würde dieses Projekt mit IBM Cloud und Cloud Foundry veröffentlicht mittels der IBM Cloud CLI.

#### Prerequisites
 - Erstellen eines IBM Cloud Kontos bei [cloud.ibm.com](https://cloud.ibm.com)
 - Installieren der IBM Cloud CLI ([docs](https://cloud.ibm.com/docs/cli))
 - Login per Kommandozeile mit `ibmcloud login`
 - Installieren der Cloud Foundry IBM plugin mittels `ibmcloud cf install`

#### Targeting
Zunächst muss ein Ziel für die Web Applikation ausgewählt werden. Dies erfolt mit dem folgenden Kommando,

```sh
ibmcloud target --cf-api [endpoint] -o [organisation] -s [space]
```

wo jeweils der `[endpoint]`, `[organisation]`, und `[space]` entsprechend ausgefüllt sind.
Für Projekte die in Deutschland deployed werden kann `https://api.eu-de.cf.cloud.ibm.com` als Endpoint benutzt werden.  

Um eine Organisation bzw. eine Space für die App zu erstellen, können die folgenden Kommandos ausgeführt werden, wo `[organisation]` und `[space]` jeweils die Namen der erwünschten Organisation bzw. Space sind.

```sh
ibmcloud account org-create [organisation] -r eu-de

ibmcloud account space-create -o [organisation] [space]
```

#### Pushing
Hiernach kann die app gepusht werden mit dem folgenden Kommando, wo `[appname]` der Name der App entspricht:

```sh
ibmcloud cf push [appname] -b https://github.com/cloudfoundry/nodejs-buildpack
```

Nach dem Push sollte die App von der ausgegebenen Route öffentlich verfügbar sein.

### npm Kommandos

`npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm start`

For production mode

`npm run test`

Run the test cases.

