import getRefs from './get-Refs';
const refs = getRefs();
// refs.buttonScrollUp.addEventListener('click', onScroll);

// function onScroll() {
//   refs.eventList.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// }

window.onscroll = function () {
  const scrolled = window.pageYOffset || refs.searchingBlock.scrollTop;
  if (scrolled > 400) {
    refs.buttonScrollUp.style.display = 'block';
  } else {
    refs.buttonScrollUp.style.display = 'none';
  }
};
