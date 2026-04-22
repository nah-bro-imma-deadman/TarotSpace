(function() {
  const user = requireAuth();
  if (!user) return;

  const placeholder = document.getElementById('yesnoPlaceholder');
  const contentDiv = document.getElementById('yesnoContent');
  const textEl = document.getElementById('yesnoText');
  const cardName = document.getElementById('yesnoCardName');
  const cardDesc = document.getElementById('yesnoCardDesc');
  const drawBtn = document.getElementById('drawYesNoBtn');

  drawBtn.addEventListener('click', () => {
    const isYes = Math.random() < 0.5;
    const card = isYes ? YES_CARD : NO_CARD;
    const answer = isYes ? 'ДА' : 'НЕТ';

    placeholder.style.display = 'none';
    contentDiv.style.display = 'flex';
    textEl.textContent = answer;
    textEl.className = 'yesno-text';
    cardName.textContent = card.name;
    cardDesc.textContent = card.description;
  });
})();