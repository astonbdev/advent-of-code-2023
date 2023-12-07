import getPuzzleInput from "../api.js";
import TEST_INPUT from "./test.js";

/* D = V * T (some acceleration stuff too if we cared)*/
function getDistance(velocity, time) {
  return velocity * time;
}

/** Iterate over an array of objects like {time, distance}
 * determines the number of times we will exceed the given distance and
 * counts these as wins. Then multiplies these win totals together
 * to get the puzzle answer
 */
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
