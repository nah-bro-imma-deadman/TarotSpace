(function() {
  let user = requireAuth();
  if (!user) return;

  const container = document.getElementById('profileContainer');

  function render() {
    container.innerHTML = `
      <h2 style="font-size:1.8rem; text-align:center;">Профиль</h2>
      <div style="margin-top: 16px;">
        <div class="input-group">
          <label>Юзернейм</label>
          <input type="text" id="profileUsername" class="input-field" value="${escapeHtml(user.username)}" disabled>
        </div>
        <div class="input-group">
          <label>Имя</label>
          <input type="text" id="profileName" class="input-field" value="${escapeHtml(user.name || '')}">
        </div>
        <div class="input-group">
          <label>Дата рождения</label>
          <input type="date" id="profileDob" class="input-field" value="${user.dob || ''}">
        </div>

        <!-- Блок смены пароля -->
        <div style="margin: 24px 0 8px; border-top: 1px dashed #5a507a; padding-top: 16px;">
          <h3 style="font-weight:300; color:#cdbcf2;">Сменить пароль</h3>
        </div>
        <div class="input-group">
          <label>Текущий пароль</label>
          <input type="password" id="currentPass" class="input-field" placeholder="••••••••">
        </div>
        <div class="input-group">
          <label>Новый пароль</label>
          <input type="password" id="newPass" class="input-field" placeholder="••••••••">
        </div>
        <div class="input-group">
          <label>Подтвердите новый пароль</label>
          <input type="password" id="confirmNewPass" class="input-field" placeholder="••••••••">
        </div>
        <div class="error-message" id="passwordError"></div>

        <button class="btn" id="saveProfileBtn">Сохранить изменения</button>
      </div>
      <div id="profileMessage" class="error-message" style="text-align:center;"></div>
    `;

    document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
  }

  function saveProfile() {
    const newName = document.getElementById('profileName').value.trim();
    const newDob = document.getElementById('profileDob').value;
    const msg = document.getElementById('profileMessage');
    const passErr = document.getElementById('passwordError');

    // Проверка имени
    if (newName && !/^[A-Za-zА-Яа-яЁё\s]+$/.test(newName)) {
      msg.textContent = 'Имя только буквы';
      return;
    }

    // Проверка смены пароля (если поля заполнены)
    const currentPass = document.getElementById('currentPass').value;
    const newPass = document.getElementById('newPass').value;
    const confirmNew = document.getElementById('confirmNewPass').value;

    let passwordChanged = false;
    if (currentPass || newPass || confirmNew) {
      // Если хоть одно поле пароля тронуто – проверяем
      if (!currentPass) {
        passErr.textContent = 'Введите текущий пароль';
        return;
      }
      if (currentPass !== user.password) {
        passErr.textContent = 'Текущий пароль неверен';
        return;
      }
      if (!newPass) {
        passErr.textContent = 'Введите новый пароль';
        return;
      }
      if (newPass.length < 4) {
        passErr.textContent = 'Пароль должен быть не менее 4 символов';
        return;
      }
      if (newPass !== confirmNew) {
        passErr.textContent = 'Новые пароли не совпадают';
        return;
      }
      user.password = newPass;
      passwordChanged = true;
    }

    // Сохраняем остальные данные
    user.name = newName || user.username;
    user.dob = newDob;

    const users = getUsers();
    users[user.username] = user;
    saveUsers(users);

    if (passwordChanged) {
      msg.textContent = '✓ Пароль и данные обновлены';
    } else {
      msg.textContent = '✓ Данные сохранены';
    }
    passErr.textContent = '';

    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  render();
})();