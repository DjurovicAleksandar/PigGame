'use strict';
//dice
const diceEl = document.querySelector('img');
const instructionEL = document.querySelector('.help');
//values
let score, highScore, playerActive, totalScore, gameState;
//buttons
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnSos = document.querySelector('.btn--help');
//scores
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');

const currentEl1 = document.querySelector('#current--0');
const currentEl2 = document.querySelector('#current--1');
//Trenutni igrac
// const activePlayer = document.querySelector('.player--active');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
//kod
const init = function () {
  score = 0;
  highScore = 0;
  playerActive = 0;
  totalScore = [0, 0];
  gameState = true;
  score1.textContent = 0;
  score2.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  instructionEL.classList.add('hidden');
};

const switchPlayer = function () {
  score = 0;
  document.querySelector(`#current--${playerActive}`).textContent = score;

  document
    .querySelector(`.player--${playerActive} `)
    .classList.remove('player--active');

  playerActive = playerActive === 0 ? 1 : 0;

  document
    .querySelector(`.player--${playerActive} `)
    .classList.add('player--active');
};

init();
//poenta igre jeste da dobijemo random broj od 1 do 6, koji holdujemo. Ako izucemo 1, sve se gubi, sem sacuvanog high scor-a

//btn roll dodaje score u current score,
//kada pritisnem button, svaki put treba ga se generise novi broj od 1 do 6
//ukoliko player 1 dobije 1, treba da se prebacimo na playera 2
//kako? Player active donosi nam drugaciji backgrdund, sto implicirae dalje, ukoliko igram 1 dobije 1, igrac 2 dobija sansu da igra i active player status
//
// btnNewGame.addEventListener('click', init);

// btnRoll.addEventListener('click', function () {});

//na klik score treba da predje u odgovarajuci totalscore i da prebaci na drugogo igraca

// btnHold.addEventListener('click', function () {});

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    //Button new game
    if (button.className === 'btn btn--new') init();
    //Button hold
    if (button.className === 'btn btn--hold') {
      instructionEL.classList.add('hidden');

      if (gameState) {
        //add current score
        totalScore[playerActive] += score;
        document.getElementById(`score--${playerActive}`).textContent =
          totalScore[playerActive];
        //check if score is 100
        if (totalScore[playerActive] >= 100) {
          document
            .querySelector(`.player--${playerActive}`)
            .classList.toggle('player--winner');
          document
            .querySelector(`.player--${playerActive}`)
            .classList.remove('player--active');
          diceEl.classList.add('hidden');
          gameState = false;
        } else {
          switchPlayer();
        }
      }
    }
    //Button roll
    if (button.className === 'btn btn--roll') {
      instructionEL.classList.add('hidden');

      let dice = Math.trunc(Math.random() * 6) + 1; // definisanje random broja
      diceEl.src = `dice-${dice}.png`;
      if (gameState) {
        if (dice !== 1) {
          score += dice;
          document.querySelector(`#current--${playerActive}`).textContent =
            score;
        } else {
          switchPlayer();
        }
      }
    }

    //Button SOS - helpto
    if (button.className === 'btn btn--help') {
      instructionEL.classList.toggle('hidden');
    }
  });
});
// console.log
