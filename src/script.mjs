'use strict';
console.log("Script loaded");

const themeToggleButton = document.getElementById('change-theme');
const showFavoritesButton = document.getElementById('btn-favorites');
const numberOfFavorites = document.getElementById('numberOfFavorites');
const body = document.body;
let favoriteMovies = []; //Array voor favorieten
let movieArray = []; //Array voor de resultaten die op het scherm moeten komen
let counterArray = 0; //counter voor index van elementen op het scherm
loadTheme(); //Thema opgeslagen in de LocalStorage ophalen
loadFavorites(); //Favorieten opgeslagen in de LocalStorage ophalen
numberOfFavorites.textContent = `${favoriteMovies.length}`; //Indicatie aantal favorieten
const form = document.querySelector('form')
const gallery = document.querySelector('.image-container');
const sortButton = document.getElementById('btn-sort');
const sortSelect = document.getElementById('sort');
const limitSelect = document.getElementById('limit');
const searchButton = document.getElementById('search-btn');
startCounter(); //Functie starten die na 10 zoekopdrachten een pop-up toont met reclame om over te schakelen op de premium version van de website

//Button sorteren uitschakelen indien er nog geen zoekopdracht is geweest of er geen resultaten zijn
if(movieArray.length === 0){
    sortButton.disabled = true;
}

//Thema wisselen
function toggleTheme() {
    if (body.classList.contains('light-theme')) {
      body.classList.replace('light-theme', 'dark-theme');
      themeToggleButton.textContent = 'Licht thema';
      localStorage.setItem('theme', 'dark-theme'); //Thema opslaan in LocalStorage
    } else {
      body.classList.replace('dark-theme', 'light-theme');
      themeToggleButton.textContent = 'Donker thema';
      localStorage.setItem('theme', 'light-theme'); //Thema opslaan in LocalStorage
    }
  }

//Event listener voor de Theme button  
themeToggleButton.addEventListener('click', toggleTheme);

//Functie om thema te laden bij het bezoeken van de website
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        if (savedTheme === 'dark-theme') {
        themeToggleButton.textContent = 'Licht thema';
        } else {
        themeToggleButton.textContent = 'Donker thema';
        }
    }
}

//Mutation observer op wijzigen van favorieten (toevoegen/verwijderen)
const mutationObserver = new MutationObserver(mutations => {
    numberOfFavorites.style.transform = 'scale(1.5,1.5)';
    numberOfFavorites.style.background = 'pink';
    setTimeout(function(){numberOfFavorites.style.background = 'rgb(7, 134, 117)'}, 2000);
    setTimeout(function(){numberOfFavorites.style.transform = 'scale(1,1)'}, 2000);
});
  
//Start mutation observer
mutationObserver.observe(numberOfFavorites, {subtree: true, childList: true, characterData: true, characterDataOldValue: true});

//Functie om movie card te maken om de zoekresultaten en favorieten op het scherm te tonen
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    const movieText = document.createElement('div');
    movieText.className = 'movie-text';
    const img = document.createElement('img');
    
    img.src=movie.show.image?.medium;
    const title = movie.show.name;
    const language = movie.show.language;
    const rating = movie.show.rating.average;
    let ratingDisplay = (rating === null)? "Nog niet beoordeeld" : rating;
    
    //De knop om toe te voegen aan favorieten wordt alleen getoond indien de film nog niet in de favorieten zit
    function showAddFavoriteButton() {
        for(let favorite of favoriteMovies){
            if(favorite.show.id === movie.show.id){
                return "noShowButton";
            }    
        }
        return "showButton";
    }

    //De knop om te verwijderen van favorieten wordt alleen getoond indien de film al in de favorieten zit
    function showRemoveFromFavoritesButton() {
        for(let favorite of favoriteMovies){
            if(favorite.show.id === movie.show.id){
                return "showButton";
            }    
        }
        return "noShowButton";
    }

    const visibilityButtonAddFavorites = showAddFavoriteButton();
    const visibilityButtonRemovefavorites = showRemoveFromFavoritesButton();

    movieText.innerHTML = `
    <h3>${title}</h3>
    <p>Taal: ${language}</p>
    <p>Rating: ${ratingDisplay}</p>
    <button class="btn-favorite ${visibilityButtonAddFavorites}" value="${counterArray}" onclick="addToFavorites(${counterArray})"><i class="fa-solid fa-heart-circle-plus"></i></button>
    <button class="btn-remove ${visibilityButtonRemovefavorites}" value="${counterArray}" onclick="removeFromFavorites(${counterArray})"><i class="fa-solid fa-heart-circle-xmark"></i></button>
    `;

    counterArray++; //Index voor element op het scherm
    movieCard.appendChild(img);
    movieCard.appendChild(movieText);
    
    return movieCard;
}

