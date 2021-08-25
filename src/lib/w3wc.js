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

class W3WConverter {
    #latLong = [];
    #words = [];
    #records = [];
    #fileToConvert = '';
    #fileToWrite = '';

    constructor(config) {
        this.#fileToConvert = config['fileToConvert'];
        this.#fileToWrite = config['fileToWrite'];
    }

    getPostcodes() {
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

    async convertData() {
        console.log('Converting data...');
        const postcodes = await this.getPostcodes();

        for(let i = 0; i < postcodes.length; i++) {
            this.#latLong[i] = await this.getLatLongCoords(postcodes[i].postcode);
        }

        let temp = [];
        for(let i = 0; i < this.#latLong.length; i++) {
            temp = await (await this.getW3WAddress(this.#latLong[i].lat,this.#latLong[i].lng)).data.words;
            this.#words[i] = temp;
        }

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
        return this.giveWebResponse();
        
    }
}

module.exports = W3WConverter;