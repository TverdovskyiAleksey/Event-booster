import cardTmpl from '../tamplates/cardTpl';
import NewsApiService from './apiService';
import { eventSettings } from './eventSettings';
import getRefs from './getRefs';

const refs = getRefs();

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModalBtmClick);
refs.lightBoxOverlay.addEventListener('click', onBackdropClick);
const newsApiService = new NewsApiService();

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

function onOpenModal(e) {
  const li = e.target.closest('li');
  if (!li) return;
  newsApiService.query = li.dataset.eventid;
  refs.bodyTheme.classList.add('modal-is-open');
  window.addEventListener('keydown', onEsckeyPress);
  toggleModal();

   newsApiService
    .fetchEventsById()
    .then(e => renderMurkupCard(e));
}

function onCloseModalBtmClick() {
  onCloseModal();
}

function onCloseModal() {
  refs.bodyTheme.classList.remove('modal-is-open');
  window.removeEventListener('keydown', onEsckeyPress);
  toggleModal();
  refs.cardMurkup.innerHTML = '';
}

function onBackdropClick(e) {
  if (e.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onEsckeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function renderMurkupCard(e) {
  const markup = cardTmpl(eventSettings(e));
  refs.cardMurkup.innerHTML = markup;
}
