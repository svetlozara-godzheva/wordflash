import { delay, loadWords, selectWords, collectResults } from "./shared.js";

const wordsCount = 5;
const selectedLanguage = "es";
const flashInterval = 100;
const wordAnimationDelay = 500;
const questionAnimationDelay = 100;

function loadLearningStage() {
    loadWords(selectedLanguage).then((words) => {
        let learningStageWords = selectWords(words, wordsCount);
        flashWords(learningStageWords).then(() => {
            startQuiz(learningStageWords);
        });
    });
}

async function startQuiz(words) {
    let quizQuestions = createQuestions(words);
    let answers = [];
    let counter = 0;
    while (quizQuestions.length != 0) {
        counter++;
        let question = quizQuestions.pop();
        await showQuestion(question);
        showCounter(counter, words.length);
        question.answer = await getAnswer();
        answers.push(question);
    }
    collectResults(answers);
    await showResults(answers);

    //start again flash cards + quiz
    flashWords(words).then(() => {
        startQuiz(words);
    });
    console.log("Quiz started");
}

function createQuestions(words) {
    let questions = [];
    for (const word of words) {
        let question = {
            word: word.word,
            translation: word.translation,
            suggestions: createSuggestions(word, words)
        };
        questions.push(question);
    }
    return questions;
}
function createSuggestions(word, words) {

    let wordsPool = words.filter((x) => x.word != word.word);
    let randomWords = selectWords(wordsPool, 3);
    let result = []
    for (const randomWord of randomWords) {
        result.push(randomWord.translation);
    }
    result.push(word.translation);
    return result.sort(() => Math.random() - 0.5);
}

async function showQuestion(question) {
    let card = document.getElementById("card");
    let cardParent = document.getElementById("card-container");
    cardParent.classList.add("hidden");
    await delay(questionAnimationDelay);
    card.innerHTML = `<h2 class="card-title text-center mb-5">${question.word}</h2>
                      <div class="list-group list-group-horizontal text-center">
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[0]}</a>
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[1]}</a>
                      </div>
                      <div class="list-group list-group-horizontal text-center mt-3">
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[2]}</a>
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[3]}</a>
                      </div>`;

    cardParent.classList.remove("hidden");
}

async function getAnswer() {
    let result = new Promise((resolve) => {
        let answers = document.getElementsByClassName("answer");
        for (const answer of answers) {
            answer.addEventListener("click", () => {
                resolve(answer.innerHTML);
            });
        }
    });
    return result;
}

function hideCounter() {
    let progressCounter = document.getElementById("progress-counter");
    progressCounter.classList.add("invisible");
}
function showCounter(leftNumber, rightNumber) {
    let progressCounter = document.getElementById("progress-counter");
    progressCounter.classList.remove("invisible");
    console.log(leftNumber, rightNumber);
    progressCounter.innerHTML = `${leftNumber} / ${rightNumber}`;
}

async function showResults(results) {
    let correctAnswers = results.filter((element) => {
        return element.translation === element.answer;
    });
    let card = document.getElementById("card");
    card.innerHTML = `<h2 class="card-title text-center mb-5">Your Score: ${correctAnswers.length} / ${results.length}</h2>
                            <div class="list-group text-center">
                                <a href="#" class="list-group-item list-group-item-action mb-3" id="try-again">Try Again</a>
                                <a href="/" class="list-group-item list-group-item-action">See Your Results</a>
                            </div>`;

    hideCounter();
    let tryAgainClicked = new Promise((resolve) => {
        let tryAgain = document.getElementById("try-again");
        tryAgain.addEventListener("click", () => {
            resolve();
        });

    });
    return tryAgainClicked;
}

async function showWord(word) {
    let card = document.getElementById("card");
    let cardParent = document.getElementById("card-container");
    cardParent.classList.add("hidden");
    await delay(wordAnimationDelay);
    card.innerHTML = `<h2 class="card-title text-center mb-5">${word.word}</h2>
                      <h4 class="card-title text-center mb-5">${word.translation}</h4>
                      <p class="card-text text-body-secondary">${word.meaning}</p>`;

    cardParent.classList.remove("hidden");
}

async function flashWords(words) {
    let wordsToFlash = [...words];
    let counter = 0;
    while (wordsToFlash.length > 0) {
        counter++;
        await showWord(wordsToFlash.pop());
        showCounter(counter, words.length);
        // to read the card
        await delay(flashInterval);
    }
}

loadLearningStage();