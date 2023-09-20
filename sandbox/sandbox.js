const personalPlanPeter = {
    name: "Peter",
    age: "29",
    skills: {
        languages: ['ru', 'eng'],
        programmingLangs: {
            js: '20%',
            php: '10%'
        },
        exp: '1 month'
    },
    showAgeAndLangs: function(plan) {
        const {age, skills: {languages}} = plan;
        let lang = languages.join(' ')
        let str = `Мне ${age} и я владею языками: ${lang}`;
        // languages.forEach(function(lang) {
        //     str += `${lang.toUpperCase()} `;
        // });

        return str;
    }
};

function showExperience(plan) {
    const {skills: {exp}} = plan;
    return `${exp}`
}

function showProgrammingLangs(plan) {
    const {skills: {programmingLangs}} = plan;
    let str = '';
    for (let key in programmingLangs) {
        str += `Язык ${key} изучен на ${programmingLangs[key]}\n`
    }
    console.log(str);
};

showProgrammingLangs(personalPlanPeter);

const favoriteCities = ['liSBon', 'ROME', 'miLan', 'Dublin'];

function standardizeStrings(arr) {
    let list = '';
    arr.forEach((city, i) => {
        list += `${i} | ${city.toLowerCase()}\n`
    })
    return list;
};

console.log(standardizeStrings(favoriteCities));

const someString = 'This is some strange string';

function reverse(str) {
 return str.split('').reverse().join('');
};

console.log(reverse(someString));

const baseCurrencies = ['USD', 'EUR'];
const additionalCurrencies = ['UAH', 'RUB', 'CNY'];
const currency = [... new Set([...baseCurrencies, ...additionalCurrencies])];

function availableCurr(arr, missingCurr) {
    if(arr.length > 0) {
        //const result = arr.filter((curr) => curr !== missingCurr);
        let text = 'Доступные валюты:\n';
        arr.forEach((curr) => {
            if(curr !== missingCurr) {
                text += `${curr}\n`;
            }
        });
        return text;
    } else {
        return 'Нет доступных валют';
    }
}

console.log(availableCurr(currency, 'CNY'));