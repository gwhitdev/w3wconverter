/**** W3WConverter turns a postcode into a set of lat-long coordinates via the Google Places API
    and then, in turn, converts these into a What3Words address via the W3W API.
    Copyright (C) 2021  Gareth Whitley

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>. ****/

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