//Functie om films te sorteren
function sortMovies() {
    sortButton.disabled = false;
    const sortOption = sortSelect.value;
    const limit = parseInt(limitSelect.value);
    counterArray = 0;
    
    //Films sorteren op basis van geselecteerde optie
    switch(sortOption) {
        case 'title-ascending':
            movieArray.sort((a, b) => a.show.name.localeCompare(b.show.name));
            break;
        case 'title-descending':
            movieArray.sort((a, b) => b.show.name.localeCompare(a.show.name));
            break;
    }

    movieArray = movieArray.slice(0, limit); //Aantal resultaten limiteren op basis van selectie
    gallery.innerHTML = ''; //Gallery leegmaken

    //Controleren of er films in de Array zitten om weer te geven
    if (movieArray.length === 0) {
        sortButton.disabled = true;
        gallery.innerHTML = '<div class="geen-resultaten">Er werden geen films gevonden. Probeer een nieuwe zoekopdracht.</div>';
        return;
    }

    //Films toevoegen aan gallery
    movieArray.forEach(movie => {
        const movieCard = createMovieCard(movie);
        gallery.appendChild(movieCard);
    });
}

//Event listener voor de Sort Button
sortButton.addEventListener('click', sortMovies);

//Zoekopdracht
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let query = form.querySelector('input').value;
    form.querySelector('input').value=''; //Inputveld terug leegmaken na zoekopdracht
    counterArray = 0; //Index voor element op het scherm resetten

    if(query==''){
        alert("Geen geldige zoekopdracht.");
    }
    searchAPI(query);
})

//Data ophalen uit de API tvmaze
async function searchAPI(query){
fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP fout! Status: ${response.status}`);
        }
        //console.log(response.status);
        return response.json();
    })
    .then(movies => {  
        movieArray = movies; //Films opslaan in Array   
        sortMovies(); //Films sorteren en toevoegen aan gallery
    })
    .catch(error => {
        gallery.innerHTML = `
            <div class="error-melding">
                <p>Er is iets misgegaan bij het ophalen van de films: ${error.message}</p>
                <p>Probeer de pagina te vernieuwen of probeer het later opnieuw.</p>
            </div>
        `;
        console.error('Fetch Error:', error);
    });
}

//Functie die na 10 zoekopdrachten een pop-up toont met reclame om over te schakelen op de premium versie van de website 
function advertisementPremiumVersion() {
    return new Promise(resolve => {
    const handleClick = () => {
        resolve();
        };
        searchButton.addEventListener('click', handleClick);
    });
}
    
//Asynchrone functie die na 10 zoekopdrachten een pop-up toont met reclame om over te schakelen op de premium versie van de website 
async function startCounter() {
    let count = 0;
    while(count === 0){
        while (count < 10) {
            await advertisementPremiumVersion();
            count++;        
            console.log(`${count} zoekopdracht(en) geregistreerd`);
            }
        alert("Schakel nu over op de Premium-versie zonder advertenties!");
        count = 0; //Teller resetten zodat de functie blijft werken
    }
}

//Functie om films toe te voegen aan de favorieten
function addToFavorites(getal){
    //Controle of film al aan de favorieten was toegevoegd 
    for(let movie of favoriteMovies){
        if(movie.show.id === movieArray[getal].show.id){
            alert("Deze film werd al toegevoegd aan de favorieten");
            return;
        }
    }

    favoriteMovies.push(movieArray[getal]); //Toevoegen aan Array
    sortMovies(); //Gallery updaten zodat de juiste buttons verschijnen op de elementen
    numberOfFavorites.textContent = `${favoriteMovies.length}`; //Aantal updaten
    localStorage.setItem('favorites', JSON.stringify(favoriteMovies)); //Favorieten opslaan in Localstorage
}

//Functie om de opgeslagen favorieten te laden bij het bezoeken van de website
function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      favoriteMovies = JSON.parse(savedFavorites);
    }
}

//Functie om de favorieten te bekijken in de gallery
function viewFavorites(){
    gallery.innerHTML = ''; //Gallery leegmaken
    counterArray = 0; //Index voor element op het scherm resetten
    movieArray = favoriteMovies; //Elementen van de Array van favorieten overzetten naar de Array voor de gallery
    sortMovies(); //Films sorteren en toevoegen aan gallery
}

//Event listener voor Favorieten Button
showFavoritesButton.addEventListener('click', viewFavorites);

//Functie om favorieten uit het lijstje te verwijderen
function removeFromFavorites(getal){
    for(let movie of favoriteMovies){
        if(movie.show.id === movieArray[getal].show.id){
            let index = favoriteMovies.indexOf(movie);
            favoriteMovies.splice(index, 1);
            sortMovies(); //Gallery updaten zodat de juiste buttons verschijnen op de elementen
            numberOfFavorites.textContent = `${favoriteMovies.length}`; //Aantal updaten
            localStorage.setItem('favorites', JSON.stringify(favoriteMovies)); //Favorieten opslaan in Localstorage
        }
    }
}