'use strict';
// buttons
const addMovieModal = document.getElementById('add-modal');
const delMovieModal = document.getElementById('delete-modal');
const cancelDelMovieModal = delMovieModal.querySelector('.btn--passive');
const confirmDelMovieModal = delMovieModal.querySelector('.btn--danger');

const AddMovieButton = document.querySelector('header button');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

const backdrop = document.getElementById('backdrop');

const userInputs = addMovieModal.querySelectorAll('input');

const movieListInformation = document.getElementById('movie-list');

const entryTextSection = document.getElementById('entry-text');

let movies = [];

const showDelMovieModal = () => {
    delMovieModal.classList.add('visible');
};

const hideDelMovieModal = () => {
    delMovieModal.classList.remove('visible');
};

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
    for (const inputs of userInputs) {
        inputs.value = '';
    }
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

    newMovieElement.addEventListener('click', () => {
        deleteElement(id);

        
        // showDelMovieModal();
        // confirmDelMovieModal.addEventListener('click', () => {
        //     hideDelMovieModal();
        // });
    });

    movieListInformation.append(newMovieElement);
};

const toggleMovieInfo = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'none';
    } else {
        entryTextSection.style.display = 'block';
    }
};

const showFomr4InsertInfo = () => {
    backdrop.classList.add('visible');
    addMovieModal.classList.add('visible');
};

const hideFomr4InsertInfo = () => {
    backdrop.classList.remove('visible');
    addMovieModal.classList.remove('visible');
};

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

AddMovieButton.addEventListener('click', () => {
    cleanFomr4InsertInfo();
    showFomr4InsertInfo();
});

backdrop.addEventListener('click', () => {
    hideFomr4InsertInfo();
});

cancelAddMovieButton.addEventListener('click', () => {
    hideFomr4InsertInfo();
});

confirmAddMovieButton.addEventListener('click', () => {
    if (addMovieToDb()) {
        toggleMovieInfo();
        hideFomr4InsertInfo();
        renderNewMovieELement(movies[movies.length - 1]); // arg -> nuevo elemento creado
    }
});
