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

const WebResponse = require('./web-response');
const W3WAddress = require('./w3w-address');
const ReadCsvFile = require('./read-csv-file');
const GoogleCoords = require('./google-coords');
const WriteNewCsvFile = require('./write-new-csv-file');
const WebResponseV2 = require('./web-response-v2');

class W3WConverter {
    #latLong = [];
    #words = [];
    #records = [];
    #fileToConvert = '';
    #fileToWrite = '';
    #postcode = '';

    constructor(config) {
        this.#fileToConvert = config['fileToConvert'] ? config['fileToConvert'] : '';
        this.#fileToWrite = config['fileToWrite'] ? config['fileToWrite'] : '';
        this.#postcode = config['postcode'] ? config['postcode'] : '';
    }

    getPostcodes() {
        if(this.#postcode.length > 0) {
            return [{'postcode': this.#postcode}];
        }
        return new ReadCsvFile(this.#fileToConvert).readFile();
    };

    getLatLongCoords(postcode) {
        const attempt = new GoogleCoords(postcode);
        return attempt.getLongLat();
    }

    getW3WAddress(lat,long) {
        const w3w = new W3WAddress(lat,long);
        return w3w.getAddress();
    }

    giveWebResponse() {
        return new WebResponse(this.#records).response();
    }

    writeNewCsvFile() {
        const fileToWrite = this.#fileToWrite;
        const records = this.#records;
        return new WriteNewCsvFile(fileToWrite, records).write();
    }

    countRows(postcodesArr) {
        let numberOfRows = 0;
        postcodesArr.forEach(e => {
            numberOfRows++;
        });
        return numberOfRows;
    }

    webResponseV2(informationArr) {
        const response = WebResponseV2;
        response.numberOfRows = informationArr['rows'];
        return response;
    }


    async convertData() {
        console.log('Converting data...');
        const postcodes = await this.getPostcodes();
        let response = {};
        if(postcodes.length > 1) {
            const numberOfRows = this.countRows(postcodes);
            const informationArr = [];
            informationArr['rows'] = numberOfRows;
            response = this.webResponseV2(informationArr);
        }
        console.log('postcodes:',postcodes);
        for(let i = 0; i < postcodes.length; i++) {

            this.#latLong[i] = await this.getLatLongCoords(postcodes[i].postcode);
            console.log(this.#latLong[i]);
        }

        let temp = [];
        for(let i = 0; i < this.#latLong.length; i++) {
            temp = await (await this.getW3WAddress(this.#latLong[i].lat,this.#latLong[i].lng)).data.words;
            console.log('temp:',temp);
            this.#words[i] = temp;
        }
        if(postcodes.length > 1) {
            this.#words.forEach((w,key) => {
                const lat = this.#latLong[key].lat;
                const lng = this.#latLong[key].lng;

                this.#records.push({
                    address_number: `${postcodes[key].address_number}`,
                    postcode: `${postcodes[key].postcode}`,
                    coords: `${lat},${lng}`,
                    w3w: `${w}`
                });
            })

            this.writeNewCsvFile();
            return response;
        }
        console.log(this.#words[0]);
        return {
            'w3waddress': this.#words[0]
        };


        
    }
}

module.exports = W3WConverter;