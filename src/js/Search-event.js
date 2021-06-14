import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import NewsApiService from './apiService';
import { fetchRandom } from './apiFetchRandom';

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


function fetchHits() {    
    newsApiService.fetchArticles().then(events => {
        appendMarkup(events);                   
    });
}
function randomList() {
    fetchRandom().then(events => {
        appendMarkup(events);    
    });
}

function appendMarkup(events) { 
    refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));    
}
  
function clearContainer() {
    refs.eventList.innerHTML = '';
}
