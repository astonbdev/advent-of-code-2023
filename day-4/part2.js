import getPuzzleInput from "../api.js";
import TEST_INPUT from "./testinput.js";

async function getTotalPoints(testInput) {
  const input = testInput ? testInput : await getPuzzleInput();
  const games = input.split("\n");
  let scratchCardCount = 0;
  const gameWinnerCounts = [];

  //Process cards and capture how many won.
  for (const game of games) {
    if (game === "") continue;
    const { winningNumbers, scratchedNumbers } = getGameNumbers(game);

    const winnerMap = getWinningNumbersMap(winningNumbers);
    countWinners(winnerMap, scratchedNumbers);

    let numWinners = 0;

    for (let num of winnerMap.values()) {
      numWinners += num;
    }
    gameWinnerCounts.push(numWinners);
  }
  scratchCardCount += countScratchCards(gameWinnerCounts);
  return scratchCardCount;
}

function countScratchCards(gameWinnerCounts) {
  // let numScratchCards = 0;
  const cardCounts = new Array(gameWinnerCounts.length).fill(1);
  //FIXME: There's obviously a better way
  for (let i = 0; i < cardCounts.length; i++) {
    let count = gameWinnerCounts[i];
    let numCards = cardCounts[i];
    //Add one new card to each proceeding card based on winner count
    for (let k = 1; k <= count; k++) {
      cardCounts[k + i] += numCards;
    }
  }

  return cardCounts.reduce((prev, curr) => prev + curr);
}

function tallyPoints(winnerMap) {
  let points = 0;
  for (const number of winnerMap.values()) {
    if (number > 0) {
      points = points ? points * 2 : points + 1;
    }
  }

  return points;
}

function getGameNumbers(game) {
  const numbers = game.split(":")[1];
  const [scratchedString, winningString] = numbers.split("|");

  const regex = /\d+/g;

  const scratchedNumbers = scratchedString.match(regex).map((n) => Number(n));
  const winningNumbers = winningString.match(regex).map((n) => Number(n));

  return { scratchedNumbers, winningNumbers };
}

function getWinningNumbersMap(winningNumbers) {
  const winners = new Map();

  for (let number of winningNumbers) {
    number = Number(number);
    winners.set(number, 0);
  }

  return winners;
}

function countWinners(winnerMap, scratchedNumbers) {
  for (const number of scratchedNumbers) {
    const winner = winnerMap.get(number);
    if (!isNaN(winner)) {
      winnerMap.set(number, winner + 1);
    }
  }
}

getTotalPoints().then((answer) => console.log("PUZZLE ANSWER:", answer));
