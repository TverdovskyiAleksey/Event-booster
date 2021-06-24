import getRefs from './getRefs';
const refs = getRefs();

refs.buttonScrollUp.addEventListener('click', onButtonScrollUpClick);
function onButtonScrollUpClick() {
  window.scrollTo({
    top: 1,
    behavior: 'smooth',
  });
}

window.onscroll = function () {
  const scrolled = window.pageYOffset || refs.searchingBlock.scrollTop;
  if (scrolled > 400) {
    refs.buttonScrollUp.style.display = 'block';
  } else {
    refs.buttonScrollUp.style.display = 'none';
  }
};
