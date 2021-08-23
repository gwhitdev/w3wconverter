const express = require('express');
const app = express();
const W3WConvert = require('./classes/w3wc');

const PORT = 3000;

app.get('/parse', async (req, res) => {
    const fileToConvert = 'testcsv.csv';
    const w3w = new W3WConvert(fileToConvert,'TESTOUTPUT');
    const result = await w3w.convertData();
    console.log('result: ',result);
    res.send(result);
})

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})