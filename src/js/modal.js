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

    lightboxContent: document.querySelector('.modals'),
    eventsList: document.querySelector('.js-event-list'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModalBtmClick);
refs.lightBoxOverlay.addEventListener('click', onBackdropClick);
const newsApiService = new NewsApiService();

function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
}

function onOpenModal() {
    refs.bodyEl.classList.add('modal-is-open');
    window.addEventListener('keydown', onEsckeyPress);
    toggleModal();

}

function onCloseModalBtmClick() {
    onCloseModal();
};

function onCloseModal() {
    refs.bodyEl.classList.remove('modal-is-open');
    window.removeEventListener('keydown', onEsckeyPress);
    toggleModal();
}

function onBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
        onCloseModal();
    };
};

function onEsckeyPress(evt) {
    if (evt.code === 'Escape') {
        onCloseModal();
    };
};

const r = fetch(`${BASE_URL}events.json ? id =& source= universe & apikey=${KEY}`)
    .then(response => {
        return response.json();
    }).then(ent => {
        console.log(ent);
    });



