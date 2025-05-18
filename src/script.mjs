'use strict';
console.log("Script loaded");

const form = document.querySelector('form')
const gallery = document.querySelector('.image-container');

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
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const movies = await response.json();
    displayGallery(movies);
}

function displayGallery(movies) {
    gallery.innerHTML = '';
    for(let movie of movies){
        if(movie.show.image){   
            const img = document.createElement('img');
            img.src=movie.show.image.medium;
            //img.classList.add('lazy-image');
            gallery.append(img);
        }
    }
}


//Thema wisselen
const themeToggleButton = document.getElementById('change-theme');
const body = document.body;

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

  loadTheme();