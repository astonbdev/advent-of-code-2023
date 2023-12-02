async function getPuzzleInput() {
  const response = await fetch("https://adventofcode.com/2023/day/1/input", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie:
        "ru=53616c7465645f5f48a33c8c818464976009b07687ce8fe3aa31b4b1e8b5d39eea4495fcb3ade5b664992d99e8c7c438; session=53616c7465645f5f27d9801cdad6b64a9a98a29a02d99d57685bef6cc6bea8dadad6f5927593863a4cbf1fdc7f817cba50b9d244429025ba5767f8f039c65ef6",
      Referer: "https://adventofcode.com/2023/day/1",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  });
  const text = await response.text();

  return text;
}

async function decodeCalibration() {
  const input = await getPuzzleInput();
  const calibrations = parsePuzzleInput(input);
  console.log(
    "🚀 ~ file: advent.js:37 ~ decodeCalibration ~ calibrations:",
    calibrations
  );
}

// const token = process.env.AOC_24_TOKEN;
// console.log("🚀 ~ file: advent.js:13 ~ token:", token);
function parsePuzzleInput(input) {
  return input.split(/\r?\n/);
}

decodeCalibration();
