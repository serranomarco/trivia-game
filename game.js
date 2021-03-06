import getClueFromAsync from './async-await-version.js';
import getClueFromLoad from './loadGame.js';

window.addEventListener('DOMContentLoaded', () => {

    getLocalStorage();

    newQuestionButton.addEventListener('click', async () => {
        answerContainer.style.display = 'none';
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

    checkResponseButton.addEventListener('click', () => {
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
        answerContainer.style.display = 'block';
        checkResponseButton.disabled = true;
        saveLocalStorage(null)

    });

    newGameButton.addEventListener('click', () => {
        score.innerHTML = 0;
        question.innerHTML = '';
        answer.innerHTML = '';
        value.innerHTML = '';
        categoryTitle.innerHTML = '';
        checkResponseButton.disabled = true;
        answerContainer.style.display = 'none'

    })
});


const newQuestionButton = document.getElementById('new-question-button');
const checkResponseButton = document.getElementById('check-response');
const newGameButton = document.getElementById('new-game');

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const playerResponse = document.getElementById('player-response');
const score = document.getElementById('actual-score');
const scoreDiv = document.getElementById('score');
const answerContainer = document.getElementById('answer-container');

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
        checkResponseButton.disabled = JSON.parse(localStorage.getItem('checkResponseButtonDisabled'));
    }

    if (JSON.parse(localStorage.getItem('checkResponseButtonDisabled'))) {
        answerContainer.style.display = 'block';
    } else {
        answerContainer.style.display = 'none';

    }
}
