const WebResponse = require('./webresponse');
const W3WAddress = require('./w3waddress');
const ReadCsvFile = require('./ReadCsvFile');
const GoogleCoords = require('./googlecoords');
const WriteNewCsvFile = require('./WriteNewCsvFile');

class W3WConverter {
    #latLong = [];
    #words = [];
    #records = [];
    #fileToConvert = '';
    #fileToWrite = '';

    constructor(fileToConvert,fileToWrite) {
        this.#fileToConvert = fileToConvert;
        this.#fileToWrite = fileToWrite;
    }

    async getPostcodes() {
        return new ReadCsvFile(this.#fileToConvert).readFile();
    };

    async getLatLongCoords(postcode) {
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
        //console.log('this.latLong: ', this.#latLong);
        let temp = [];
        for(let i = 0; i < this.#latLong.length; i++) {
            temp = await (await this.getW3WAddress(this.#latLong[i].lat,this.#latLong[i].lng)).data.words;
            this.#words[i] = temp;
        }

        this.#words.forEach((w,key) => {
            const lat = this.#latLong[key].lat;
            const lng = this.#latLong[key].lng;
            console.log('lng: ', lng);
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