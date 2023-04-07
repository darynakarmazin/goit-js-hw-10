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

function createAndShowList(userdata) {
  if (userdata.length > 10) {
    Notiflix.Notify.info(
      `"Too many matches found. Please enter a more specific name."`
    );
  }
  // console.log(userdata[0]);
  // const template = `
  // <li><p><img src='${userdata[0].flags.svg}' height='25px'>${userdata[0].name.official}</p>
  // </li>
  // `;
  // ulCountryList.innerHTML = template;
  // console.log(template);
}

//   createPromise(position, delays)
//     .then(({ position, delay }) => {
//       Notiflix.Notify.success(
//         `✅ Fulfilled promise ${position} in ${delay}ms`
//       );
//     })
//     .catch(({ position, delay }) => {
//       Notiflix.Notify.failure(
//         `❌ Rejected promise ${position} in ${delay}ms`
//       );
//     });
// }
