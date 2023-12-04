const token = process.env.AOC_24_TOKEN;

/**
 * fetch the puzzle data and return the response
 * @returns puzzle text
 */
async function getPuzzleInput() {
  const response = await fetch("https://adventofcode.com/2023/day/3/input", {
    headers: {
      cookie: token,
    },
  });
  const text = await response.text();

  return text;
}

function getEngineSymbolLocations(input) {
  const output = {
    lineLength: 0,
    symbolLocations: [],
  };
  //get length of each input line, this determines
  //how long each subarray is
  output.lineLength = input.split("\n")[0].length;

  input = input.replace(/\n/g, "");

  //construct coordinates of our two dimensional array
  for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i]) && input[i] !== ".") {
      const y = Math.floor(i / output.lineLength);
      const x = i % output.lineLength;
      output.symbolLocations.push(`${y}-${x}`);
    }
  }

  return output;
}

/**
 *
 * @param {string} testInput
 * returns integer representing the missing part from the puzzle input
 */
async function findMissingPart(testInput) {
  const input = testInput ? testInput : await getPuzzleInput();

  const engineSymbolLocations = getEngineSymbolLocations(input);
  console.log(
    "🚀 ~ file: advent3.js:40 ~ findMissingPart ~ engineSymbolLocations:",
    engineSymbolLocations
  );
}

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
findMissingPart(testInput).then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
