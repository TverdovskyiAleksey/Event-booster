import getRefs from './getRefs';

const refs = getRefs();

refs.openTeamModal.addEventListener('click', openModal);
refs.closeTeamModal.addEventListener('click', closeModal);

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModal();
  }
});
window.addEventListener('click', e => {
  if (e.target === refs.elModal) {
    closeModal();
  }
});

function openModal() {
  refs.elModal.classList.add('active');
  refs.elModal.style.overflow = 'scroll';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  refs.elModal.classList.remove('active');
  document.body.style.overflow = 'inherit';
}