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

  //iterate over our keys, and call each new map with the previous input
  let currItems = seeds;
  for (const locationData of data.values()) {
    currItems = getItems(locationData, currItems);
  }

  //return smallets location plot per puzzle description
  return Math.min(...currItems);
}
console.log(
  "getItems: ",
  getItems(
    [
      [50, 98, 2],
      [52, 50, 48],
    ],
    [79, 14, 55, 13]
  )
);
function getItems(locationData, items) {
  //construct item to destination map
  const newItems = [];

  for (const item of items) {
    let found = false;

    //test curr item against the given data rangees, if it's in that range, then
    //add the mapped item to our new items
    for (const data of locationData) {
      const [dRange, sRange, range] = data;
      //test the source
      if (sRange <= item && item < sRange + range) {
        found = true;
        let newItem = dRange + (item - sRange);
        newItems.push(newItem);
        break;
      }
      //if within source range, get destination and break this loop
      //otherwise next iteration
    }
    //test if item was found in the given source ranges, if not add the item to
    //next items
    if (!found) {
      newItems.push(item);
    }
  }

  // const nextItems = [];
  // for (const item of items) {
  //   const mappedValue = sourceMap.get(item);
  //   const nextItem = mappedValue ? mappedValue : item;
  //   nextItems.push(nextItem);
  // }

  return newItems;
}

/**
 * iterates over our raw puzzle input and returns object of *thing-map* : [numbers]
 * @param {puzzleInput} input
 * @returns
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
