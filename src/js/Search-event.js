import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import countryList from '../tamplates/countryList.hbs';
import NewsApiService from './apiService';
// import selectCountry from '/js/selectCountry';
import countries from '/js/countries';
import { startPaginationRandom, startPagination, option } from './pagination';
import onSwitchChange from './switchTogle';

const refs = getRefs();
const newsApiService = new NewsApiService();
refs.switchTogle.addEventListener('change', onSwitchChange);
refs.inputSearchForm.addEventListener('input', debounce(onInput, 500));
refs.dropList.addEventListener('click', e => selectCountry(e));

if (window.innerWidth > 767 && window.innerWidth < 1280) {
  newsApiService.eventPageQuantity += 1;
  option.itemsPerPage += 1;
}

if (!newsApiService.query & !newsApiService.countryCode) {
  // if (newsApiService.query == 0) {
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
      clearContainer();
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

dropdown(refs.selectCountryBtn);

refs.countryListDouble.innerHTML = countryList({ countries });

function dropdown(element) {
  element.addEventListener('click', function () {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
      refs.countryListDouble.addEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    } else {
      refs.countryListDouble.removeEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    }
  });
}

function closeTargetElm(target, element) {
  if (target !== element) {
    element.classList.remove('active');
    target
      .closest('ul')
      .querySelectorAll('li')
      .forEach(el => el.classList.remove('current'));
    target.classList.add('current');
    element.innerText = target.innerText;
  }
}

function selectCountry(e) {
  if (e.target.nodeName === 'LI') {
    newsApiService.countryCode = e.target.dataset.countryCode;

    // console.log(newsApiService.countryCode);
    fetchHits();
  }
}
