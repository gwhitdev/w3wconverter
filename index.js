const express = require('express');
const app = express();
const W3WConvert = require('./classes/w3wc');

const PORT = 3000;


const fileToConvert = 'finalfinal.csv';
const w3w = new W3WConvert(fileToConvert,'23AUG21OUTPUT');
const result = w3w.convertData();
console.log(result);