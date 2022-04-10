'use strict';
const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieListInformation = document.getElementById('movie-list');

let movies = [];

const deleteElement = (id) => {
    let indexMovie = 0;
    for (const movie of movies) {
        if (movie.id === id) {
            break;
        }
        indexMovie += 1;
    }
    movies.splice(indexMovie, 1);
    movieListInformation.children[indexMovie].remove();
};

const cleanFomr4InsertInfo = () => {
    userInputs[0].value = '';
    userInputs[1].value = '';
    userInputs[2].value = '';
};

const renderNewMovieELement = (newElement) => {
    const id = newElement.id;
    const title = newElement.title;
    const imageUrl = newElement.imageUrl;
    const rating = newElement.rating;

    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p> The rating is ${rating}/5</p>
    </div>`;
    newMovieElement.addEventListener('click', deleteElement.bind(null, id));
    movieListInformation.append(newMovieElement);
};

const toggleMovieInfo = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'none';
    } else {
        entryTextSection.style.display = 'block';
    }
};

const toggleFomr4InsertInfo = () => {
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
};

// const clearMovieInputs = () => {
//     for (inputs of userInputs) {
//         inputs.value = '';
//     }
// };

const addMovieToDb = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if (
        titleValue.trim() === '' ||
        imageUrlValue === '' ||
        ratingValue < 1 ||
        ratingValue > 5
    ) {
        alert('Please enter valid values (rating beteen 1 and 5).');
        return false;
    } else {
        const newMovie = {
            id: Math.random().toString(),
            title: titleValue,
            imageUrl: imageUrlValue,
            rating: ratingValue,
        };
        movies.push(newMovie);
        return true;
    }
};

startAddMovieButton.addEventListener('click', () => {
    cleanFomr4InsertInfo();
    toggleFomr4InsertInfo();
});

backdrop.addEventListener('click', () => {
    toggleFomr4InsertInfo();
});

cancelAddMovieButton.addEventListener('click', () => {
    toggleFomr4InsertInfo();
});

confirmAddMovieButton.addEventListener('click', () => {
    if (addMovieToDb()) {
        toggleMovieInfo();
        toggleFomr4InsertInfo();
        renderNewMovieELement(movies[movies.length - 1]); // arg -> nuevo elemento creado
    }
});
