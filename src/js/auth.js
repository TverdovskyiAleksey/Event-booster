import getRefs from './getRefs';
import onCloseRegistration from './registerModal';

const refs = getRefs();

refs.form.addEventListener('submit', onFormSubmit);

const login = () => {
  refs.buttonAuth.classList.add('visually-hidden');
  refs.buttonOut.classList.remove('visually-hidden');
  onCloseRegistration();
};

const logout = () => {
  refs.buttonAuth.classList.remove('visually-hidden');
  refs.buttonOut.classList.add('visually-hidden');
  refs.inputLogin.value = '';
  refs.inputPassword.value = '';

  localStorage.removeItem('user');
};


refs.buttonOut.addEventListener('click', () => {
  logout();
});

function onFormSubmit(e) {
  e.preventDefault();

  const user = {
    login: refs.inputLogin.value,
    password: refs.inputPassword.value,
  }

  if (user.login.trim() === '' || user.password.trim() === '') {

    swal({
      text: 'Enter login and password!',
      className: "error-fetch",
      button: false,
      timer: 2000,
    })
    return;
  }

  localStorage.setItem('user', JSON.stringify(user));
  login();
};

if (localStorage.getItem('user')) {
  refs.buttonAuth.classList.add('visually-hidden');
  refs.buttonOut.classList.remove('visually-hidden');
}