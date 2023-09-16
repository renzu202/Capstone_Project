const showLoginFormButton = document.getElementById('showLoginFormButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');
const loginForm = document.getElementById('login')

let isLoginFormVisible = false;

showLoginFormButton.addEventListener('click', () => {
  if (isLoginFormVisible) {
    // Code to hide the login form
    usernameInput.style.display = 'none';
    passwordInput.style.display = 'none';
    submitButton.style.display = 'none';
    showLoginFormButton.innerHTML = '▼';
    loginForm.style.height = '140px';
  } else {
    // Code to show the login form
    usernameInput.style.display = 'block';
    passwordInput.style.display = 'block';
    submitButton.style.display = 'block';
    showLoginFormButton.innerHTML = '▲';
    loginForm.style.height = '400px';
  }
  isLoginFormVisible = !isLoginFormVisible;
});
