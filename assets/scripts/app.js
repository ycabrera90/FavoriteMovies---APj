'use strict';

// console.log('thissOk')

// // buttons

// const delMovieModal = document.getElementById('delete-modal');
// const cancelDelMovieModal = delMovieModal.querySelector('.btn--passive');

// const AddMovieButton = document.querySelector('header button');

//
// const userInputs = addMovieModal.querySelectorAll('input');

// const entryTextSection = document.getElementById('entry-text');

// ////////////////////////////

// const showDelMovieModal = () => {
//     delMovieModal.classList.add('visible');
// };

// const hideDelMovieModal = () => {
//     delMovieModal.classList.remove('visible');
// };

// const deleteElement = (id) => {
//     let indexMovie = 0;
//     for (const movie of movies) {
//         if (movie.id === id) {
//             break;
//         }
//         indexMovie += 1;
//     }
//     movies.splice(indexMovie, 1);
//     movieListInformation.children[indexMovie].remove();
// };

//

// ///////////////////////////////////////////////////////////

// cancelDelMovieModal.addEventListener('click', () => {
//     hideDelMovieModal();
// });

// AddMovieButton.addEventListener('click', () => {
//     cleanFomr4InsertInfo();
//     showFomr4InsertInfo();
// });

// confirmAddMovieButton.addEventListener('click', () => {
//     if (addMovieToDb()) {
//         toggleMovieInfo();
//         hideFomr4InsertInfo();
//         renderNewMovieELement(movies[movies.length - 1]); // arg -> nuevo elemento creado
//     }
// });

// Class definitions ///////////////////////////////////////////////
class Main {
    addMovieButton = document.getElementById('addMovie--botton');
}
class ModalInsertMovData {
    backDropDOM = document.getElementById('backdrop');
    addModalDOM = document.getElementById('add-modal');
    confirmAddMovieButton = document.getElementById('btn--confirmMovie');
    cancelAddMovieButton = document.getElementById('btn--cancelMovie');

    cleanUserInput() {
        const userInputsDOM = this.addModalDOM.querySelectorAll('input');
        for (const inputs of userInputsDOM) {
            inputs.value = '';
        }
    }
    show() {
        this.backDropDOM.classList.add('visible');
        this.addModalDOM.classList.add('visible');
    }

    hide() {
        this.backDropDOM.classList.remove('visible');
        //
        this.addModalDOM.classList.remove('visible');
    }

    get userInput() {
        let newMovie = {};
        const userInputsDOM = this.addModalDOM.querySelectorAll('input');
        const titleValue = userInputsDOM[0].value;
        const imageUrlValue = userInputsDOM[1].value;
        const ratingValue = userInputsDOM[2].value;

        if (
            titleValue.trim() === '' ||
            imageUrlValue === '' ||
            ratingValue < 1 ||
            ratingValue > 5
        ) {
            alert('Please enter valid values (rating beteen 1 and 5).');
            return false; // para que no repita el proceso de mostrar el alert en cada evaluacion
        } else {
            newMovie = {
                id: Math.random().toString(),
                title: titleValue,
                imageUrl: imageUrlValue,
                rating: ratingValue,
            };
            // movies.push(newMovie);
            // return true;
        }
        return newMovie;
    }
}

class MovieList {
    elements = [];
    addMovieInfo(newElement) {
        const { id, title, imageUrl, rating } = newElement;
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
        document.getElementById('movie-list').append(newMovieElement);

        // newMovieElement.addEventListener('click', () => {
        //     showDelMovieModal();
        //     // Hago un clone del boton para no ejecutar por error antiguos listening
        //     let confirmDelMovieModal =
        //         delMovieModal.querySelector('.btn--danger');
        //     confirmDelMovieModal.replaceWith(
        //         confirmDelMovieModal.cloneNode(true)
        //     );
        //     // almacenos nuevamente el objeto creado y le creo un listener para este momento en particular
        //     confirmDelMovieModal = delMovieModal.querySelector('.btn--danger');
        //     confirmDelMovieModal.addEventListener('click', () => {
        //         hideDelMovieModal();
        //         deleteElement(id);
        //     });
        return [newMovieElement, id];
    }

    delItem(id) {
        let indexRow = 0;
        this.elements.forEach((element, index) => {
            if (element.id === id) {
                indexRow = index;
            }
        });

        this.elements.splice(indexRow, 1);
        document
            .getElementById('movie-list')
            .querySelectorAll('li')
            [indexRow].remove();
    }
}

class InfoList {
    entryTextSection = document.getElementById('entry-text');
    show() {
        this.entryTextSection.style.display = 'block';
    }
    hide() {
        this.entryTextSection.style.display = 'none';
    }
}

// class declarations  ///////////////////////////////////////////////
let main = new Main();
let infoList = new InfoList();
let modalInsertMovData = new ModalInsertMovData();
let movieList = new MovieList();

// Events listener  ///////////////////////////////////////////////
main.addMovieButton.addEventListener('click', () => {
    modalInsertMovData.cleanUserInput();
    modalInsertMovData.show();
});

modalInsertMovData.backDropDOM.addEventListener('click', () => {
    modalInsertMovData.hide();
});

modalInsertMovData.cancelAddMovieButton.addEventListener('click', () => {
    modalInsertMovData.hide();
});

modalInsertMovData.confirmAddMovieButton.addEventListener('click', () => {
    const userInputs = modalInsertMovData.userInput;

    if (userInputs) {
        // movies.push(userInputs);
        movieList.elements.push(userInputs);
        modalInsertMovData.hide();
        const [movieListElement, id] = movieList.addMovieInfo(userInputs);
        infoList.hide();

        movieListElement.addEventListener('click', () => {
            movieList.delItem(id);

            if (movieList.elements.length === 0) {
                infoList.show();
            }
        });
    }
});

// aditional code ///////////////////////////////////////////////

if (movieList.elements.length === 0) {
    infoList.show();
}
