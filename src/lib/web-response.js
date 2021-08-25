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

class WebResponse {
    #records = [];
    #resObject = [];

    constructor(records) {
        this.#records = records;
    }

    response() {
        
        this.#records.forEach((e,key) => {
            this.#resObject.push({
                address_number: this.#records[key].address_number,
                postcode: this.#records[key].postcode,
                coords: this.#records[key].coords,
                w3w: this.#records[key].w3w
            });
        });

        return this.#resObject;
        
    }
}

module.exports = WebResponse;
