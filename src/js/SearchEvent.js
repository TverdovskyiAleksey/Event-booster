import debounce from 'lodash.debounce';
import getRefs from './getRefs';
import eventTLP from '../tamplates/list.hbs';
import countryList from '../tamplates/countryList.hbs';
import NewsApiService from './apiService';
import countries from '/js/countries';
import { startPaginationRandom, startPagination, option } from './pagination';
import onSwitchChange from './switchTogle';
import { eventSettings } from './eventSettings';

import { BASE_URL } from './baseData';
import { KEY } from './baseData';

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
  randomList();
  startPagination(randomList);
}

function onInput(e) {
  e.preventDefault();
  newsApiService.query = e.target.value;
  newsApiService.resetPage();
  clearContainer();

  fetchHits();
  startPagination(fetchHits);
}

function apiServiceFetch(url) {
  newsApiService
    .fetchEl(url)
    .then(events => {
      appendMarkup(events);
    })
    .catch(error => console.log(error));
}

function randomList() {
  apiServiceFetch(
    `${BASE_URL}events.json?classificationName=music&sort=random&size=${newsApiService.eventPageQuantity}&page=${newsApiService.page}&apikey=${KEY}`,
  );
}
function fetchHits() {
  apiServiceFetch(
    `${BASE_URL}events.json?keyword=${newsApiService.searchQuery}&countryCode=${newsApiService.countryCode}&size=${newsApiService.eventPageQuantity}&page=${newsApiService.page}&apikey=${KEY}`,
  );
}

function appendMarkup(events) {
  refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events.map(eventSettings)));
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
    clearContainer();
    fetchHits();
  }
}
