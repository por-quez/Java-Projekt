const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.getElementById('dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

function initGame() {
  scores[0] = scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = score1.textContent = 0;
  current0.textContent = current1.textContent = 0;

  dice.classList.remove('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', () => {
  if (!playing) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${roll}.png`;

  if (roll !== 1) {
    currentScore += roll;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    dice.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', initGame);

// Init at load
initGame();
