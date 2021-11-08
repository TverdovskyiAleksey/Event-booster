import getRefs from './getRefs';

const refs = getRefs();

refs.openLogin.addEventListener('click', onOpenRegistration);

function onOpenRegistration(e) {
  if (e.target.closest('svg').classList.value === 'home-icon visually-hidden') {
    return;
  }
  refs.regBackdrop.classList.remove('visually-hidden');
  refs.regBackdrop.addEventListener('click', onCloseBackdropReg);
  refs.closeRegistration.addEventListener('click', onCloseRegistration);
  document.addEventListener('keydown', onCloseRegEsc);
}

function onCloseRegistration() {
  refs.regBackdrop.classList.add('visually-hidden');
  removeListen();
}

function onCloseBackdropReg(e) {
  if (e.target === e.currentTarget) {
    refs.regBackdrop.classList.add('visually-hidden');
    removeListen();
  }
}

function onCloseRegEsc(e) {
  if (e.code === 'Escape') {
    onCloseRegistration();
    removeListen();
  };
}

function removeListen() {
  refs.closeRegistration.removeEventListener('click', onCloseRegistration);
  refs.regBackdrop.removeEventListener('click', onCloseRegistration);
  document.removeEventListener('keydown', onCloseRegEsc);
}

export default onCloseRegistration;