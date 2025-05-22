# Projectbeschrijving en functionaliteiten

Deze interactieve single-page webapplicatie maakt gebruik van de API TVMaze. De webapplicatie maakt het mogelijk om via zoektermen een tv-programma op te zoeken in de database van TVMaze, deze items weer te geven op het scherm en de tv-programma's desgewenst op te slaan in de persoonlijke favorieten. De info op het scherm kan gefilterd (aantal) en gesorteerd (A-Z) worden. De favorieten en gebruikersvoorkeuren (thema) blijven bewaard tussen de sessies in. De webapplicatie heeft een gebruiksvriendelijke navigatie met icoontjes en een responsive design.

# Gebruikte API's met links

* [API TVMaze] (https://www.tvmaze.com/api)

# Implementatie van elke technisch vereiste (waar in de code?/lijnnummer)

## DOM manipulatie  
    1) Elementen selecteren: 4-8, 15-20
    2) Elementen manipuleren: aantal favorieten updaten (14), function toggleTheme (29-43), function loadTheme (49-63), mutation observer (66-71), function createMovieCard (77-126), function sortMovies (129-160), inputveld leegmaken (168-169), catch-error (192-200), ... (niet-exhaustieve lijst)
    3) Events aan elementen koppelen: 
        * Event listeners bij buttons 'Zoeken', 'Sorteren', 'Thema', 'Favorieten' (46, 163, 166, 209, 260)
        * Events 'onclick' in html: toevoegen aan en verwijderen van favorieten (117-118)
## Modern JavaScript  
    1) Gebruik van constanten: 4-8, 15-20, ... (niet-exhaustieve lijst)
    2) Template literals:
    * movieCard (114-119)
    * Data ophalen (180, 183, 193-198)
    * console.log tellen van het aantal zoekopdrachten (220)
    * Aantal favorieten (14, 240, 270)
    3) Iteratie over arrays: 92-96, 102-106, 156-159, 230-235, 264-272
    4) Array methodes: 138, 141, 145, 156, 237, 266, 267, 270 (sort, slice, forEach, push, indexOf, splice)
    5) Arrow functions: 66-71, 138, 141, 156-159, 166-176, 181-187, 188-191, 192-200, 205-210, 206-208
    6) Conditional (ternary) operator (moderne if..else): 88
    7) Callback functions: 46, 163, 166, 209, 260
    8) Promises: 204-211
    9) Async & Await: 179-201, 214-225, 
    10) Observer API (1 is voldoende): 66-71
## Data & API
    1) Fetch om data op te halen: 179-201
    2) JSON manipuleren en weergeven: 77-126, 129-160, 179-201, 228-241, 244-249, 263-273
## Opslag & validatie
    1) Formulier validatie: 172-174, 230-235
    2) Gebruik van LocalStorage: 12, 13, 29-43, 49-63, 228-241, 244-249, 263-273
## Styling & layout
    1) Basis HTML layout (flexbox of CSS grid kan hiervoor worden gebruikt): ok
    2) Basis CSS: hover, active, disabled bij buttons en/of afbeeldingen, switchen van licht naar donker thema, responsive design, header die blijft staan, mutation observer op aantal favorieten, ...
    3) Gebruiksvriendelijke elementen (verwijderknoppen, icoontjes,...): icoontjes bij favorieten, thema, zoeken, sorteren, toevoegen aan favorieten, 4) verwijderen uit favorieten
## Tooling & structuur
    1) Project is opgezet met Vite : ok
    2) Een correcte folderstructuur wordt aangehouden (gescheiden html, css en js files, src folder, dist folder, ...): ok

# Installatiehandleiding

## Webapplicatie openen
1) Open de code in VS Code.
2) Voer de volgende code uit in de terminal `npm run preview`. 
3) Klik op de link. De webapplicatie zal zich openen in de browser.

## Overzicht van de functies en screenshots

