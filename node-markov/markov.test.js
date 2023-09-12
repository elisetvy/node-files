"use strict";

const { MarkovMachine, readFiles } = require("./markov");
let testMarkov;
let chains;

beforeEach(function() {
  testMarkov = new MarkovMachine('The cat in the hat.');
  chains = {
    "The": ["cat"],
    "cat": ["in"],
    "in": ["the"],
    "the": ["hat."],
    "hat.": [null]
  }
})

test("get chains", function () {
  expect(testMarkov.chains).toEqual(chains);
})

test("get text", function() {
  expect(testMarkov.getText()).toEqual("The cat in the hat.");
})
