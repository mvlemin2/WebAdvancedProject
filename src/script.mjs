'use strict';
console.log("Script loaded");

const form = document.querySelector('form')
const gallery = document.querySelector('.image-container');
let movieArray = [];
const sortButton = document.getElementById('btn-sort');
const sortSelect = document.getElementById('sort');
const limitSelect = document.getElementById('limit');
const themeToggleButton = document.getElementById('change-theme');
const body = document.body;
loadTheme();

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

//Zoekopdracht
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let query = form.querySelector('input').value;
    form.querySelector('input').value='';
    
    if(query==''){
        alert("Geen geldige zoekopdracht.");
    }
    searchAPI(query);
})

async function searchAPI(query){
    // const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    // const movies = await response.json();
    // displayGallery(movies);
    ////movieArray = movies;
    ////console.log(movieArray);

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP fout! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(movies => {
            // Sla alle films op voor hergebruik
            movieArray = movies;
            console.log(movieArray);
            displayGallery(movies);
            // Pas de filters toe en toon de films
            //filterAndSortMovies();
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

sortButton.addEventListener('click', () => {
    movieArray.sort((a, b) => a.rating.localeCompare(b.rating));
})

function displayGallery(movies) {
    gallery.innerHTML = '';
    for(let movie of movies){
        if(movie.show.image){   
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            const movieText = document.createElement('div');
            movieText.className = 'movie-text';
            
            const img = document.createElement('img');
            img.src=movie.show.image.medium;
            //img.classList.add('lazy-image');

            const title = movie.show.name;
            const language = movie.show.language;
            //const genres[] = movie.show.genres;
            const rating = movie.show.rating.average;
            let ratingDisplay = (rating === null)? "Nog niet beoordeeld" : rating;

            movieText.innerHTML = `
            <h3>${title}</h3>
            <p>Taal: ${language}</p>
            <p>Rating: ${ratingDisplay}</p>
            `;

            movieCard.appendChild(img);
            movieCard.appendChild(movieText);
            gallery.append(movieCard);
        }
    }
}




  