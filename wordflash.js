function loadWords(language) {
    return [{
        "word": "amigo",
        "translation": "friend",
        "meaning": "A person you know well and like, and who is not usually a member of your family."
    },
    {
        "word": "hola",
        "translation": "hello",
        "meaning": "A greeting or expression used when meeting someone."
    },
    {
        "word": "gracias",
        "translation": "thank you",
        "meaning": "A polite expression used when acknowledging a gift, service, or compliment."
    },
    {
        "word": "familia",
        "translation": "family",
        "meaning": "A group consisting of parents and their children, or all the descendants of a common ancestor."
    }
    ];
}

function selectWords(words, count) {
    return words;
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
    }, 500);
}

function loadLearningStage() {
    let words = loadWords("es");
    let learningStageWords = selectWords(words, 20);
    flashWords(learningStageWords);
}

loadLearningStage();