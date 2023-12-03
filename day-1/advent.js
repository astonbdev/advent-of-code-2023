const token = process.env.AOC_24_TOKEN;

async function getPuzzleInput() {
  const response = await fetch("https://adventofcode.com/2023/day/1/input", {
    headers: {
      cookie: token,
    },
  });
  const text = await response.text();

  return text;
}

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
  const items = input.split(/\r?\n/);

  //   const regex = /(one|two|three|four|five|six|seven|eight|nine)/g;
  //   const matchingNumStrings = [];

  const output = [];

  for (let item of items) {
    // const matches = item.match(regex);
    const matches = [];
    for (word of Object.keys(wordToNumber)) {
      const regex = new RegExp(`(${word})`, "g");

      while ((match = regex.exec(item)) !== null) {
        matches.push({ substring: match[1], index: match.index });
      }
    }
    let minMatch = { index: Infinity };
    let maxMatch = { index: -Infinity };

    for (const match of matches) {
      if (match.index < minMatch.index) minMatch = match;
      if (match.index > maxMatch.index) maxMatch = match;
    }

    console.log(
      "🚀 ~ file: advent.js:46 ~ parsePuzzleInput ~ maxMatch:",
      maxMatch
    );
    console.log(
      "🚀 ~ file: advent.js:45 ~ parsePuzzleInput ~ minMatch:",
      minMatch
    );

    item = item.replace(minMatch.substring, wordToNumber[minMatch.substring]);

    item = item.replace(maxMatch.substring, wordToNumber[maxMatch.substring]);

    output.push(item);
  }

  //   for (let i = 0; i < matchingNumStrings.length; i++) {
  //     for (let match of matchingNumStrings[i]) {
  //       items[i] = items[i].replaceAll(match, wordToNumber[match]);
  //     }
  //   }

  //   console.log("🚀 ~ file: advent.js:43 ~ parsePuzzleInput ~ items:", items);
  return output;
}

async function decodeCalibration(defaultInput) {
  const input = defaultInput ? defaultInput : await getPuzzleInput();
  const calibrations = parsePuzzleInput(input);
  console.log(
    "🚀 ~ file: advent.js:57 ~ decodeCalibration ~ calibrations:",
    calibrations
  );

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

function getFirstDigit(input) {
  // console.log("🚀 ~ file: advent.js:62 ~ getFirstDigit ~ input:", input);
  for (let char of input) {
    if (!isNaN(char)) {
      return char;
    }
  }
}

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
// console.log(getLastDigit("zngrtcj4zqzrbbhs"));
// console.log(getFirstDigit("zngrtcj4zqzrbbhs"));
// console.log(parsePuzzleInput("onetwothreefourfivesixseveneightninenine"));
