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