"use strict";
const fsP = require("fs/promises");
const userArgs = process.argv;

/***
 * Takes in path and prints contents or prints error and stops script.
 */

async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(err.message);
    process.exit(1)
  }

  return contents;
}

/***
 * Takes in URL and prints HTML or prints error and stops script.
 */

async function webCat(url) {
  console.log('got to webCat');
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.log(err.message);
    process.exit(1)
  }

  const html = await response.text();

  return html;
}


/**
 * Check if user wants to output result to a new file.
 * If so, print to provided file path, otherwise log to console.
 */
async function handleFileWrite(){
  const path = userArgs.slice(-1)[0];
  const isURL = URL.canParse(path);

  let returnedResult;
  if (isURL) {
    returnedResult = await webCat(path);
  } else {
    returnedResult = await cat(path);
  }

  //Figure out what to do with result
  if (userArgs[2] === "--out"){
    const newFilePath = userArgs.slice(-2)[0];
    await fsP.writeFile(`./${newFilePath}`, returnedResult, "utf8");
  } else {
    console.log(returnedResult);
  }
}

handleFileWrite();




