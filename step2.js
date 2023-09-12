"use strict";
const path = process.argv[2];
const fsP = require("fs/promises");

/***
 * Takes in path and prints contents or prints error and stops script.
 */

async function cat(path) {
  try {
    const contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch (err) {
    console.log(err.message);
    process.exit(1)
  }
}

/***
 * Takes in URL and prints HTML or prints error and stops script.
 */

async function webCat(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    console.log(html);
  } catch (err) {
    console.log(err.message);
    process.exit(1)
  }
}

const isURL = URL.canParse(path);

if (isURL) {
  webCat(path);
} else {
  cat(path);
}
