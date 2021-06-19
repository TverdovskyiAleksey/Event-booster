import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import countryList from '../tamplates/countryList.hbs';
import NewsApiService from './apiService';
import selectCountry from '/js/selectCountry.js';


const refs = getRefs();
const newsApiService = new NewsApiService();
refs.inputSearchForm.addEventListener('input', debounce(onInput, 2000));
refs.inputCountryForm.addEventListener('click', debounce(onInputCountry, 2000));

refs.dropList.hidden = true;
refs.dropBgColor.hidden = true;
refs.dropList.addEventListener('click', (e) => {
    selectCountry(e, refs.dropList);
    // refs.inputCountryForm.querySelector('.form-control').style.color = 'transparent';
}
);

if (newsApiService.query == 0) {
    randomList();
}

function onInput(e) {
  e.preventDefault();  
  newsApiService.query = e.target.value;  
  newsApiService.resetPage();
  clearContainer();
  fetchHits();  
};

function randomList() {
    newsApiService.fetchRandom().then(events => {
        appendMarkup(events);
    
    });
}

function fetchHits() {    
    newsApiService.fetchArticles().then(events => {
        appendMarkup(events);
    });
}

function appendMarkup(events) { 
    refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));    
}
  
function clearContainer() {
    refs.eventList.innerHTML = '';
}

function onInputCountry(e) {
  e.preventDefault();
  dropListdMarkup();  
};

function dropListdMarkup() {
    refs.dropList.hidden = false;
    refs.dropBgColor.hidden = false;
    refs.dropList.innerHTML = countryList();
}