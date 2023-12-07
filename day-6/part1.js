import getPuzzleInput from "../api.js";
import TEST_INPUT from "./test.js";

function getDistance(velocity, time) {
  return velocity * time;
}

function solvePuzzle(input) {
  const winsPerRace = [];

  for (const race of input) {
    let numWins = 0;
    const { time, distance } = race;
    let velocity = 0;
    let timeLeft = time;

    for (let i = 1; i < time; i++) {
      timeLeft--;
      velocity++;
      const raceDistance = getDistance(velocity, timeLeft);

      if (raceDistance > distance) {
        numWins++;
      }
    }

    winsPerRace.push(numWins);
    console.log(
      "🚀 ~ file: part1.js:28 ~ solvePuzzle ~ winsPerRace:",
      winsPerRace
    );
  }

  return winsPerRace.reduce((prev, curr) => prev * curr);
}

console.log("PUZZLE ANSWER: ", solvePuzzle(TEST_INPUT));
