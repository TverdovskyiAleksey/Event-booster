const buttonAuth = document.querySelector('.login-icon');
const buttonOut = document.querySelector('.home-icon');
const inputLogin = document.getElementById('login');
const inputPassword = document.getElementById('password');

import getRefs from './getRefs';
import onCloseRegistration from './registerModal';

const refs = getRefs();

refs.form.addEventListener('submit', onFormSubmit);

const login = () => {
  buttonAuth.classList.add('visually-hidden');
  buttonOut.classList.remove('visually-hidden');
  onCloseRegistration();
};

const logout = () => {
  buttonAuth.classList.remove('visually-hidden');
  buttonOut.classList.add('visually-hidden');
  inputLogin.value = '';
  inputPassword.value = '';

  localStorage.removeItem('user');
};


buttonOut.addEventListener('click', () => {
  logout();
});

function onFormSubmit(e) {
  e.preventDefault();

  const user = {
    login: inputLogin.value,
    password: inputPassword.value,
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
  buttonAuth.classList.add('visually-hidden');
  buttonOut.classList.remove('visually-hidden');
}