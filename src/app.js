import axios from "axios";

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', countrySearch);

const errorMessage = document.getElementById('error-message');
const countryInfo = document.getElementById('country-info');

function countrySearch(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
fetchCountryInfo(searchInput.value);
searchInput.value = '';
}


async function fetchCountryInfo(name) {
    errorMessage.innerHTML = ``;
    countryInfo.innerHTML = ``;

    const APIURI = `https://restcountries.com/v2/`;
    const APIENDPOINT = `name/${name}`;

    try {
        const result = await axios.get(`${APIURI}${APIENDPOINT}`);
        const country = result.data[0];
        countryInfo.innerHTML = `
        <article class="result-box">
            <span class="flag-name-box">
            <img src="${country.flag}" alt="flag" class="flag">
            <h2>${country.name}</h2>
            </span>
            <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people</p>
            <p>The capital is ${country.capital} ${createCurrencyDescription(country.currencies)}</p>
        </article>
        `

    } catch (e) {
        console.error(e)
        errorMessage.innerHTML = `
      <p class="error-message">${name} bestaat niet. Voer iets anders in!</p>
    `;
    }
}

function createCurrencyDescription(currencies) {
    let output = 'and you can pay with ';

    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    }

    return output + `${currencies[0].name}'s`;
}
