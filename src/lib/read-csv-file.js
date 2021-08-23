const fs = require('fs');
const neatCsv = require('neat-csv');

class ReadCsvFile {
    #fileToConvert;

    constructor(fileToConvert) {
        this.#fileToConvert = fileToConvert;
    }

    async readFile() {
        try {
            const data = fs.readFileSync(this.#fileToConvert,'utf8');
            console.log('Reading CSV data...');
            const tempArr = await neatCsv(data);
            return tempArr;

          } catch (err) {
            console.error(err)
            return `Error reading CSV file: ${err}`;
          }
    }
    
}

module.exports = ReadCsvFile;