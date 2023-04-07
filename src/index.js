import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 1300;

// Використовуй публічний API Rest Countries v2, а саме ресурс name.
// Content-Type: application/json

const searchbox = document.querySelector('input#search-box');
searchbox.addEventListener('input', debounce(findCountries, DEBOUNCE_DELAY));

const ulCountryList = document.querySelector('.country-list');
const divCountryInfo = document.querySelector('.country-info');

function findCountries(event) {
  event.preventDefault();
  const countryName = searchbox.value.trim();

  fetchCountries(countryName).then(createAndShowList);
}

function createAndShowList(usersdata) {
  if (usersdata.length > 10) {
    Notiflix.Notify.info(
      `"Too many matches found. Please enter a more specific name."`
    );
  } else if (usersdata.length <= 10 && usersdata.length >= 2) {
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
    const singleDataMarkup = usersdata
      .map(userdata => {
        return `
  <li><h2><img src='${userdata.flags.svg}' height='25px'>${userdata.name.official}</h2>
  <ul>
  <li><b>Capital:</b> ${userdata.capital}</li>
  <li><b>Population:</b> ${userdata.population}</li>
  <li><b>Languages:</b> ${Object.values(userdata.languages)}</li>
  </ul>
  </li>
  `;
      })
      .join(' ');
    ulCountryList.innerHTML = singleDataMarkup;
  }
}

// function createAndShowList(usersdata) {
//   const template = `
//   <li><p><img src='${usersdata[0].flags.svg}' height='25px'>${usersdata[0].name.official}</p>
//   </li>
//   `;
//   ulCountryList.innerHTML = template;
//   console.log(template);
// }
