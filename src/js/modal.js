import debounce from 'lodash.debounce';
import cardTmpl from '../tamplates/cardTpl';
import NewsApiService from './apiService';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const KEY = 'w2rp7JjXdCoAjtGRKPPDY9cIXNULMVug';

const refs = {
  openModalBtn: document.querySelector('.list'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  lightBoxOverlay: document.querySelector('.backdrop'),
  bodyEl: document.querySelector('body'),

  cardMurkup: document.querySelector('.modal-form'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModalBtmClick);
refs.lightBoxOverlay.addEventListener('click', onBackdropClick);
const newsApiService = new NewsApiService();

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

let eventid;
function onOpenModal(e) {
  const li = e.target.closest('li');
  if (li.nodeName !== 'LI') return;
  eventid = li.dataset.eventid;
  refs.bodyEl.classList.add('modal-is-open');
  window.addEventListener('keydown', onEsckeyPress);
  toggleModal();

  fetchEventsById()
    .then(renderMurkupCard)
    .catch(error => {
      console.log(error);
    });
}

function onCloseModalBtmClick() {
  onCloseModal();
}

function onCloseModal() {
  refs.bodyEl.classList.remove('modal-is-open');
  window.removeEventListener('keydown', onEsckeyPress);
  toggleModal();
  refs.cardMurkup.innerHTML = '';
}

function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onEsckeyPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}

function fetchEventsById() {
  //   return fetch(`${BASE_URL}events.json?id=${eventid}&apikey=${KEY}`).then(response => {
  return fetch(`${BASE_URL}events/${eventid}.json?&apikey=${KEY}`).then(response => {
    return response.json();
  });
}

function renderMurkupCard(ent) {
  const markup = cardTmpl(ent);
  //   console.log(markup);
  refs.cardMurkup.innerHTML = markup;
}
