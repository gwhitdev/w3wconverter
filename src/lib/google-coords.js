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

class GoogleCoords {
    #postcode;
    #coords = {
        'lat':null,
        'lng':null
    };
    constructor(postcode) {
        this.#postcode = postcode;  
    };

    async getCoords(postcode) {
        try {
          return await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${postcode}&inputtype=textquery&fields=geometry&key=${process.env.GOOGLE_API_KEY}`);
        } catch (error) {
          console.error(error)
        }
      }
    
      async setData() {
        const tempData = await this.getCoords(this.#postcode);
        if (tempData.data) {
          this.#coords.lat = tempData.data.candidates[0].geometry.location.lat;
          this.#coords.lng = tempData.data.candidates[0].geometry.location.lng;
        }
      }

    async getLongLat() {
        await this.setData();  
        if(this.#coords.lat) {
            return this.#coords;
        }
    }

}

module.exports = GoogleCoords;