import getPuzzleInput from "../api.js";
import TEST_INPUT from "./test.js";

/**
 * gets puzzle input, and finds the lowest plot number to plant the given seeds from input
 * optionally takes input for testing.
 * @param {*} input
 * @returns
 */
async function getSeedLocations(input) {
  input = input ? input : await getPuzzleInput(5);
  //prepare our data
  const { data, seeds } = getData(input);

  let min = Infinity;
  for (let i = 0; i < seeds.length; i += 2) {
    for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
      let currItems = [j];
      for (const locationData of data.values()) {
        currItems = getItems(locationData, currItems);
      }
      min = Math.min(min, ...currItems);
    }
  }

  return min;
}

/**
 * inputs:
 * locationData -
 *  {"item-to-item: [...[source, destination, range]]"}
 * items - [number, number, ...]
 *
 * translates the item numbers into their converted form based on the given locationData, returns new list
 * of item values
 */
function getItems(locationData, items) {
  const newItems = [];

  for (const item of items) {
    let found = false;

    //test curr item against the given data rangees, if it's in that range, then
    //add the mapped item to our new items
    for (const data of locationData) {
      const [dRange, sRange, range] = data;
      //test the source
      //if within source range, get destination and break this loop
      if (sRange <= item && item < sRange + range) {
        found = true;
        let newItem = dRange + (item - sRange);
        newItems.push(newItem);
        break;
      }
    }
    //test if item was found in the given source ranges, if not add the item to
    //new items
    if (!found) {
      newItems.push(item);
    }
  }

  return newItems;
}

/**
 * iterates over our raw puzzle input and returns map of *item-to-item* : [[numbers]]
 * @param {puzzleInput} input
 * @returns {data: Map, seeds: number[]}
 */
function getData(input) {
  input = input.split("\n");

  let seeds = input.shift().match(/\d+/g);
  seeds = seeds.map((str) => Number(str));

  input = input.filter((line) => line !== "");

  const data = new Map();
  let currKey = "";

  for (let line of input) {
    if (isNaN(line[0])) {
      currKey = line.split(" ")[0];
      data.set(currKey, []);
      continue;
    }
    let numbers = line.match(/\d+/g);

    numbers = numbers.map((str) => Number(str));

    data.get(currKey).push(numbers);
  }

  return { data, seeds };
}

getSeedLocations().then((answer) => console.log(`PUZZLE ANSWER: ${answer}`));
