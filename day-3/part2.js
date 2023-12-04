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

/**
 * parses puzzle input and constructs and returns object
 * @param {string} input
 * @returns  gearLocations: string[], engine: string[][]}
 */
function getEngineDetails(input) {
  let lineLength = 0;
  const gearLocations = [];
  //get length of each input line, this determines
  //how long each subarray is
  const engine = input.split("\n");
  lineLength = engine[0].length;

  input = input.replace(/\n/g, "");

  //construct coordinates of our two dimensional array
  for (let i = 0; i < input.length; i++) {
    //Get all "gears"
    if (input[i] === "*") {
      const y = Math.floor(i / lineLength);
      const x = i % lineLength;
      gearLocations.push(`${y}-${x}`);
    }
  }

  console.log(
    "🚀 ~ file: advent3.js:26 ~ getEngineDetails ~ gearLocations:",
    gearLocations
  );
  return { gearLocations, engine };
}

function getGearRatios({ gearLocations, engine }) {}

async function getMissingGear() {
  const input = testInput ? testInput : await getPuzzleInput();

  const engineDetails = getEngineDetails(input);
  const gearRatios = getGearRatios(engineDetails);
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
getMissingGear(testInput).then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
