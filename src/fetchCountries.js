import Notiflix from 'notiflix';

export const fetchCountries = function (countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(response.status);
    }
    return response.json();
  });
};
