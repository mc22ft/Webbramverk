
# Webbramverk 1DV450 mc22ft

## Klientapplikationen [front-end] (klar)

* Här kommer lite instruktioner hur du installerar och kör igång min Angularjs applikation.
* Du laddar ner hela mitt projekt som en zip här på github eller clona ner hela mitt projekt.
* För att köra igång applikationen så kan man göra på flera sätt.
* Jag förklarar lite hur jag har gjort för att komma igång. 
* Jag har en mac dator och laddat hem WebStorm som editor.
* I WebStorm öppnar du projektets mapp/applikation.  

####EDIT run Error!  
Jag fick inte igång det heller när jag laddade ner det från github. Men fick igång det att göra dessa steg nedan...  

* I terminalen i webstorm kör: npm install -g bower  
(Jag var tvungen att köra sudo innan för att komma förbi skriv rättigheter som admin)  

* Kontrollera i webstorm menyn.
* Preferences -> Langugages & Framworks -> Node.js and NPM  
* Att bower och npm finns med. Och att Node.js core är Enabled.  
(Testa att Disable och Enabled det igen. Kan vara det?)  

Hoppas det går bättre.

Länk till förändingar i Ruby API:et finns [här](https://github.com/mc22ft/Webbramverk/blob/master/AngularJSProjects/Client/ChangeOnAPI.md).  
Hur du kör igång Ruby API:et finns nedan i detta dokument det finns även på denna [länk](https://github.com/mc22ft/Webbramverk/tree/master/RubyOnRailsProjects) där också Ruby projektet finns.  

* Användare att logga in med.  
E-Mail: neo@mail.com  
Lösenord: 111111  

* Release [här](https://github.com/mc22ft/Webbramverk/releases/tag/1.2.0)  

####Hör av dig om det skulle vara några problem.


## Webb-API [back-end] (klar)


* Här kommer lite instruktioner hur du installerar och kör igång min Ruby applikation.
* Du laddar ner hela mitt projekt som en zip här på github eller clona ner hela mitt projekt.
* För att köra igång applikationen så kan man göra på flera sätt.
* Jag förklarar lite hur jag har gjort för att komma igång. 
* Jag har en mac dator och laddat hem Rubymine som editor.
* I Rubymine öppnar du projektets mapp/applikation.
* Väll inne i Rubymine så finns ett terminal fönster som du öppnar. 
  1. Skriv: rake db:setup så laddas megrerings filerna.
  2. Skriv: rake db:seed så fyller du på med data i databasen från seeds filen.
  3. Skriv: rails server och navigera till localhost port 3000 i webbläsaren.

* Du kan köra postman filen som ligger i rooten på projektet(Webb-API.json.postman_collection).
* För att localhost:3000/events måste du uppdatera nyckeln i headern själv genom att köra
  http://localhost:3000/creator/login?email=neo@mail.com&password=111111 som finns i postman filen. 
  Då du kommer få ut en nyckle du får sätta manuelt i headern på alla localhost:3000/events routsen.
* Väll inne i postman filen så kan du laborera lite själv. 
* Den mesta av koden ligger i api_controller och events_controllern
 
####Hör av dig om det skulle vara några problem.

####Lycka till!


## Registreringsapplikation (Klar)


* Här kommer lite instruktioner hur du installerar och kör igång min applikation.
* Du laddar ner hela mitt projekt som en zip här på github eller clona ner hela mitt projekt.
* För att köra igång applikationen så kan man göra på flera sätt.
* Jag förklarar lite hur jag har gjort för att komma igång. 
* Jag har en mac dator och laddat hem Rubymine som editor.
* I Rubymine öppnar du projektets mapp/applikation.
* Väll inne i Rubymine så finns ett terminal fönster som du öppnar. 
  1. Skriv: rake db:setup så laddas megrerings filerna.
  2. Skriv: rake db:seed så fyller du på med data i databasen från seeds filen.
  3. Skriv: rails server och navigera till localhost port 3000 i webbläsaren.
* Du kan logga in som admin och som en vanlig användare i applikationen. 
* Här får du inloggningsuppgifter för testning:
 * Som admin. Användarnamn: admin@mail.com Lösenord: qwerty
 * Som användare. Användarnamn: user@mail.com Lösenord: 123456
 
####Lycka till!
