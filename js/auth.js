(function() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') || 'login';

  function renderLoginForm() {
    return `
      <div class="input-group">
        <label>Юзернейм</label>
        <input type="text" id="loginUsername" class="input-field" placeholder="Введите юзернейм">
      </div>
      <div class="input-group">
        <label>Пароль</label>
        <input type="password" id="loginPassword" class="input-field" placeholder="••••••••">
      </div>
      <div class="error-message" id="loginError"></div>
      <button class="btn" id="loginSubmitBtn">Войти</button>
    `;
  }

  function renderRegisterForm() {
    return `
      <div class="input-group">
        <label>Юзернейм (A-Z a-z 0-9 _ .)</label>
        <input type="text" id="regUsername" class="input-field" placeholder="username">
      </div>
      <div class="input-group">
        <label>Имя (только буквы)</label>
        <input type="text" id="regName" class="input-field" placeholder="Анна">
      </div>
      <div class="input-group">
        <label>Пароль</label>
        <input type="password" id="regPass" class="input-field" placeholder="••••••••">
      </div>
      <div class="input-group">
        <label>Повторите пароль</label>
        <input type="password" id="regPassConfirm" class="input-field" placeholder="••••••••">
      </div>
      <div class="error-message" id="regError"></div>
      <button class="btn" id="registerSubmitBtn">Зарегистрироваться</button>
    `;
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    const container = document.getElementById('authFormContainer');
    if (tabId === 'login') {
      container.innerHTML = renderLoginForm();
      document.getElementById('loginSubmitBtn').addEventListener('click', handleLogin);
    } else {
      container.innerHTML = renderRegisterForm();
      document.getElementById('registerSubmitBtn').addEventListener('click', handleRegister);
    }
  }

  function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const pass = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    if (!username || !pass) {
      errorDiv.textContent = 'Заполните поля';
      return;
    }

    const users = getUsers();
    const user = users[username];
    if (!user || user.password !== pass) {
      errorDiv.textContent = 'Неверный юзернейм или пароль';
      return;
    }

    setCurrentUser(username);
    window.location.href = 'main.html';
  }

  function handleRegister() {
    const username = document.getElementById('regUsername').value.trim();
    const name = document.getElementById('regName').value.trim();
    const pass = document.getElementById('regPass').value;
    const passConfirm = document.getElementById('regPassConfirm').value;
    const err = document.getElementById('regError');

    if (!/^[A-Za-z0-9_.]+$/.test(username)) {
      err.textContent = 'Юзернейм: только латиница, цифры, _ .';
      return;
    }
    if (name && !/^[A-Za-zА-Яа-яЁё\s]+$/.test(name)) {
      err.textContent = 'Имя только буквы';
      return;
    }
    if (pass.length < 4) {
      err.textContent = 'Пароль минимум 4 символа';
      return;
    }
    if (pass !== passConfirm) {
      err.textContent = 'Пароли не совпадают';
      return;
    }

    const users = getUsers();
    if (users[username]) {
      err.textContent = 'Юзернейм занят';
      return;
    }

    users[username] = {
      username,
      name: name || username,
      password: pass,
      dob: '',
      lastCardDate: null
    };
    saveUsers(users);
    setCurrentUser(username);
    window.location.href = 'main.html';
  }

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  if (mode === 'register') {
    switchTab('register');
  } else {
    switchTab('login');
  }
})();