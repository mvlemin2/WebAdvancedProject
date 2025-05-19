Functionele vereisten 
---------------------

Dataverzameling & -weergave:  
    Haal data op van de API (API endpoint met minstens 20 op te halen objecten): ok
    Toon de data op een visueel aantrekkelijke manier: lijst/tabel (+ kaart of andere visuele weergave naargelang API): ok
    Zorg voor duidelijke details van de getoonde items (de lijstweergave toont minstens 6 kolommen): ok
Interactiviteit:  
   Filter functionaliteit (op type, locatie, datum, etc.): ok
   Zoekfunctie: ok
   Sorteermogelijkheden: ok
Personalisatie:  
    Gebruikers kunnen favoriete locaties/gebeurtenissen opslaan ok
    Data wordt bewaard tussen sessies ok
    Gebruikersvoorkeuren opslaan (we hebben tijdens de lessen aantal voorbeelden gezien zoals geolocatie, taalkeuze, themaswitcher, favorieten, gecachte API-data, ...): ok
Gebruikerservaring:  
    Responsive design: ok
    Visueel aantrekkelijke interface: ok
    Gebruiksvriendelijke navigatie: ok 

Technische vereisten
--------------------
Jullie project moet ALLE onderstaande JavaScript-concepten demonstreren. Per onderdeel moeten jullie in de README documenteren waar en hoe je deze concepten hebt toegepast: 

DOM manipulatie:  
    Elementen selecteren: op verschillende plaatsen, maar een voorbeeld is bij het wisselen van thema (themeButton, body)
    Elementen manipuleren: het wisselen van thema (wijzigen van achtergrondkleur en tekstkleur themeButton, body)
    Events aan elementen koppelen: bij het wisselen van thema (bij het klikken op de themeButton)
Modern JavaScript:  
    Gebruik van constanten: het wisselen van thema (const themeButton, const body)
    Template literals: bij movieCard
   > Iteratie over arrays => bij toevoegen aan favo's?
   > Array methodes => bij toevoegen aan favo's?
    Arrow functions: bij de zoekopdracht
   Conditional (ternary) operator (moderne if..else): bij het bepalen van rating
   Callback functions: vb) Event listener voor de sortButton
   Promises: fetchen van data (data ophalen)
   Async & Await: => 10 opzoekingen en dan vraag om over te schakelen op premium versie? (advertisementPremiumVersion)
   > Observer API (1 is voldoende)
Data & API:  
    Fetch om data op te halen: bij de searchAPI functie
    JSON manipuleren en weergeven: combinatie van de functies searchAPI en displayGallery
Opslag & validatie:  
    Formulier validatie: validatie en alert bij zoekopdracht
    Gebruik van LocalStorage: bij het veranderen van thema 
Styling & layout:  
    Basis HTML layout (flexbox of CSS grid kan hiervoor worden gebruikt): ok
    Basis CSS: ok
   > Gebruiksvriendelijke elementen (verwijderknoppen, icoontjes,...)
Tooling & structuur: 
    Project is opgezet met Vite : ok
    Een correcte folderstructuur wordt aangehouden (gescheiden html, css en js files, src folder, dist folder, ...): ok