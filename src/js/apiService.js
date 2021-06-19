import { BASE_URL } from './baseData';
import { KEY } from './baseData';


export default class NewApiService{
    constructor() {        
        this.searchQuery = '';
        this.page = 1;
        this.totalElements = 980;
        this.eventPageQuantity = 20;

    }       
    
    fetchArticles() {              
        return fetch(`${BASE_URL}events.json?keyword=${this.searchQuery}&size=${this.eventPageQuantity}&page=${this.page}&apikey=${KEY}`)
            .then(r => r.json())
      .then(data => {
        this.totalElements = data.page.totalElements;
        return data._embedded.events;
      })
            .catch(error => console.log(error));
    }

    fetchRandom() {       
        return fetch(`${BASE_URL}events.json?classificationName=music&sort=random&size=${this.eventPageQuantity}&page=${this.page}&apikey=${KEY}`,
    )
      .then(r => r.json())
      .then(data => {
        this.totalElements = data.page.totalElements;
        return data._embedded.events;
      })
            .catch(error => console.log(error));
  }


    fetchByCountries() {
    return fetch(`${BASE_URL}events.json?countryCode=${this.searchQuery}&apikey=${KEY}`)
            .then(r => r.json())
            .then(({ _embedded }) => {
                return  _embedded.events;
            })
            .catch(error => error);
    }
    
    resetPage() {
        this.page = 1;
    }           
    
    get  query() {
    return this.searchQuery;    
    }

    set  query(newQwery) {
     this.searchQuery=newQwery;    
    }
    
    setPage(page) {
    this.page = page;
  }

}

