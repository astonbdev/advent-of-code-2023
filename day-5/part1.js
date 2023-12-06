import getPuzzleInput from "../api.js";
import TEST_INPUT from "./test.js";

async function getSeedLocations(input) {
  input = input ? input : await getPuzzleInput();

  //prepare the input and get our data
  const { data, seeds } = getData(input);

  //iterate over our keys, and call each new map with the previous input
}

function getLocationMap(locationData, item) {
  const map = new Map();
}

/**
 * iterates over our raw puzzle input and returns object of *thing-map* : [numbers]
 * @param {puzzleInput} input
 * @returns
 */
function getData(input) {
  input = input.split("\n");
  const seeds = input.shift().match(/\d+/g);
  input = input.filter((line) => line !== "");
  const data = {};
  let currKey = "";

  for (let line of input) {
    if (isNaN(line[0])) {
      currKey = line.split(" ")[0];
      data[currKey] = [];
      continue;
    }
    let numbers = line.match(/\d+/g);

    numbers = numbers.map((str) => Number(str));

    data[currKey].push(numbers);
  }

  return { data, seeds };
}

getSeedLocations(TEST_INPUT).then((answer) =>
  console.log(`PUZZLE ANSWER: ${answer}`)
);
