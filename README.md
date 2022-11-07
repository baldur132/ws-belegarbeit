# Wörterbuch: Web Services (WebEng2 Labor) Belegarbeit
**Teammitglieder:** Baldur Siegel, Jannik Herzner, Jonas Straub

## Projektbeschreibung
Dieses Projekt ist eine Web-Applikation die als NPM Package mittels IBM Cloud (PaaS) veröffentlicht wird. Mit dieser Web-Applikation können Nutzer einzelne Worter mit ihrer Bedeutung und andere Informationen aufrufen. 

## Projektaufbau
Hier werden die Dependencies sowie die backend Struktur erläutert.

### Dependencies
 - Node.js
 - Fastify

### Backend Struktur
Cloud Foundry mittels IBM Cloud wird als PaaS für eine Node.js instance verwendet. Zusätzlich wird IBM Cloudant als DBaaS verwendet um die wesendlichen Daten für die jeweiligen Wörter zu speichern und an clients zu serven.

## Usage

### Installation



## NPM Kommandos

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
