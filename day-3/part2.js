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

  return { gearLocations, engine };
}

function getGearRatios({ gearLocations, engine }) {
  const gearRatios = [];

  //check the adjecent nodes and see if any are numbers
  //edge cases for numbers that are in the middle of the top and bottom lines
  for (const location of gearLocations) {
    let [y, x] = location.split("-");
    y = Number(y);
    x = Number(x);
    const numberCoords = [];

    //check top
    const t1 = Number(engine[y - 1][x - 1]);
    const t2 = Number(engine[y - 1][x]);
    const t3 = Number(engine[y - 1][x + 1]);

    if (!isNaN(t2)) {
      numberCoords.push([y - 1, x]);
    } else {
      if (!isNaN(t1)) numberCoords.push([y - 1, x - 1]);
      if (!isNaN(t3)) numberCoords.push([y - 1, x + 1]);
    }

    //check middle
    const m1 = Number(engine[y][x - 1]);
    const m2 = Number(engine[y][x + 1]);

    if (!isNaN(m1)) numberCoords.push([y, x - 1]);
    if (!isNaN(m2)) numberCoords.push([y, x + 1]);

    //check bottom
    const b1 = Number(engine[y + 1][x - 1]);
    const b2 = Number(engine[y + 1][x]);
    const b3 = Number(engine[y + 1][x + 1]);

    if (!isNaN(b2)) {
      numberCoords.push([y + 1, x]);
    } else {
      if (!isNaN(b1)) numberCoords.push([y + 1, x - 1]);
      if (!isNaN(b3)) numberCoords.push([y + 1, x + 1]);
    }

    if (numberCoords.length === 2) {
      gearRatios.push(getGearRatio(numberCoords, engine));
    }
  }

  return gearRatios;
}

function getGearRatio(partNumberLocations, engine) {
  const partNumbers = [];
  for (const location of partNumberLocations) {
    let [y, x] = location;
    y = Number(y);
    x = Number(x);

    let number = engine[y][x];
    let left = 1;
    let right = 1;

    let num1 = Number(engine[y][x - left]);
    let num2 = Number(engine[y][x + right]);

    while (!isNaN(num1) || !isNaN(num2)) {
      // number = num1 ? engine[y][x - i] + number : number;
      // number = num2 ? number + engine[y][x + i] : number;
      if (!isNaN(num1)) {
        number = engine[y][x - left] + number;
        left++;
      }
      if (!isNaN(num2)) {
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

  let gearRatio = partNumbers[0] * partNumbers[1];

  console.log(
    "🚀 ~ file: part2.js:133 ~ getGearRatio ~ partNumbers:",
    partNumbers
  );

  //   for (let number of partNumbers) {
  //     gearRatio = gearRatio * number;
  //   }

  return gearRatio;
}

async function getMissingGear(testInput) {
  const input = testInput ? testInput : await getPuzzleInput();

  const engineDetails = getEngineDetails(input);
  const gearRatios = getGearRatios(engineDetails);

  return gearRatios.reduce((prev, curr) => prev + curr);
}

getMissingGear().then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
