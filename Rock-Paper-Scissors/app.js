const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resetButton = document.getElementById('reset');
const possibleChoices = document.querySelectorAll('button');

let userChoice;
let computerChoice;
let result;
let playerScore = 0;
let computerScore = 0;

// player choices event listner
possibleChoices.forEach(possibleChoice =>
  possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;

    generateComputerChoice();
    determineWinner();
    updateScores();
  })
);

// Event listener for Reset button
resetButton.addEventListener('click', resetGame);

// Generate computer choice
function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // or we can use possibleChoices.length as both mean the same
  const choices = ['Rock', 'Paper', 'Scissors'];
  computerChoice = choices[randomNumber];
  computerChoiceDisplay.innerHTML = computerChoice;
}

// Determine the winner
function determineWinner() {
  if (userChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (userChoice === 'Rock' && computerChoice === 'Scissors') ||
    (userChoice === 'Paper' && computerChoice === 'Rock') ||
    (userChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    result = "You win!";
    playerScore++;
  } else {
    result = "Computer wins!";
    computerScore++;
  }
  resultDisplay.innerHTML = result;

  // highligth winner
  highlightWinner();
}

// highllight winning choice
function highlightWinner() {
  const userHighlight = document.getElementById(userChoice);
  const computerHighlight = document.getElementById(computerChoice);

  userHighlight.classList.add('highlight');
  computerHighlight.classList.add('highlight');

  setTimeout(() => {
    userHighlight.classList.remove('highlight');
    computerHighlight.classList.remove('highlight');
  }, 1000);
}

// Update scores
function updateScores() {
  playerScoreDisplay.innerHTML = `Player: ${playerScore}`;
  computerScoreDisplay.innerHTML = `Computer: ${computerScore}`;
}

// Reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  userChoiceDisplay.innerHTML = '';
  computerChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
  updateScores();
}
