const token = process.env.AOC_24_TOKEN;

/**
 * fetch the puzzle data and return the response
 * @returns puzzle text
 */
async function getPuzzleInput() {
  const response = await fetch("https://adventofcode.com/2023/day/2/input", {
    headers: {
      cookie: token,
    },
  });
  const text = await response.text();

  return text;
}

function getGameFreqs(input) {
  const MAX_COLORS = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let games = input.split("\n");
  games = games.map((game) => game.split(";"));

  const regex = /\d+ red|\d+ green|\d+ blue/g;
  let gameStats = [];

  games = games.map((game) => {
    gameStats = game.map((game) => {
      return game.match(regex);
    });
    return gameStats;
  });

  let total = 0;
  for (let i = 0; i < games.length - 1; i++) {
    //init to one since if there are no cubes pulled in the game this won't affect
    //the outcome
    let maxRed = 1;
    let maxGreen = 1;
    let maxBlue = 1;

    for (const pulls of games[i]) {
      for (const pull of pulls) {
        // console.log("🚀 ~ file: advent.js:42 ~ getGameFreqs ~ pull:", pull);

        const [number, color] = pull.split(" ");
        // console.log("🚀 ~ file: advent.js:44 ~ getGameFreqs ~ test:", test);

        // console.log("🚀 ~ file: advent.js:43 ~ getGameFreqs ~ color:", color);
        // console.log("🚀 ~ file: advent.js:43 ~ getGameFreqs ~ number:", number);
        // console.log(
        //   "🚀 ~ file: advent.js:46 ~ getGameFreqs ~ MAX_COLORS:",
        //   MAX_COLORS[color]
        // );
        if (color === "red") maxRed = Math.max(maxRed, number);
        if (color === "blue") maxBlue = Math.max(maxBlue, number);
        if (color === "green") maxGreen = Math.max(maxGreen, number);
      }
    }

    total += maxRed * maxBlue * maxGreen;
  }

  console.log("🚀 ~ file: advent.js:54 ~ getGameFreqs ~ total:", total);
  return total;
  //   const gameStats = bagPulls.map((p) => {});
}

const MAX_VALUES = {
  red: 12,
  green: 13,
  blue: 14,
};
async function testGames(testInput) {
  const input = testInput ? testInput : await getPuzzleInput();

  gameCounters = getGameFreqs(input);
}

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
testGames().then((answer) => console.log("PUZZLE SOLUTION:", answer));
