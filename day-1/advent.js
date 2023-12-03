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
  return input.split(/\r?\n/);
}

async function decodeCalibration() {
  const input = await getPuzzleInput();
  const calibrations = parsePuzzleInput(input);

  let total = 0;

  for (const item of calibrations) {
    if (item === "") continue;
    const firstDigit = getFirstDigit(item);
    const lastDigit = getLastDigit(item);
    total += Number(`${firstDigit}${lastDigit}`);
    if (isNaN(total)) {
      debugger;
    }
  }

  return total;

  function getFirstDigit(input) {
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
}

decodeCalibration().then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
