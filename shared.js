export function loadWords(language) {
    let prefix = "";
    if (window.location.href.indexOf("github.io") > 0) {
        prefix = "/wordflash";
    }
    let result = fetch(`${prefix}/dictionaries/${language}.json`).then((response) => {
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

export function collectResults(results, quizTime) {
    let wrongAnswers = results.filter((x) => x.answer != x.translation);
    let rightAnswers = results.filter((x) => x.answer === x.translation);
    localStorage.setItem("wrong-answers", JSON.stringify(wrongAnswers));
    addQuizTime(quizTime);
    increaseStatistic("wrong-answers-count", wrongAnswers.length);
    increaseStatistic("right-answers-count", rightAnswers.length);
}

function increaseStatistic(key, count) {
    let localStorageCount = localStorage.getItem(key);
    if (localStorageCount) {
        let number = parseInt(localStorageCount);
        number += count;
        localStorage.setItem(key, number);
    } else {
        localStorage.setItem(key, count);
    }
}

export function getStatistic(key) {
    let localStorageStatistic = localStorage.getItem(key);
    if (localStorageStatistic) {
        let statistic = parseInt(localStorageStatistic);
        return statistic;
    } else {
        return 0;
    }
}

function addQuizTime(quizTime) {
    let localStorageTimes = localStorage.getItem("quiz-times");
    if (localStorageTimes) {
        let times = JSON.parse(localStorageTimes);
        times.push(quizTime);
        localStorage.setItem("quiz-times", JSON.stringify(times));
    } else {
        localStorage.setItem("quiz-times", JSON.stringify([quizTime]));
    }
}

export function getAverageQuizTime() {
    let localStorageTimes = localStorage.getItem("quiz-times");
    if (!localStorageTimes) {
        return 0;
    }
    let times = JSON.parse(localStorageTimes);

    let total = times.reduce((sum, time) => {
        return sum + time;
    }, 0);
    return Math.ceil((total / times.length));
}

export function getWrongAnswers() {
    let wrongAnswers = localStorage.getItem("wrong-answers");
    return JSON.parse(wrongAnswers);
}


