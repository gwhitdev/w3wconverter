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
