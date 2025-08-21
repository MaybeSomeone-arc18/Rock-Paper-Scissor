let playerScore = 0;
let computerScore = 0;
let round = 0;
const maxRounds = 5;

const resultDiv = document.getElementById("result");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const roundInfo = document.getElementById("round-info");
const playAgainBtn = document.getElementById("play-again");

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    if (round < maxRounds) {
      playRound(button.dataset.choice);
    }
  });
});

playAgainBtn.addEventListener("click", resetGame);

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  round++;

  let result = "";
  if (playerChoice === computerChoice) {
    result = `It's a Draw! You both chose ${playerChoice}`;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    playerScore++;
    result = `You Win! ${playerChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    result = `You Lose! ${computerChoice} beats ${playerChoice}`;
  }

  updateUI(result);

  if (round === maxRounds) {
    endGame();
  }
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function updateUI(result) {
  resultDiv.textContent = result;
  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  roundInfo.textContent = `Round: ${round} / ${maxRounds}`;
}

function endGame() {
  let finalMessage = "";
  if (playerScore > computerScore) {
    finalMessage = "🎉 Congratulations! You Won The Game!";
  } else if (playerScore < computerScore) {
    finalMessage = "💻 Game Over! Computer Wins The Game!";
  } else {
    finalMessage = "🤝 It's a Tie Game! Try Again!";
  }

  resultDiv.textContent = finalMessage;
  playAgainBtn.classList.remove("hidden");
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  updateUI("Game Reset! Choose Rock, Paper, or Scissors.");
  playAgainBtn.classList.add("hidden");
}
