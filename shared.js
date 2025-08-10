export function loadWords(language) {
    let result = fetch(`/dictionaries/${language}.json`).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Failed to get json file.");
        }
    });
    return result;
}

export function selectWords(words, count) {
    let selectedWords = [];
    const arr = Array.from({ length: words.length }, (_, i) => i);
    let selectedIndexes = arr.sort(() => Math.random() - 0.5)
        .slice(0, count);
    for (let i = 0; i < selectedIndexes.length; i++) {
        selectedWords.push(words[selectedIndexes[i]]);
    }
    return selectedWords;
}

export async function delay(interval) {
    let result = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
    return result;
}

export function collectResults(results) {
    let wrongAnswers = results.filter((x) => x.answer != x.translation);
    let rightAnswers = results.filter((x) => x.answer === x.translation);
    localStorage.setItem("wrong-answers", JSON.stringify(wrongAnswers));
}

export function getWrongAnswers() {
    let wrongAnswers = localStorage.getItem("wrong-answers");
    return JSON.parse(wrongAnswers);
}
