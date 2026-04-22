(function() {
  const user = requireAuth();
  if (!user) return;

  const container = document.getElementById('cardDayContainer');
  const placeholder = document.getElementById('cardDayPlaceholder');
  const contentDiv = document.getElementById('cardDayContent');
  const nameEl = document.getElementById('cardDayName');
  const descEl = document.getElementById('cardDayDesc');
  const meanEl = document.getElementById('cardDayMeaning');
  const drawBtn = document.getElementById('drawCardDayBtn');

  function checkAvailability() {
    const today = new Date().toISOString().slice(0,10);
    if (user.lastCardDate === today) {
      drawBtn.disabled = true;
      drawBtn.textContent = 'Уже получена сегодня';
      if (user.lastCard) {
        showCard(user.lastCard);
      }
    } else {
      drawBtn.addEventListener('click', drawCard);
    }
  }

  function showCard(card) {
    placeholder.style.display = 'none';
    contentDiv.style.display = 'flex';
    nameEl.textContent = card.name;
    descEl.textContent = card.description;
    meanEl.textContent = card.meaning;
  }

  function drawCard() {
    const today = new Date().toISOString().slice(0,10);
    if (user.lastCardDate === today) {
      alert('Карта дня уже была получена сегодня');
      return;
    }
    const card = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    user.lastCardDate = today;
    user.lastCard = card;
    const users = getUsers();
    users[user.username] = user;
    saveUsers(users);
    showCard(card);
    drawBtn.disabled = true;
    drawBtn.textContent = 'Карта получена';
  }

  checkAvailability();
})();