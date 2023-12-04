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
 * @returns {symbolLocations: string[], engine: string[][]}
 */
function getEngineDetails(input) {
  let lineLength = 0;
  const symbolLocations = [];
  //get length of each input line, this determines
  //how long each subarray is
  const engine = input.split("\n");
  lineLength = engine[0].length;

  input = input.replace(/\n/g, "");

  //construct coordinates of our two dimensional array
  for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i]) && input[i] !== ".") {
      const y = Math.floor(i / lineLength);
      const x = i % lineLength;
      symbolLocations.push(`${y}-${x}`);
    }
  }
  // console.log(
  //   "🚀 ~ file: advent3.js:26 ~ getEngineDetails ~ symbolLocations:",
  //   symbolLocations
  // );
  // console.log("🚀 ~ file: advent3.js:29 ~ getEngineDetails ~ engine:", engine);

  return { symbolLocations, engine };
}

/**
 * takes an array of strings that represent coordinates "y-x",
 * returns a part number that is a sum of all the valid parts
 * @param {string[][]} engine
 * @param {string[]} engineSymbolLocations
 */
function getMissingPartNumber({ symbolLocations, engine }) {
  let partNumberLocations = [];

  for (location of symbolLocations) {
    const [y, x] = location.split("-").map((e) => Number(e));
    const relativeCompassLocations = {
      top: {
        0: `${y - 1}-${x - 1}`,
        1: `${y - 1}-${x}`,
        2: `${y - 1}-${x + 1}`,
      },
      middle: {
        0: `${y}-${x + 1}`,
        1: `${y}-${x - 1}`,
      },
      bottom: {
        0: `${y + 1}-${x - 1}`,
        1: `${y + 1}-${x}`,
        2: `${y + 1}-${x + 1}`,
      },
    };

    for (let row in relativeCompassLocations) {
      for (let direction in relativeCompassLocations[row]) {
        const [dirY, dirX] =
          relativeCompassLocations[row][direction].split("-");
        if (engine[dirY] !== undefined && !isNaN(engine[dirY][dirX])) {
          partNumberLocations.push(relativeCompassLocations[row][direction]);
          break;
        }
      }
    }
  }

  const partNumbers = getPartNumbers(partNumberLocations, engine);
  let partNumber = 0;
  for (let number of partNumbers) {
    partNumber += Number(number);
  }

  return partNumber;
}

/**
 * takes an array of strings like "y-x" that represent found numbers in the engine array
 * find and constructs all of the digits in the part number and returns an array of these
 * numbers
 * @param {string[]} partNumberLocations
 * @returns {number[]} partNumbers
 */
function getPartNumbers(partNumberLocations, engine) {
  const partNumbers = [];
  let lastChecked = -Infinity;
  for (const location of partNumberLocations) {
    let [y, x] = location.split("-");
    y = Number(y);
    x = Number(x);
    // if (!(Number(x) + Number(y) > lastChecked - 2)) {
    //   lastChecked = Number(x) + Number(y);
    //   continue;
    // }
    let number = engine[y][x];
    let left = 1;
    let right = 1;

    // console.log("STARTING NEW CHECK");
    // console.log("🚀 ~ file: advent3.js:109 ~ getPartNumbers ~ y:", y);
    // console.log("🚀 ~ file: advent3.js:109 ~ getPartNumbers ~ x:", x);
    // console.log("🚀 ~ file: advent3.js:114 ~ getPartNumbers ~ number:", number);
    // console.log(engine[2][1]);
    // console.log(Number(engine[2][3]));

    let num1 = Number(engine[y][x - left]);
    // console.log("🚀 ~ file: advent3.js:116 ~ getPartNumbers ~ num1:", num1);
    let num2 = Number(engine[y][x + right]);
    // console.log("🚀 ~ file: advent3.js:118 ~ getPartNumbers ~ num2:", num2);

    while (num1 || num2) {
      // number = num1 ? engine[y][x - i] + number : number;
      // number = num2 ? number + engine[y][x + i] : number;
      if (num1) {
        number = engine[y][x - left] + number;
        left++;
      }
      if (num2) {
        number = number + engine[y][x + right];
        right++;
      }
      // console.log(
      //   "🚀 ~ file: advent3.js:124 ~ getPartNumbers ~ number:",
      //   number
      // );
      num1 = Number(engine[y][x - left]);
      // console.log("🚀 ~ file: advent3.js:129 ~ getPartNumbers ~ num1:", num1);
      num2 = Number(engine[y][x + right]);
      // console.log("🚀 ~ file: advent3.js:131 ~ getPartNumbers ~ num2:", num2);
    }

    // console.log("🚀 ~ file: advent3.js:114 ~ getPartNumbers ~ number:", number);
    partNumbers.push(Number(number));
  }

  return partNumbers;
}

/**
 *
 * returns integer representing the missing part from the puzzle input
 * @param {string} testInput
 */
async function findMissingPart(testInput) {
  const input = testInput ? testInput : await getPuzzleInput();

  const engine = getEngineDetails(input);
  const partNumber = getMissingPartNumber(engine);

  return partNumber;
}

const testInput = `1.1..
.*...
1.1..`;
findMissingPart(testInput).then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
