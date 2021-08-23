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
