const express = require('express');
const app = express();
require('dotenv').config();

const W3WConvert = require('./classes/w3wc');

const PORT = 3000;

app.get('', (req, res) => {
    res.send({
        'GOOGLE_API_KEY': process.env.GOOGLE_API_KEY,
        'W3W_API_KEY': process.env.W3W_API_KEY
    });
});

app.get('/parse', async (req, res) => {
    const config = [];
    config['fileToConvert'] = 'testcsv.csv';
    config['fileToWrite'] = 'testoutput';

    const w3w = new W3WConvert(config);
    const result = await w3w.convertData();
    console.log('result: ',result);
    res.send(result);
});

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});