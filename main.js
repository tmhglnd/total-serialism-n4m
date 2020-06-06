
const max = require('max-api');
max.post('total-serialism node started');

const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Util = require('total-serialism').Utility;
const TL = require('total-serialism').Translate;

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
	}
}
max.addHandlers(handlers);