import getPuzzleInput from "../api.js";
import TEST_INPUT from "./testinput.js";

async function getTotalPoints(testInput) {
  const input = testInput ? testInput : await getPuzzleInput();
  const games = input.split("\n");
  let points = 0;
  for (const game of games) {
    const { winningNumbers, scratchedNumbers } = getGameNumbers(game);

    const winnerMap = getWinningNumbersMap(winningNumbers);
    countWinners(winnerMap, scratchedNumbers);

    points += tallyPoints(winnerMap);
  }
  return points;
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

getTotalPoints(TEST_INPUT).then((answer) =>
  console.log("PUZZLE ANSWER:", answer)
);
