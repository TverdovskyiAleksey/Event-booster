import { BASE_URL } from './baseData';
import { KEY } from './baseData';

export default class NewApiService{
    constructor() {        
        this.searchQuery = '';
        this.page = 1;
    }       
    
    fetchArticles() {              
    return fetch(`${BASE_URL}events.json?&keyword=${this.searchQuery}&apikey=${KEY}`)
            .then(r => r.json())
            .then(({ _embedded }) => {
                // this.page += 1;
                return  _embedded.events;
            })
            .catch(error => console.log(error));
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
}

