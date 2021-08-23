const axios = require('axios');

class GoogleCoords {
    #tempData;
    #coords = {
        'lat':null,
        'lng':null
    };
    constructor(postcode) {
        this.postcode = postcode;  
    };

    async getCoords(postcode) {
        try {
          return await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${postcode}&inputtype=textquery&fields=geometry
                          &key=${process.env.GOOGLE_API_KEY}`);
        } catch (error) {
          console.error(error)
        }
      }
    
      async setData() {
        const mydata = await this.getCoords(this.postcode);
        if (mydata.data) {
          this.#coords.lat = mydata.data.candidates[0].geometry.location.lat;
          this.#coords.lng = mydata.data.candidates[0].geometry.location.lng;
          //console.log(this.#coords);
        }
      }

    async getLongLat() {
        await this.setData();
        //this.getCoords(this.postcode);
        
        if(this.#coords.lat) {
            return this.#coords;
        }
    }

}

module.exports = GoogleCoords;