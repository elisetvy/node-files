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
      const currWord = this.words[i];
      const nextWord = this.words[i+1] || null;

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
  //TODO: separation of concerns: could have a 'get random item from array' function.
  getText(limit=false) {
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

    if (limit){
      return text.slice(0,limit).join(' ');
    } else {
      return text.join(' ');
    }
  }
}



class MarkovBigram extends MarkovMachine {
  constructor(text){
    super(text);
    this.bigramChains = this.getBigramChains();
  }

  /**
   * Makes chains with bigrams (2 words at a time are used for chain keys)
   * values are still next word.
   */
  getBigramChains(){
    const chains = {};

    for (let i = 0; i < this.words.length - 1; i++){
      const currWords = this.words[i] + ' ' + this.words[i+1];
      const nextWord = this.words[i+2] || null;

      if (currWords in chains){
        chains[currWords].push(nextWord);
      } else {
        chains[currWords] = [nextWord];
      }
    }
    return chains;
  }
}





const fsP = require('fs/promises');
const paths = ['./cummings.txt', './eggs.txt', './gettysburg.txt'];

/** Takes in a file path, awaits the readFile command and returns text as String */
async function readFiles(path){
  return await fsP.readFile(path, "utf8");
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

  let testMarkovChain;
  for (let i = 0; i < 4; i++){
    console.log('text ', i);
    testMarkovChain = testMarkov.getText(20);
    console.log(testMarkovChain)
    console.log('\n\n\n');

  }

}


//handleMarkovTests();

module.exports = { MarkovMachine, readFiles }


let markovBiTest = new MarkovBigram("the cat in the hat is in the hat");

console.log("new bigram chains are: ", markovBiTest.bigramChains)