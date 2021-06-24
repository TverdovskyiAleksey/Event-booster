import { BASE_URL } from './baseData';
import { KEY } from './baseData';
import onFetchError from './errorFetch';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.totalElements = 980;
    this.eventPageQuantity = 20;

    this.countryCode = '';
  }

   fetchEl(url) {
        return fetch(url)
            .then(r => r.json())
      .then(data => {
        this.totalElements = data.page.totalElements;
        if (!data._embedded) {
          onFetchError();
          return;
        }
        return data._embedded.events;
      }).catch(error => console.log(error));
  }

  fetchEventsById() {
    return fetch(`${BASE_URL}events/${this.searchQuery}.json?&apikey=${KEY}`).then(r => r.json());
  }

  resetPage() {
    this.page = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQwery) {
    this.searchQuery = newQwery;
  }

  setPage(page) {
    this.page = page;
  }
}
