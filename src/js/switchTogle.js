import getRefs from './getRefs';
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = getRefs();
export default function onSwitchChange() {
  const a = Theme.LIGHT;
  const b = Theme.DARK;
  onDarkTheme(a, b);
  onLightTheme(a, b);
}

function onDarkTheme(a, b) {
  if (refs.switchTogle.checked) {
    refs.bodyTheme.classList.remove(a);
    refs.bodyTheme.classList.add(b);
    refs.pagination.classList.remove(a);
    refs.pagination.classList.add(b);
    localStorage.setItem('theme', b);
  }
}

function onLightTheme(a, b) {
  if (!refs.switchTogle.checked) {
    refs.bodyTheme.classList.remove(b);
    refs.bodyTheme.classList.add(a);
    refs.pagination.classList.remove(b);
    refs.pagination.classList.add(a);
    localStorage.setItem('theme', a);
  }
}

const savedData = localStorage.getItem('theme') || Theme.DARK;
refs.bodyTheme.classList.add(savedData);
refs.pagination.classList.add(savedData);
refs.switchTogle.checked = savedData === Theme.DARK;
