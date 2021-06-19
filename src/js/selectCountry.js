import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import NewsApiService from './apiService';

const refs = getRefs();
const newsApiService = new NewsApiService();

export default function selectCountry(e, list) {
  if (e.target.nodeName === 'LI') {
    newsApiService.query = e.target.dataset.value;
    refs.inputCountryForm.querySelector('input').placeholder = e.target.textContent;
    list.innerHTML = '';
    list.hidden = true;
    refs.dropBgColor.hidden = true;
    fetchHits();
  }
}

function fetchHits() {
  newsApiService.fetchByCountries()
    .then(events => {
      if (!events) {
        return
      }
      clearContainer();
    appendMarkup(events);
    })
}

function appendMarkup(events) { 
  refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));
}

function clearContainer() {
    refs.eventList.innerHTML = '';
}