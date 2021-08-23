const axios = require('axios');

class W3WAddress {
    #lat = '';
    #long = '';
    constructor(lat,long) {
        this.#lat = lat;
        this.#long = long;
    }

    async getAddress() {
        //console.log('lat:', this.#lat);
        //console.log('lng: ', this.#long);
        //console.log('Getting W3W addresses...');
        const res = await axios.get(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${this.#lat}%2C${this.#long}&key=2JEQ9FTC`);
        const data = res.data;
        console.log('Done getting W3W addresses');
        //console.log('getAddress: ', res.data);
        return {
            data
        };
    }
}

module.exports = W3WAddress;
