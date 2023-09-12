"use strict";

//TODO: no need for readFiles, can remove for now.
const { MarkovMachine, readFiles } = require("./markov");
let testMarkov;
let testMarkov2;
let chains;
let chains2;

//TODO: since we're not changing chains/markov, beforeAll better
beforeEach(function() {
  testMarkov = new MarkovMachine('The cat in the hat.');
  chains = {
    "The": ["cat"],
    "cat": ["in"],
    "in": ["the"],
    "the": ["hat."],
    "hat.": [null]
  }

  testMarkov2 = new MarkovMachine('The cat the in the hat.');
  chains2 = {
    "The": ["cat"],
    "cat": ["the"],
    "the": ["in", "hat."],
    "in": ["the"],
    "hat.": [null]
  }
})


describe("getChains", function() {
  //TODO: possible alternative: try to invoke getChains directly.
  test("get chains, no branches", function () {
    expect(testMarkov.chains).toEqual(chains);
  })
  test("get chains from text with branches", function () {
    expect(testMarkov2.chains).toEqual(chains2);
  })
})

describe("getText", function() {
  test("get text for no branches", function() {
    expect(testMarkov.getText()).toEqual("The cat in the hat.");
  })
  test("get text from text with branches", function() {
    expect(testMarkov2.getText()).toContain("The cat the")
    expect(testMarkov2.getText()).toContain("the hat.");
  })
})