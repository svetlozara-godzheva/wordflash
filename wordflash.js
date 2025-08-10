const wordsCount = 5;
const selectedLanguage = "es";
const flashInterval = 500;

function loadLearningStage() {
    loadWords(selectedLanguage).then((words) => {
        let learningStageWords = selectWords(words, wordsCount);
        flashWords(learningStageWords);
    });
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

function flashWords(words) {
    showWord(words.pop());
    setTimeout(() => {
        flashWords(words);
    }, flashInterval);
}

loadLearningStage();