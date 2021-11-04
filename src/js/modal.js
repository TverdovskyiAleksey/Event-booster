import cardTmpl from '../tamplates/cardTpl';
import { eventSettings } from './eventSettings';
import getRefs from './getRefs';
import { clearContainer, fetchHits, newsApiService, randomList } from './searchEvent';

const refs = getRefs();
refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModalBtmClick);
refs.lightBoxOverlay.addEventListener('click', onBackdropClick);
refs.moreBtn.addEventListener('click', onShowTheRestOfTheArtistEvents);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden');
}

function onOpenModal(e) {
  const li = e.target.closest('li');
  if (!li) return;
  newsApiService.query = li.dataset.eventid;
  if (e.target.classList.contains('icon-place') || e.target.classList.contains('place') || e.target.classList.contains('place-icon')) { return; };
  refs.bodyTheme.classList.add('modal-is-open');
  window.addEventListener('keydown', onEsckeyPress);
  toggleModal();

  newsApiService.fetchEventsById().then(e => renderMurkupCard(e));
}

window.addEventListener('click', onBtnMore);
function onBtnMore(e) {
  const clickBtnMore = e.target;

  if (clickBtnMore.classList.contains('btn-more')) {
    newsApiService.query = e.target.dataset.name;
    onCloseModal();
    clearContainer();
    fetchHits();
    newsApiService.query = '';
  }
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
  if (e.currentTarget === e.target) {
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

function onShowTheRestOfTheArtistEvents() {
  onCloseModal();
}
