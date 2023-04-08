import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

// Використовуй публічний API Rest Countries v2, а саме ресурс name.
// Content-Type: application/json

const searchbox = document.querySelector('input#search-box');
searchbox.addEventListener('input', debounce(findCountries, DEBOUNCE_DELAY));

const ulCountryList = document.querySelector('.country-list');
const divCountryInfo = document.querySelector('.country-info');

function findCountries(event) {
  event.preventDefault();
  const countryName = searchbox.value.trim();

  if (!countryName) {
    divCountryInfo.innerHTML = '';
    ulCountryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName).then(createAndShowList).catch(showError);
}

function createAndShowList(usersdata) {
  if (usersdata.length > 10) {
    divCountryInfo.innerHTML = '';
    ulCountryList.innerHTML = '';
    Notiflix.Notify.info(
      `"Too many matches found. Please enter a more specific name."`
    );
  } else if (usersdata.length <= 10 && usersdata.length >= 2) {
    divCountryInfo.innerHTML = '';
    const dataMarkup = usersdata
      .map(userdata => {
        return `
  <li><p><img src='${userdata.flags.svg}' height='25px'>${userdata.name.official}</p>
  </li>
  `;
      })
      .join(' ');
    ulCountryList.innerHTML = dataMarkup;
  } else if (usersdata.length === 1) {
    ulCountryList.innerHTML = '';
    const singleDataMarkup = usersdata
      .map(userdata => {
        return `
  <h2><img src='${userdata.flags.svg}' height='25px'>${
          userdata.name.official
        }</h2>
  <ul>
  <li><b>Capital:</b> ${userdata.capital}</li>
  <li><b>Population:</b> ${userdata.population}</li>
  <li><b>Languages:</b> ${Object.values(userdata.languages)}</li>
  </ul>
  `;
      })
      .join(' ');
    divCountryInfo.innerHTML = singleDataMarkup;
  }
}

function showError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  divCountryInfo.innerHTML = '';
  ulCountryList.innerHTML = '';
}
