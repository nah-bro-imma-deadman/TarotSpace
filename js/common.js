const TAROT_DECK = [
  { name: 'Маг', description: 'Сила воли, мастерство, проявление. Сегодня вы способны воплотить задуманное.', meaning: 'Используйте свои таланты.' },
  { name: 'Верховная Жрица', description: 'Интуиция, тайны, внутренний голос. Доверьтесь подсознанию.', meaning: 'Ответ внутри вас.' },
  { name: 'Императрица', description: 'Изобилие, творчество, забота. День благоприятен для созидания.', meaning: 'Плодородие и рост.' },
  { name: 'Император', description: 'Структура, власть, контроль. Порядок приведёт к успеху.', meaning: 'Дисциплина.' },
  { name: 'Влюблённые', description: 'Выбор, союз, гармония. Важное решение в отношениях.', meaning: 'Любовь и выбор.' },
  { name: 'Колесница', description: 'Победа, движение, решительность. Вперёд, не сомневайтесь.', meaning: 'Прорыв.' },
  { name: 'Отшельник', description: 'Поиск истины, уединение. Время для размышлений.', meaning: 'Мудрость внутри.' },
  { name: 'Колесо Фортуны', description: 'Перемены, судьба, удача. Колесо поворачивается.', meaning: 'Цикличность.' },
  { name: 'Солнце', description: 'Радость, успех, ясность. Всё будет прекрасно!', meaning: 'Позитив.' },
  { name: 'Луна', description: 'Иллюзии, страхи, подсознание. Не всё очевидно.', meaning: 'Скрытое.' }
];

const YES_CARD = { name: 'Солнце', description: 'Сияние, удача, положительный исход.' };
const NO_CARD = { name: 'Луна', description: 'Туман, сомнения, лучше подождать.' };

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'auth.html';
    return null;
  }
  return user;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>"]/g, function(c) {
    if (c === '&') return '&amp;';
    if (c === '<') return '&lt;';
    if (c === '>') return '&gt;';
    if (c === '"') return '&quot;';
    return c;
  });
}