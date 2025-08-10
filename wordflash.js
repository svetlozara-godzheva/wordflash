const wordsCount = 5;
const selectedLanguage = "es";
const flashInterval = 500;

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
    while (quizQuestions.length != 0) {
        let question = quizQuestions.pop();
        showQuestion(question);
        question.answer = await getAnswer();
        answers.push(question);
    }
    showResults(answers);
    console.log("Quiz started");
}

function createQuestions(words) {
    let questions = [{
        "word": "amigo",
        "suggestions": ["friend", "hello", "thank you", "family"]
    },
    {
        "word": "hola",
        "suggestions": ["hello", "family", "friend", "thank you"]
    }];
    return questions;
}

function showQuestion(question) {
    let card = document.getElementById("card");
    card.innerHTML = `<h2 class="card-title text-center mb-5">${question.word}</h2>
                      <div class="list-group list-group-horizontal text-center">
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[0]}</a>
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[1]}</a>
                      </div>
                      <div class="list-group list-group-horizontal text-center mt-3">
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[2]}</a>
                          <a href="#" class="list-group-item list-group-item-action answer">${question.suggestions[3]}</a>
                      </div>`;
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

function showResults(results) {
    console.log(results);
}

function loadWords(language) {
    let result = fetch(`/dictionaries/${language}.json`).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Failed to get json file.");
        }
    });
    return result;
}

function selectWords(words, count) {
    let selectedWords = [];
    const arr = Array.from({ length: words.length }, (_, i) => i);
    let selectedIndexes = arr.sort(() => Math.random() - 0.5)
        .slice(0, count);
    for (let i = 0; i < selectedIndexes.length; i++) {
        selectedWords.push(words[selectedIndexes[i]]);
    }
    return selectedWords;
}

function showWord(word) {
    let card = document.getElementById("card");
    card.innerHTML = `<h2 class="card-title text-center mb-5">${word.word}</h2>
                      <h4 class="card-title text-center mb-5">${word.translation}</h4>
                      <p class="card-text text-body-secondary">${word.meaning}</p>`;
}

async function flashWords(words) {
    let wordsToFlash = [...words];
    while (wordsToFlash.length > 0) {
        showWord(wordsToFlash.pop());
        await delay(flashInterval);
    }
}

async function delay(interval) {
    let result = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
    return result;
}

loadLearningStage();