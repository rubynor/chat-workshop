# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Oppgaver

### 1. Leke med chat bot
Backend i ruby on rails
- Endre på chatboten som ligger i `lib/chat/bot.rb` til å respondere på flere meldinger enn de som allerede ligger inne.

### 2. Lag en wikibot
Hvis en bruker skriver `wiki galdhøpiggen` i chat, skal den slå opp galdhøpiggen på wikipedia og hente ut første avsnitt og skrive det som en melding i chat.
- Endre på chatboten som ligger i `lib/chat/bot.rb`

### 3. Ikke gjenta bilde og nickname i chat når samme bruker sender flere meldinger etter hverandre 
Denne chatten mangler litt finesse. I gode chat-applikasjoner som slack og discord, viser man ikke bilde og navn/nickname
for hver eneste melding når en bruker sender flere meldinger etter hverandre.

- Gå inn i filen `app/javascript/components/chat/Chat.js` og se om du klarer å få til denne oppførselen.

Hint: Se i løkken som lister ut alle meldingene. For å vite om du skal ekskludere bilde og nickname, må du huke tak i meldingen fra forrige iterasjon, og se hvem som var avsender.
