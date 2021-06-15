import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import NewsApiService from './apiService';


const refs = getRefs();
const newsApiService = new NewsApiService();
refs.inputSearchForm.addEventListener('input', debounce(onInput, 2000));


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

