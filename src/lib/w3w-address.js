const axios = require('axios');

class W3WAddress {
    #lat = '';
    #long = '';
    constructor(lat,long) {
        this.#lat = lat;
        this.#long = long;
    }

    async getAddress() {
        const res = await axios.get(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${this.#lat}%2C${this.#long}
            &key=${process.env.W3W_API_KEY}`);
        const data = res.data;
        console.log('Finished fetching W3W address.');
        return {
            data
        };
    }
}

module.exports = W3WAddress;
