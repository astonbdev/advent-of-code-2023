const token = process.env.AOC_24_TOKEN;

/**
 * fetch the puzzle data and return the response
 * @returns puzzle text
 */
async function getPuzzleInput() {
  const response = await fetch("https://adventofcode.com/2023/day/1/input", {
    headers: {
      cookie: token,
    },
  });
  const text = await response.text();

  return text;
}
/**
 * Take in puzzle text, splits by newline and replaces the first and last instances of a "number word"
 * with a proper number returning the resulting string
 * @param {string} input
 * @returns
 */
function parsePuzzleInput(input) {
  const wordToNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  //take out new lines
  const items = input.split(/\r?\n/);
  const output = [];

  for (let item of items) {
    const matches = [];

    //for each possible word numder, find the matches and add to our found matching word numbers
    for (word of Object.keys(wordToNumber)) {
      const regex = new RegExp(`(${word})`, "g");

      while ((match = regex.exec(item)) !== null) {
        matches.push({ substring: match[1], index: match.index });
      }
    }

    let minMatch = { index: Infinity };
    let maxMatch = { index: -Infinity };

    //find the first and last matches, these are the only one that matter per the
    //problem statement
    for (const match of matches) {
      if (match.index < minMatch.index) minMatch = match;
      if (match.index > maxMatch.index) maxMatch = match;
    }

    //replace the found matches
    //FIXME: I think this is just lucky
    item = item.replace(minMatch.substring, wordToNumber[minMatch.substring]);
    item = item.replace(maxMatch.substring, wordToNumber[maxMatch.substring]);

    output.push(item);
  }

  return output;
}

/**
 * takes string input or fetches from AOC.
 *
 * creates the calibration string and then finds the first and last digits, adding them to a running
 * total that is then returned.
 *
 * @param {string} defaultInput
 * @returns
 */
async function decodeCalibration(defaultInput) {
  const input = defaultInput ? defaultInput : await getPuzzleInput();
  const calibrations = parsePuzzleInput(input);

  let total = 0;

  for (const item of calibrations) {
    if (item === "") {
      console.log("continuing");
      continue;
    }
    const firstDigit = getFirstDigit(item);
    const lastDigit = getLastDigit(item);
    total += Number(`${firstDigit}${lastDigit}`);
    // console.log("🚀 ~ file: advent.js:58 ~ decodeCalibration ~ total:", total);
  }

  return total;
}

/**
 * find first number of string
 * @param {string} input
 * @returns
 */
function getFirstDigit(input) {
  // console.log("🚀 ~ file: advent.js:62 ~ getFirstDigit ~ input:", input);
  for (let char of input) {
    if (!isNaN(char)) {
      return char;
    }
  }
}

/**
 * find last number of string
 * @param {string} input
 * @returns
 */
function getLastDigit(input) {
  for (let char = input.length - 1; char >= 0; char--) {
    if (!isNaN(input[char])) {
      return input[char];
    }
  }
}

const testData = `
7pqrstsixteen`;

decodeCalibration().then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
