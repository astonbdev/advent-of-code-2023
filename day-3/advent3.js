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

async function findMissingPart(testInput) {
  let answer = 0;
  const input = testInput
    ? testInput.split("\n")
    : (await getPuzzleInput()).split("\n");
  const regex = /\d+/g;

  for (let lineNum = 0; lineNum < input.length; lineNum++) {
    //execute the regex on each line, finding all numbers in that line
    while ((match = regex.exec(input[lineNum])) !== null) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;
      let number = Number(match);
      let found = false;
      //check top
      for (let i = startIndex - 1; i <= endIndex; i++) {
        //Check to make sure the prev line exist
        if (!input[lineNum - 1]) break;
        if (input[lineNum - 1][i] && input[lineNum - 1][i] !== ".") {
          answer += number;
          found = true;
          break;
        }
      }
      //check middle
      if (
        !found &&
        input[lineNum][startIndex - 1] &&
        input[lineNum][startIndex - 1] !== "."
      ) {
        answer += number;
        continue;
      }
      if (
        !found &&
        input[lineNum][endIndex] &&
        input[lineNum][endIndex] !== "."
      ) {
        answer += number;
        continue;
      }
      //check bottom
      for (let i = startIndex - 1; i <= endIndex; i++) {
        //Check to make sure the prev line exist
        if (found) break;
        if (!input[lineNum + 1]) break;
        if (input[lineNum + 1][i] && input[lineNum + 1][i] !== ".") {
          answer += number;
          found = true;
          break;
        }
      }
    }
  }

  return answer;
}

// /**
//  * parses puzzle input and constructs and returns object
//  * @param {string} input
//  * @returns {symbolLocations: string[], engine: string[][]}
//  */
// function getEngineDetails(input) {
//   let lineLength = 0;
//   const symbolLocations = [];
//   //get length of each input line, this determines
//   //how long each subarray is
//   const engine = input.split("\n");
//   lineLength = engine[0].length;

//   input = input.replace(/\n/g, "");

//   //construct coordinates of our two dimensional array
//   for (let i = 0; i < input.length; i++) {
//     if (isNaN(input[i]) && input[i] !== ".") {
//       const y = Math.floor(i / lineLength);
//       const x = i % lineLength;
//       symbolLocations.push(`${y}-${x}`);
//     }
//   }

//   console.log(
//     "🚀 ~ file: advent3.js:26 ~ getEngineDetails ~ symbolLocations:",
//     symbolLocations
//   );
//   return { symbolLocations, engine };
// }

// /**
//  * takes an array of strings that represent coordinates "y-x",
//  * returns a part number that is a sum of all the valid parts
//  * @param {string[][]} engine
//  * @param {string[]} engineSymbolLocations
//  */
// function getMissingPartNumber({ symbolLocations, engine }) {
//   let partNumberLocations = [];

//   for (location of symbolLocations) {
//     const [y, x] = location.split("-").map((e) => Number(e));
//     const top = {
//       left: [y - 1, x - 1],
//       middle: [y - 1, x],
//       right: [y - 1, x + 1],
//     };
//     const middle = {
//       left: [y, x + 1],
//       right: [y, x - 1],
//     };
//     const bottom = {
//       left: [y + 1, x - 1],
//       middle: [y + 1, x],
//       right: [y + 1, x + 1],
//     };

//     partNumberLocations.push(...getTopAndBottomCoords(top));
//     partNumberLocations.push(...getTopAndBottomCoords(bottom));
//     partNumberLocations.push(...getMiddleCoords(middle));

//     function getTopAndBottomCoords(targets) {
//       const leftCoords = targets.left;
//       const rightCoords = targets.right;
//       const middleCoords = targets.middle;

//       const left = engine[leftCoords[0]][leftCoords[1]];
//       const right = engine[rightCoords[0]][rightCoords[1]];
//       const middle = engine[middleCoords[0]][middleCoords[1]];

//       if (!isNaN(left) && !isNaN(middle) && !isNaN(right)) {
//         return [`${leftCoords[0]}-${leftCoords[1]}`];
//       }

//       if (!isNaN(left) && !isNaN(middle)) {
//         return [`${leftCoords[0]}-${leftCoords[1]}`];
//       }

