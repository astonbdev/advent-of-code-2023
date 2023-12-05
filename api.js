const token = process.env.AOC_24_TOKEN;

/**
 * fetch the puzzle data and return the response
 * @returns puzzle text
 */
export default async function getPuzzleInput() {
  const response = await fetch("https://adventofcode.com/2023/day/4/input", {
    headers: {
      cookie: token,
    },
  });
  const text = await response.text();

  return text;
}
