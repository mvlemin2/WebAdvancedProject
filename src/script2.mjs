'use strict';

const themeToggleButton = document.getElementById('change-theme');
//themeToggleButton.addEventListener('mousover', themeToggleButton.backgroundColor ="#333333");
const showFavoritesButton = document.getElementById('btn-favorites');
const body = document.body;
let favoriteMovies = [];
let movieArray = [];
let counterArray = 0;
loadTheme();
loadFavorites();

//Thema wisselen
function toggleTheme() {
    if (body.classList.contains('light-theme')) {
      body.classList.replace('light-theme', 'dark-theme');
      themeToggleButton.textContent = 'Licht thema';
      themeToggleButton.style.backgroundColor = 'lightgrey';
      themeToggleButton.style.Color = 'black';
      localStorage.setItem('theme', 'dark-theme');
    } else {
      body.classList.replace('dark-theme', 'light-theme');
      themeToggleButton.textContent = 'Donker thema';
      localStorage.setItem('theme', 'light-theme');
    }
  }
  
  themeToggleButton.addEventListener('click', toggleTheme);
  
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



//document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded");

    const form = document.querySelector('form')
    const gallery = document.querySelector('.image-container');
    const sortButton = document.getElementById('btn-sort');
    const sortSelect = document.getElementById('sort');
    const limitSelect = document.getElementById('limit');
    // let movieArray = [];
    // let counterArray = 0;
    const searchButton = document.getElementById('search-btn');
    startCounter();

    if(movieArray.length === 0){
        sortButton.disabled = true;
    }

    // Functie om movie card te maken
    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        const movieText = document.createElement('div');
        movieText.className = 'movie-text';

        const img = document.createElement('img');
        img.src=movie.show.image?.medium;
        //img.classList.add('lazy-image');

        const title = movie.show.name;
        const language = movie.show.language;
        const rating = movie.show.rating.average;
        let ratingDisplay = (rating === null)? "Nog niet beoordeeld" : rating;
        
        function showAddFavoriteButton() {
            for(let favorite of favoriteMovies){
                if(favorite.show.id === movie.show.id){
                    return "noShowButton";
                }    
            }
            return "showButton";
        }

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
        <button class="btn-favorite ${visibilityButtonAddFavorites}" value="${counterArray}" onclick="addToFavorites(${counterArray})">+</button>
        <button class="btn-remove ${visibilityButtonRemovefavorites}" value="${counterArray}" onclick="removeFromFavorites(${counterArray})">X</button>
        `;




        counterArray++;
        movieCard.appendChild(img);
        movieCard.appendChild(movieText);
        
        return movieCard;
    }

    // Functie om films te sorteren
    function sortMovies() {
        sortButton.disabled = false;
        const sortOption = sortSelect.value;
        const limit = parseInt(limitSelect.value);
        counterArray = 0;
       
        // Films sorteren op basis van geselecteerde optie
        switch(sortOption) {
            case 'title-ascending':
                movieArray.sort((a, b) => a.show.name.localeCompare(b.show.name));
                break;
            case 'title-descending':
                movieArray.sort((a, b) => b.show.name.localeCompare(a.show.name));
                break;
        }
    
        // Aantal resultaten limiteren op basis van selectie
        movieArray = movieArray.slice(0, limit);
    
        // Gallery leegmaken
        gallery.innerHTML = '';
    
        // Controleren of er films in de Array zitten om weer te geven
        if (movieArray.length === 0) {
            sortButton.disabled = true;
            gallery.innerHTML = '<div class="geen-resultaten">Er werden geen films gevonden. Probeer een nieuwe zoekopdracht.</div>';
            return;
        }
    
        // Films toevoegen aan gallery
        movieArray.forEach(movie => {
            const movieCard = createMovieCard(movie);
            gallery.appendChild(movieCard);
        });
}

// Event listener voor de sortButton
sortButton.addEventListener('click', sortMovies);

//Zoekopdracht
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let query = form.querySelector('input').value;
    form.querySelector('input').value='';
    counterArray = 0;

    if(query==''){
        alert("Geen geldige zoekopdracht.");
    }
    searchAPI(query);
})

//Data ophalen
async function searchAPI(query){
    //const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    //const movies = await response.json();
    //movieArray = movies;
    //console.log(movieArray);

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP fout! Status: ${response.status}`);
            }
            console.log(response.status);
            return response.json();
        })
        .then(movies => {
            // Films opslaan in Array
            movieArray = movies;
            console.log(movieArray);
            // Films sorteren en toevoegen aan gallery
            sortMovies();
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
    
    function advertisementPremiumVersion() {
        return new Promise(resolve => {
        const handleClick = () => {
            //searchButton.removeEventListener('click', handleClick);
            resolve();
            };
            searchButton.addEventListener('click', handleClick);
        });
    }
    
    // Functie: na 10 zoekopdrachten verschijnt er een pop-upadvertentie om over te schakelen op de premium versie van de app
    async function startCounter() {
        let count = 0;
        while(count === 0){
            while (count < 10) {
                await advertisementPremiumVersion();
                count++;        
                console.log(`${count} zoekopdracht(en) geregistreerd`);
                }
            alert("Schakel nu over op de Premium-versie zonder advertenties!");
            count = 0;
        }
    }

//});

function addToFavorites(getal){
      for(let movie of favoriteMovies){
        if(movie.show.id === movieArray[getal].show.id){
            alert("Deze film werd al toegevoegd aan de favorieten");
            return;
        }
    }

    //console.log(movieArray[getal].show.id);

    console.log(`Toegevoegd aan favorieten ${getal}`);
    alert("Toegevoegd aan favorieten");
    favoriteMovies.push(movieArray[getal]);
    console.log(favoriteMovies);
    sortMovies();
    localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
}

function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      favoriteMovies = JSON.parse(savedFavorites);
    }
  }

