const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class WriteNewCsvFile {
    #done = false;
    #fileToWrite = '';
    #records = [];

    constructor(fileToWrite, records) {
        this.#fileToWrite = fileToWrite;
        this.#records = records;
    }

    showSuccess() {
        if(this.#done === true) {
            return {
                'status': 'Success',
                'message': `Success: new CSV file created: ${this.#fileToWrite}.csv`
            };
        }

        return {
            'status': "Error",
            'message': `Failed to write ${this.#fileToWrite}.csv`
        };
    }
    write() {
        const csvWriter = createCsvWriter({
            path: `${this.#fileToWrite}.csv`,
            header: [
                {id: 'address_number', title: 'ADDRESS_NUMBER'},
                {id: 'postcode', title: 'POSTCODE'},
                {id: 'coords', title: 'COORDS'},
                {id: 'w3w', title: 'W3W'}
            ]
        });
        csvWriter.writeRecords(this.#records)       // returns a promise
        .then(() => {
            this.#done = true;
            console.log('...Done');
        });
        this.showSuccess();
    }
    
}

module.exports = WriteNewCsvFile;