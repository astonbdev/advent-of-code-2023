import getPuzzleInput from "../api.js";
import TEST_INPUT from "./test.js";

async function solvePuzzle(input) {
  const input = input ? input : await getPuzzleInput(7);
}

solvePuzzle(TEST_INPUT).then((answer) => console.log("PUZZLE ANSWER:", answer));
