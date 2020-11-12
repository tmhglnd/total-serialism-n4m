
const max = require('max-api');
max.post('total-serialism node started');

const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Util = require('total-serialism').Utility;
const TL = require('total-serialism').Translate;

// These are just a small selection of all the available functions!
// You can visit the documentation on 
// http://tmhglnd.github.io/total-serialism

const handlers = {
	'randomSeed' : (seed) => {
		// set the random seed for the RNG
		// arguments: int/symbol
		Rand.seed(seed);
	},
	'euclid' : (length, beats, rotate) => {
		// generate a euclidean rhythm
		// arguments: length of rhythm, amount of beats (1's), rotate
		max.outlet(Algo.euclid(length, beats, rotate));
	},
	'random' : (length, low, high) => {
		// generate a list of random values between high and low range
		// arguments: length, low-value, high-value
		max.outlet(Rand.randomFloat(length, low, high));
	},
	'shuffle' : (...list) => {
		// gather all arguments into one array
		// shuffle an input list, the shuffle is influenced by the random seed
		max.outlet(Rand.shuffle(list));
	},
	'spreadInclusive' : (length, from, to) => {
		// generate a list of values evenly spread between low and high
		// arguments: length, from, to (inclusive)
		max.outlet(Gen.spreadInclusive(length, from, to));
	},
	'sine' : (length, period, lo, hi) => {
		// generate periods of a sine wave between lo and hi values
		max.outlet(Gen.sine(length, period, lo, hi));
	},
	'stretch' : (list, length) => {
		// split first argument symbol into array of numbers
		list = list.split(" ").map(x => Number(x));
		
		// stretch a list to a specified length, interpolating all
		// values in between first and last numbers
		max.outlet(Mod.stretch(list, length));
	},
	'expand' : (list, length) => {
		// split first argument symbol into array of numbers
		list = list.split(" ").map(x => Number(x));

		// expand a list to a specified length, analyzing the 
		// internal pattern and randomly generating the following
		// steps based on that analysis.
		// Part of the Stochastic library because involves randomness
		max.outlet(Rand.expand(length, list));
	},
	'clone' : (list, ...clones) => {
		// split first argument symbol into array of numbers
		list = list.split(" ").map(x => Number(x));
		
		// transform a list of values into multiple cloned version
		// the value determines an offset in the clone
		// arguments: list-to-clone, clone-values
		max.outlet(Mod.clone(list, ...clones));
	},
	'hexBeat' : (hex) => {
		// generate a hexadecimal beat
		max.outlet(Algo.hexBeat(hex));
	},
	'plot' : (...list) => {
		// plot a list to the max console or output as text to max
		let res = Util.plot(list);

		max.outlet('print', res);
		max.post(res);
	},
	'draw' : (...list) => {
		// darw an ascii-image of the incoming list and output/print
		let res = Util.draw(list);
		
		max.outlet('print', res);
		max.post(res);
	}
}
max.addHandlers(handlers);