//       if (!isNaN(right) && !isNaN(middle)) {
//         return [`${middleCoords[0]}-${middleCoords[1]}`];
//       }

//       const output = [];
//       if (!isNaN(left)) output.push(`${leftCoords[0]}-${leftCoords[1]}`);
//       if (!isNaN(right)) output.push(`${rightCoords[0]}-${rightCoords[1]}`);
//       if (!isNaN(middle)) output.push(`${middleCoords[0]}-${middleCoords[1]}`);

//       return output;
//     }

//     function getMiddleCoords(targets) {
//       const leftCoords = targets.left;
//       const rightCoords = targets.right;

//       const left = engine[leftCoords[0]][leftCoords[1]];
//       const right = engine[rightCoords[0]][rightCoords[1]];

//       const output = [];
//       if (!isNaN(left)) output.push(`${leftCoords[0]}-${leftCoords[1]}`);
//       if (!isNaN(right)) output.push(`${rightCoords[0]}-${rightCoords[1]}`);

//       return output;
//     }

//     // for (let row in relativeCompassLocations) {
//     //   for (let direction in relativeCompassLocations[row]) {
//     //     let count = 0;
//     //     const [dirY, dirX] =
//     //       relativeCompassLocations[row][direction].split("-");
//     //     if (engine[dirY] !== undefined && !isNaN(engine[dirY][dirX])) {
//     //       partNumberLocations.push(relativeCompassLocations[row][direction]);
//     //       count++;
//     //     }

//     //     if (count === 3) {
//     //       partNumberLocations.pop();
//     //       partNumberLocations.pop();
//     //     }
//     //   }
//     // }
//   }

//   console.log(
//     "🚀 ~ file: advent3.js:137 ~ getMissingPartNumber ~ partNumberLocations:",
//     partNumberLocations
//   );
//   const partNumbers = getPartNumbers(partNumberLocations, engine);

//   let partNumber = 0;
//   for (let number of partNumbers) {
//     partNumber += Number(number);
//   }

//   return partNumber;
// }

// /**
//  * takes an array of strings like "y-x" that represent found numbers in the engine array
//  * find and constructs all of the digits in the part number and returns an array of these
//  * numbers
//  * @param {string[]} partNumberLocations
//  * @returns {number[]} partNumbers
//  */
// function getPartNumbers(partNumberLocations, engine) {
//   const partNumbers = [];
//   for (const location of partNumberLocations) {
//     let [y, x] = location.split("-");
//     y = Number(y);
//     x = Number(x);

//     let number = engine[y][x];
//     let left = 1;
//     let right = 1;

//     let num1 = Number(engine[y][x - left]);
//     let num2 = Number(engine[y][x + right]);

//     while (num1 || num2) {
//       // number = num1 ? engine[y][x - i] + number : number;
//       // number = num2 ? number + engine[y][x + i] : number;
//       if (num1) {
//         number = engine[y][x - left] + number;
//         left++;
//       }
//       if (num2) {
//         number = number + engine[y][x + right];
//         right++;
//       }
//       // console.log(
//       //   "🚀 ~ file: advent3.js:124 ~ getPartNumbers ~ number:",
//       //   number
//       // );
//       num1 = Number(engine[y][x - left]);
//       // console.log("🚀 ~ file: advent3.js:129 ~ getPartNumbers ~ num1:", num1);
//       num2 = Number(engine[y][x + right]);
//       // console.log("🚀 ~ file: advent3.js:131 ~ getPartNumbers ~ num2:", num2);
//     }

//     // console.log("🚀 ~ file: advent3.js:114 ~ getPartNumbers ~ number:", number);
//     partNumbers.push(Number(number));
//   }

//   return partNumbers;
// }

// /**
//  *
//  * returns integer representing the missing part from the puzzle input
//  * @param {string} testInput
//  */
// async function findMissingPart(testInput) {
//   const input = testInput ? testInput : await getPuzzleInput();

//   const engine = getEngineDetails(input);
//   const partNumber = getMissingPartNumber(engine);

//   return partNumber;
// }

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
findMissingPart().then((answer) => {
  console.log("Puzzle Answer: ", answer);
});