function viewFavorites(){
    // for(let favorite of favoriteMovies){
    //     createFavoritesCard(favorite);
    //     gallery.appendChild(favoriteCard);
    // }
    //console.log(favoriteMovies);
    gallery.innerHTML = '';
    counterArray = 0;
    movieArray = favoriteMovies;
    sortMovies();
    // favoriteMovies.forEach(movie => {
    //     //console.log(movie);
    //     //const favoriteCard = createFavoritesCard(movie);
    //     //gallery.appendChild(favoriteCard);
    // });
}

// function createFavoritesCard(favorite) {
//     const favoriteCard = document.createElement('div');
//     favoriteCard.className = 'movie-card';
//     const favoriteText = document.createElement('div');
//     favoriteText.className = 'movie-text';

//     const img = document.createElement('img');
//     img.src=favorite.show.image?.medium;
//     //img.classList.add('lazy-image');

//     const title = favorite.show.name;
//     const language = favorite.show.language;
//     const rating = favorite.show.rating.average;
//     let ratingDisplay = (rating === null)? "Nog niet beoordeeld" : rating;

//     favoriteText.innerHTML = `
//     <h3>${title}</h3>
//     <p>Taal: ${language}</p>
//     <p>Rating: ${ratingDisplay}</p>
//     <button class="btn-remove" value="${counterArray}" onclick="removeFromFavorites(${counterArray})">X</button>
//     `;
//     counterArray++;
//     favoriteCard.appendChild(img);
//     favoriteCard.appendChild(favoriteText);
    
//     return favoriteCard;
// }

showFavoritesButton.addEventListener('click', viewFavorites);

//console.log(favoriteMovies);
function removeFromFavorites(getal){
    
  //console.log(movieArray[getal].show.id);

  console.log(`Verwijderd uit favorieten ${getal}`);
  alert("Verwijderd uit favorieten");
  favoriteMovies.splice(getal, 1);
  console.log(favoriteMovies);
  localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
  viewFavorites();
}