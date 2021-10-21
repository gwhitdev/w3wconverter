# What3Words Converter
Need to convert postcodes into What3Words addresses? 
W3WConverter uses Google Places API to convert a postcode into latitude-longitude coordinates and then sends 
these to What3Words via their API to output a CSV file containing What3Words addresses.

## Config
You will need to create a .env file and set the following variables with your own API keys: GOOGLE_API_KEY and W3W_API_KEY.

## Installation
```
npm install w3wconverter
```
```
const W3WConverter = require('w3wconverter');
...
const config = [];
config['fileToConvert'] = <path to file>;
config['fileToWrite'] = <filename without extension>;
config['postcode'] =  <supplied single postcode from JSON>;
const w3wconverter = new W3WConverter(config);

// Returns a Json type response that can be displayed in a webpage. Console also shows 'Done'
const result = w3wconverter.convertData(); 
```

## License
GNU General Public License v3.0