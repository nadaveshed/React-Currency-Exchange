module.exports = (app) => {
    const currency = require('../src/controller.js');
    app.get('/api/quote', currency.convertCurrency);
}