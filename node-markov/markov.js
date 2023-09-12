/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/
  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */
  getChains() {

    const chains = {};
    for (let i = 0; i < this.words.length; i++){
      let currWord = this.words[i];
      let nextWord = (i < this.words.length-1) ? this.words[i+1] : null;

      if (currWord in chains){
        chains[currWord].push(nextWord);
      } else {
        chains[currWord] = [nextWord];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let currWord = this.words[0];
    const text = [currWord];
    while (currWord){

      const possWords = this.chains[currWord]; //returns list
      const randChoice = Math.floor(Math.random() * possWords.length);
      currWord = possWords[randChoice];

      if (currWord !== null) {
        text.push(currWord);
      }
    }

    return text.join(' ');
  }
}


const fsP = require('fs/promises');
const paths = ['./cummings.txt', './eggs.txt', './gettysburg.txt'];



/** Takes in a file path, awaits the readFile command and returns text as String */
async function readFiles(path){
  const text = await fsP.readFile(path, "utf8");
  return text;
}

/**
 * Selects a random path from paths, reads in text from it, then creates a
 * markov instance and creates several text chains, console logging their results.
 */
async function handleMarkovTests(){
  const choice = Math.floor(Math.random() * paths.length);
  const currPath = paths[choice];

  const text = await readFiles(currPath);

  const testMarkov = new MarkovMachine(text);

  let testWeirdText;
  for (let i = 0; i < 4; i++){
    console.log('text ', i);
    testWeirdText = testMarkov.getText();
    console.log(testWeirdText)
    console.log('\n\n\n\n\n');

  }

}


handleMarkovTests();
