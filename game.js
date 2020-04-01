import getClueFromCallback from './callback-version.js';
import getClueFromPromise from './promse-version.js';
import getClueFromAsync from './async-await-version.js';
import getClueFromLoad from './loadGame.js';

window.addEventListener('DOMContentLoaded', event => {

    getLocalStorage();

    callbackButton.addEventListener('click', event => {
        answer.style.display = 'none';
        checkResponseButton.disabled = false;
        getClueFromCallback(function (error, clue) {
            console.log(clue);
            if (error !== null) {
                console.error(`Error: ${error}`);
            }

            question.innerHTML = clue.question;
            answer.innerHTML = clue.answer;
            value.innerHTML = clue.value;
            categoryTitle.innerHTML = clue.category.title;
            saveLocalStorage(clue)
        });
    });
    promiseButton.addEventListener('click', event => {
        answer.style.display = 'none';
        checkResponseButton.disabled = false;
        getClueFromPromise()
            .then(clue => {

                if (invalidCount > 0 && clue[invalidCount] === undefined) {
                    invalidCount.innerHTML = 'invalid'
                } else {
                    invalidCount.innerHTML = 'valid';
                }
                question.innerHTML = clue.question;
                answer.innerHTML = clue.answer;
                value.innerHTML = clue.value;
                categoryTitle.innerHTML = clue.category.title;
                saveLocalStorage(clue)
            });
    });

    asyncButton.addEventListener('click', async event => {
        answer.style.display = 'none';
        checkResponseButton.disabled = false;
        try {
            const clue = await getClueFromAsync()
            question.innerHTML = clue.question;
            answer.innerHTML = clue.answer;
            value.innerHTML = clue.value;
            categoryTitle.innerHTML = clue.category.title;
            saveLocalStorage(clue)
        } catch (error) {
            console.error(error);
        }

    });

    checkResponseButton.addEventListener('click', event => {
        if (answer.innerHTML.toLowerCase() === playerResponse.value.toLowerCase()) {
            score.innerHTML = Number(score.innerHTML) + Number(value.innerHTML);
            scoreDiv.classList.add('correctAnswer');
            setTimeout(() => {
                scoreDiv.classList.remove('correctAnswer');
            }, 1000)
        } else {
            score.innerHTML = Number(score.innerHTML) - Number(value.innerHTML);
            scoreDiv.classList.add('wrongAnswer');
            setTimeout(() => {
                scoreDiv.classList.remove('wrongAnswer');
            }, 1000)
        }
        playerResponse.value = '';
        answer.style.display = 'block';
        checkResponseButton.disabled = true;
        saveLocalStorage(null)

    });

});


const callbackButton = document.getElementById('use-callback');
const promiseButton = document.getElementById('use-promise');
const asyncButton = document.getElementById('use-async-await');
const checkResponseButton = document.getElementById('check-response');

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const invalidCount = document.getElementById('invalid-count')
const playerResponse = document.getElementById('player-response');
const score = document.getElementById('actual-score');
const scoreDiv = document.getElementById('score');

function saveLocalStorage(clue) {

    localStorage.setItem('isActive', 'active');
    localStorage.setItem('jeopardyGameScore', JSON.stringify(score.innerHTML));
    localStorage.setItem('checkResponseButtonDisabled', JSON.stringify(checkResponseButton.disabled));
    if (clue !== null) {
        localStorage.setItem('clueObjectId', clue.id)
    }
}

function getLocalStorage() {

    if (localStorage.getItem('isActive') !== null) {
        score.innerHTML = JSON.parse(localStorage.getItem('jeopardyGameScore'));
        getClueFromLoad()
            .then(clue => {
                question.innerHTML = clue.question;
                answer.innerHTML = clue.answer;
                value.innerHTML = clue.value;
                categoryTitle.innerHTML = clue.category.title;
            });
        checkResponseButton.disabled = JSON.parse(localStorage.getItem('checkResponseButtonDisabled'))
    }

    if (JSON.parse(localStorage.getItem('checkResponseButtonDisabled'))) {
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';

    }
}
