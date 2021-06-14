import { BASE_URL } from './baseData';
import { KEY } from './baseData';

export function fetchRandom() { 
 return fetch( `${BASE_URL}events.json?classificationName=music&sort=random&size=20&page=1&apikey=${KEY}`)
    .then(r => r.json())    
    .then(({ _embedded }) => {                
        return  _embedded.events;
        })
    .catch(error => console.log(error));
} 