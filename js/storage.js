const STORAGE_USERS = 'tarot_users';
const STORAGE_CURRENT = 'tarot_current_user';

function getUsers() {
  const stored = localStorage.getItem(STORAGE_USERS);
  return stored ? JSON.parse(stored) : {};
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function getCurrentUser() {
  const username = localStorage.getItem(STORAGE_CURRENT);
  if (!username) return null;
  const users = getUsers();
  return users[username] || null;
}

function setCurrentUser(username) {
  localStorage.setItem(STORAGE_CURRENT, username);
}

function logout() {
  localStorage.removeItem(STORAGE_CURRENT);
}