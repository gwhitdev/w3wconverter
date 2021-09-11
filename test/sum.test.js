const W3WConverter = require('../src/lib/w3wc')

const config = [];
config['fileToConvert'] = 'jestTestIn.csv';
config['fileToWrite'] = 'jestTestOut';
const w3w = new W3WConverter(config);

const informationArr = [];
informationArr['rows'] = 3;

const response = w3w.webResponseV2(informationArr);

test('returns response object with number of rows as 3', () => {
    expect(response).toStrictEqual({"numberOfRows":3});
});