1) Als gebruiker kan je een zoekopdracht invoeren en op de zoeken-button klikken. Je kan vóór de zoekopdracht al kiezen hoe je wil sorteren en filteren door de juiste opties aan te duiden. Wanneer er een zoekopdracht gebeurt zonder zoekterm, zal er een alert komen.
2) Na de zoekopdracht worden de resultaten op het scherm getoond. Indien er geen resultaten worden gevonden zal er een boodschap in de gallery komen. De resultaten kunnen gesorteerd en gefilterd worden door de juiste opties aan te duiden en te klikken op de sorteren-button. Wanneer er geen resultaten in de gallery zichtbaar zijn, zal de sorteren-button automatisch uitgeschakeld worden.
3) Als gebruiker kan ik nu series toevoegen aan mijn favorieten door op de groene add-button te klikken. Wanneer ik dit doe, zal het aantal favorieten worden geüpdatet. Het icoon linksboven zal hierbij oplichten. De groene add-button verdwijnt nu bij de serie, en wordt vervangen door een rode remove-button.
4) Als gebruiker kan ik eveneens series verwijderen uit mijn favorieten door op de rode remove-button te klikken. Wanneer ik dit doe, zal het aantal favorieten worden geüpdatet. Het icoon linksboven zal hierbij oplichten. De rode remove-button verdwijnt nu weer bij de serie, en wordt vervangen door de groene remove-button.
5) Als gebruiker kan ik mijn lijst met opgeslagen favorieten bekijken. Dit doe ik door op de favorieten-button te klikken. Ook in deze lijst kan ik sorteren en filteren door de juiste opties aan te duiden en te klikken op de sorteren-button. De lijst met favorieten wordt opgeslagen voor de gebruiker, waardoor deze beschikbaar blijft na het verlaten van de website.
6) Ook in het favorieten-scherm kan ik series verwijderen uit de favorieten via de rode remove-button. De serie verdwijnt dan onmiddellijk uit de lijst.
7) Als gebruiker kan ik kiezen voor een donker of licht thema. Mijn voorkeur zal worden opgeslagen, waardoor ik bij een volgende sessie onmiddellijk het eerder gekozen thema zal zien.
8) Telkens na 10 zoekopdrachten krijgt de gebruiker een pop-up advertentie die de gebruiker aanspoort om over te stappen op de (betalende) premium versie van de website zonder advertenties.
9) Wanneer het browservenster resize, zal de website lay-out zich automatisch aanpassen. De website is ook compatibel met kleinere schermen zoals die van een tablet of smartphone.

# Gebruikte bronnen

* Websites:
    * Stack Overflow: <https://stackoverflow.com/questions>
    * W3 Schools: <https://www.w3schools.com/>
    * MDN: <https://developer.mozilla.org/en-US/>
    * Geeks for Geeks: <https://www.geeksforgeeks.org/>
    * Free Code Camp: <https://forum.freecodecamp.org/>
    * README: <https://commonmark.org/help/>
    * GitHub en VS Code: <https://graphite.dev/guides/how-to-push-code-from-vscode-to-github>
* Tutorials (Youtube):
    * <https://www.youtube.com/watch?v=-7mCyBD5ueM&ab_channel=FortuneDevAcademy>
    * <https://www.youtube.com/watch?v=hOeR3LB9NJY&t=207s&ab_channel=Andy%27sTechTutorials>
    * <https://www.youtube.com/watch?time_continue=8&v=6qJeqM3XgdQ&embeds_referring_euri=https%3A%2F%2Fwww.google.be%2Fsearch%3Fsca_esv%3Df32044857049ffb5%26udm%3D7%26sxsrf%3DAHTn8zqSQ0quNh9ZeW-TdL7gpzH3w1s4-w%3A1747578440572%26q%3Dthe%2Bmovie%2Bd&source_ve_path=MzY4NDIsMzY4NDIsMjg2NjY>
    * <https://www.youtube.com/watch?time_continue=226&v=lvdtjhedmgo&embeds_referring_euri=https%3A%2F%2Fwww.google.be%2Fsearch%3Fq%3D(index)%253A1%2BUncaught%2BReferenceError%253A%2Bfunction%2Bis%2Bnot%2Bdefined%2Bat%2BHTMLButtonElement.onclick&source_ve_path=MTM5MTE3LDM2ODQyLDI4NjY2>
    * <https://www.youtube.com/watch?v=Mi4EF9K87aM&t=671s>
    * <https://www.youtube.com/watch?v=nYLUM9r_dvk&ab_channel=Codeburst>
    * <https://www.youtube.com/watch?v=dvdamxFWiMM&ab_channel=FineGap>
* Libraries: 
    * Font Awesome: <https://cdnjs.com/libraries/font-awesome>
    * Font Awesome: <https://fontawesome.com/>
