import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import countryList from '../tamplates/countryList.hbs';
import NewsApiService from './apiService';
import selectCountry from '/js/selectCountry.js';
import { startPaginationRandom, startPagination, option } from './pagination';

const refs = getRefs();
const newsApiService = new NewsApiService();
refs.inputSearchForm.addEventListener('input', debounce(onInput, 500));
refs.inputCountryForm.addEventListener('click', debounce(onInputCountry, 500));

if (window.innerWidth > 767 && window.innerWidth < 1280) {
  newsApiService.eventPageQuantity += 1;
  option.itemsPerPage += 1;
}

refs.dropList.hidden = true;
refs.dropBgColor.hidden = true;
refs.dropList.addEventListener('click', e => {
  selectCountry(e, refs.dropList);
});

if (newsApiService.query == 0) {
  randomList();
  startPaginationRandom();
}

function onInput(e) {
  e.preventDefault();
  newsApiService.query = e.target.value;
  newsApiService.resetPage();
  clearContainer();

  fetchHits();
  startPagination();
}

function randomList() {
  newsApiService
    .fetchRandom()
    .then(events => {
      appendMarkup(events);
      //   startPaginationRandom();
    })
    .catch(error => console.log(error));
}

function fetchHits() {
  newsApiService
    .fetchArticles()
    .then(events => {
      appendMarkup(events);
      //   startPagination();
    })
    .catch(error => console.log(error));
}

function appendMarkup(events) {
  refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));
}

function clearContainer() {
  refs.eventList.innerHTML = '';
}

export { clearContainer, fetchHits, newsApiService, randomList };

function onInputCountry(e) {
  e.preventDefault();
  dropListdMarkup();
}

function dropListdMarkup() {
  refs.dropList.hidden = false;
  refs.dropBgColor.hidden = false;
  refs.dropList.innerHTML = countryList();
}
