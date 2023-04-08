import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const searchbox = document.querySelector('input#search-box');
const ulCountryList = document.querySelector('.country-list');
const divCountryInfo = document.querySelector('.country-info');
const messageInfo =
  'Too many matches found. Please enter a more specific name.';
const messageFailure = 'Oops, there is no country with that name';

searchbox.addEventListener('input', debounce(findCountries, DEBOUNCE_DELAY));

function findCountries(event) {
  event.preventDefault();
  const countryName = searchbox.value.trim();

  if (!countryName) {
    clearMarkup();
    return;
  }

  fetchCountries(countryName).then(createAndShowList).catch(showError);
}

function createAndShowList(usersdata) {
  if (usersdata.length > 10) {
    clearMarkup();
    showMessage(info, messageInfo);
  } else if (usersdata.length <= 10 && usersdata.length >= 2) {
    clearMarkup();
    dataMarkup(usersdata);
  } else if (usersdata.length === 1) {
    clearMarkup();
    singleDataMarkup(usersdata);
  }
}

function showError(error) {
  showMessage(failure, messageFailure);
  clearMarkup();
}

function clearMarkup() {
  divCountryInfo.innerHTML = '';
  ulCountryList.innerHTML = '';
}

function dataMarkup(usersdata) {
  const dataMarkup = usersdata
    .map(userdata => {
      return `
  <li><p><img src='${userdata.flags.svg}' height='25px'>${userdata.name.official}</p>
  </li>
  `;
    })
    .join(' ');
  ulCountryList.innerHTML = dataMarkup;
}

function singleDataMarkup(usersdata) {
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

function showMessage(type, message) {
  Notiflix.Notify[type](message);
}
