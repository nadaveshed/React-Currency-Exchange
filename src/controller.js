const https = require("https");
const axios = require('axios');

exports.convertCurrency = (req, result) => {
    const apiKey = 'dc565e97227dfd5687a0';
    let amount = req.query.amount;
    let from_currency_code = req.query.from_currency_code;
    let to_currency_code = req.query.to_currency_code;

    from_currency_code = encodeURIComponent(from_currency_code).toUpperCase();
    to_currency_code = encodeURIComponent(to_currency_code).toUpperCase();
    let query = from_currency_code + '_' + to_currency_code;

    let uri = 'https://free.currconv.com/api/v7/convert?q='
        + query + '&compact=ultra&apiKey=' + apiKey;

    axios
        .get(uri,{})
        .then(res => {
            try {
                let jsonObj = res.data;
                let val = jsonObj[query];
                if (val) {
                    const total = val * parseFloat(amount);
                    console.log("12345678", total)
                    return result.status(200).json({
                        "exchange_rate": val,
                        "currency_code": to_currency_code,
                        amount: total
                    });
                } else {
                    const err = new Error("Value not found for " + query);
                    return result.sendStatus(400).json({
                        status_code: 0,
                        message: err
                    });
                }
            } catch(e) {
                console.log("Parse error: ", e);
                /*
                return result.sendStatus(200).json({
                    status_code: 0,
                    message: e
                });
                */
            }
        })
        .catch(error => {
            console.error("error", error)
            /* result.send(error)
            return result.sendStatus(400).json({
                status_code: 0,
                message: error
            });*/
        })
};