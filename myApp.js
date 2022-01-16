var moment = require('moment');

/**
 * @param {Express} Express instance
 */
const myApp = function(app) {
  app.get('/api/:input?', function(req, res) {
    const input = req.params.input;
    console.log('input', input);

    let result;
    if (typeof input === 'undefined' || input === '') {
      // no input provided, use current time instead
      result = moment.now();
    } else if (!isNaN(input)) {
      // given input is a timestamp
      result = moment(parseInt(input));
    } else {
      // given input is not a timestamp
      const parsedInput = new Date(input);
      if (parsedInput instanceof Date && !isNaN((parsedInput))) {
        result = moment(input);
      }
    }

    console.log('result', result);

    if (result == null) {
      res.json({
        error: 'Invalid Date'
      });
    } else {
      res.json({
        unix: result.format('x'),
        utc: result.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
      });
    }
    
  });
}

module.exports = myApp;