const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const restartButton = document.getElementById('restart-button');
const modal = document.getElementById('result-modal');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const closeModalButton = document.getElementById('close-modal');

const cardValues = ['@', '#', '$', '%', '&', '?', '+', '='];
let cards = [...cardValues, ...cardValues]; // Duplicate for pairs
let flippedCards = [];
let matchedCards = [];
let moves = 0;
const maxMoves = 20; // Limit for winning

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the game board
function createBoard() {
  gameBoard.innerHTML = ''; // Clear the board
  shuffle(cards);
  cards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
  moves = 0;
  matchedCards = [];
  flippedCards = [];
  updateMovesDisplay();
}

// Update moves display
function updateMovesDisplay() {
  movesDisplay.textContent = `Moves: ${moves} / ${maxMoves}`;
}

// Flip card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check for match
function checkMatch() {
  moves++;
  updateMovesDisplay();

  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);

    if (matchedCards.length === cards.length) {
      setTimeout(() => showResult(moves <= maxMoves ? 'win' : 'lose'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }, 1000);
  }

  if (moves >= maxMoves && matchedCards.length < cards.length) {
    setTimeout(() => showResult('lose'), 500);
  }

  flippedCards = [];
}

// Show result modal
function showResult(result) {
  modal.style.display = 'flex';
  if (result === 'win') {
    resultTitle.textContent = 'Congratulations!';
    resultMessage.textContent = `You won the game in ${moves} moves!`;
  } else {
    resultTitle.textContent = 'Game Over!';
    resultMessage.textContent = `You lost! `;
  }
}

// Restart the game
restartButton.addEventListener('click', () => {
  createBoard();
  modal.style.display = 'none';
});

// Close the modal
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Initialize the game
createBoard();
