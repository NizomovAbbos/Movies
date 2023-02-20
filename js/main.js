// Get ELEMENTS DOM
const elMoviesList = document.querySelector(".js-movies-list");
const elMoviesTemplate = document.querySelector(".js-movies-template").content;
const newMoviesFragment = document.createDocumentFragment();
const elSearchForm = document.querySelector(".js-search-form");
const elSearchInput = elSearchForm.querySelector(".js-search-input");

// GET DURATION
function getDuration(_time) {
  const hours = Math.floor(_time / 60);
  const minutes = Math.floor(_time % 60);

  return `${hours} hrs ${minutes} min`;
}

// GET MODAL ELEMENTS FROM DOM
const elModal = document.querySelector(".js-modal");
const elModalTitle = document.querySelector(".js-modal-title");
const elModalIframe = document.querySelector(".js-modal-iframe");
const elModalRating = document.querySelector(".js-modal-rating");
const elModalYear = document.querySelector(".js-modal-year");
const elModalTime = document.querySelector(".js-modal-time");
const elModalCategories = document.querySelector(".js-modal-categories");
const elModalSummary = document.querySelector(".js-modal-summary");
const elModalLink = document.querySelector(".js-modal-link");

// RENDER MODAL FUNCTION
function movieModalInfo(_movie){
    elModalTitle.textContent = _movie.Title;
    elModalIframe.src = `https://www.youtube.com/embed/${_movie.ytid}`;
    elModalRating.textContent = _movie.imdb_rating;
    elModalYear.textContent = _movie.movie_year;
    elModalTime.textContent = getDuration(_movie.runtime);
    elModalCategories.textContent = _movie.Categories.split("|").join(", ");
    elModalSummary.textContent = _movie.summary;
    elModalLink.href = `https://www.imdb.com/title/${_movie.imdb_id}`;
}

// RENDER MOVIES FUNCTION
function renderMovies(_movies) {
  elMoviesList.innerHTML = null;

  _movies.forEach((movie) => {
    const cloneMoviesTemp = elMoviesTemplate.cloneNode(true);
  
    cloneMoviesTemp.querySelector(".js-movies-img").src = `https://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`;
    cloneMoviesTemp.querySelector(".js-movies-img").alt = movie.Title;
    cloneMoviesTemp.querySelector(".js-movies-title").textContent = movie.Title;
    cloneMoviesTemp.querySelector(".js-movies-rating").textContent = movie.imdb_rating;
    cloneMoviesTemp.querySelector(".js-movies-year").textContent = movie.movie_year;
    cloneMoviesTemp.querySelector(".js-movies-time").textContent = getDuration(movie.runtime);
    cloneMoviesTemp.querySelector(".js-movies-categories").textContent =movie.Categories.split("|").join(", ");
    cloneMoviesTemp.querySelector(".js-movies-btn").dataset.id = movie.imdb_id;

    newMoviesFragment.appendChild(cloneMoviesTemp);
  });
  elMoviesList.appendChild(newMoviesFragment);
}

// FIND MODAL EVENTS
elMoviesList.addEventListener("click", function(evt) {
    const btnId = evt.target.dataset.id;
    if(evt.target.matches(".js-movies-btn")){
        const foundMovie = movies.find((item) => item.imdb_id === btnId);
        movieModalInfo(foundMovie);
    }
});

// MODAL IFRAME CLEAR SRC EVENT
elModal.addEventListener("hide.bs.modal", function() {
    elModalIframe.src = null;
});   

// SEARCH FUNCTIONS EVENTS
elSearchForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const inputValue = elSearchInput.value.trim();
    const searchQuery = new RegExp(inputValue, "gi");

    const searchMovies = movies.filter((movie) => String(movie.Title).match(searchQuery));

    if(searchMovies.length > 0){
        renderMovies(searchMovies);
    }else {
        elMoviesList.innerHTML = `<div class="text-white">Not found movie!!!</div>`
    }
});

// CALL RENDER MOVIES FUNCTION
renderMovies(movies.slice(0, 12));