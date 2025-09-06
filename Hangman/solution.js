import promp from "./promp.js";
import data from "./data.js";

/* Get one random word from data */
const word = data[Math.floor(Math.random() * data.length)];

let guessCount = 0;
const hangmanParts = ["H", "A", "N", "G", "M", "A", "N"];

async function runGame() {
  const answer = await promp(`${word.question} `);

  if (answer.toLowerCase() === word.word) {
    console.log("Congratulations! You've guessed the word correctly.");
    return;
  } else {
    guessCount++;

    if (guessCount <= hangmanParts.length) {
      const hangmanFigure = hangmanParts.slice(0, guessCount).join('');
      console.log(`${hangmanFigure}`);
    }

    if (guessCount === 6) {
      console.log(`Hint: ${word.hint}`);
    }

    if (guessCount >= hangmanParts.length) {
      console.log(`Game Over! The word was "${word.word}".`);
      return;
    }
  }

  return runGame();
}

runGame();