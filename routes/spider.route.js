const express = require('express');
const Validator = require('../helpers/validator.util');
const router = express.Router();
//const axios = require('axios')
const https = require('https');

// IMPORT CONTROLLERS

// IMPORT HELPERS / UTILS
const ValidatorHelper = require('../helpers/validator.util');
const CacheDB = require('../helpers/cache.helper');


// IMPORT SERVICES
//const webSpider = require('../services/spider.srv');

// MAIN ROUTERS
/*-- GET HOME INDEX API - GET ROUTE --*/
router.get('/', (req, res, next) => {
    return res.status(200).json({ status: 200, message: "Welcome to API V1.0 Index Home" })
})

/*-- POST ROUTE - GET WEBISTE URL --*/
router.post('/spider', (req, res, next) => {
    // GET URL PARAMTER URL VALUE
    const { url } = req.body;
    console.log(req.body)

    // VALIDATOR HELPER
    const Validator = new ValidatorHelper()
    const isValid = Validator.isValidURL(url);
    console.log('URL PATTERN: ' + isValid);
    if (!isValid) {
        return res.status(400).json({ status: 400, message: "URL pattern invalid :(" });
    }

    try {
        // MAKE HTTP CALL TO URL TARGET
        const options = {
            hostname: `${process.env.BASE_API_URL}.herokuapp.com`,
            port: 443,
            path: '/job',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(req.body).length
            }
        };


        const HTTP_REQUEST = https.request(options, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const payload = JSON.parse(data);

                return res.status(200).json({ status: 200, message: `Operation Success`, payload });
            })
        });

        HTTP_REQUEST.on('error', (e) => {
            console.error(e);
        });

        HTTP_REQUEST.write(JSON.stringify(req.body));
        HTTP_REQUEST.end();

    } catch (err) {
        return next(err);
    }

})


/*--- GET URL FONTS - GET ROUTE ---*/
router.get('/spider/:Id', async (req, res, next) => {
    const ID = req.params.Id;

    // CHECK ID VALIDATION
    if (!ID || ID === null || ID === undefined) {
        return res.status(400).json({ status: 400, message: "ID NOT PROVIDED (REQUIRED)" });
    }


    try {
        https.get(`https://${process.env.BASE_API_URL}.herokuapp.com/job/${ID}`, (resp) => {
            let data = "";

            resp.on('data', (chunk) => {
                data += chunk;
            })

            resp.on('end', async () => {
                const payload = JSON.parse(data);
                console.log(payload);
                // CACHE DB INSTANCE 
                const Cache = new CacheDB();

                const Obj = {
                    id: payload.id,
                    state: payload.state,
                    progress: payload.progress,
                    fonts: []
                };

                // ITERATE OVER PAYLOAD > ITEMS OBJECT
                if (payload.returnvalue !== null) {
                    payload.returnvalue.items.map(ele => {
                        Obj.fonts.push({
                            url: ele.url,
                            initiator: ele.initiator.url
                        });
                    })
                }

                // SAVE DATA TO CACHE DB
                try {
                    await Cache.createFonts(Obj, (err, results) => {
                        if (err) {
                            return next(err)
                        }
                    });

                    return res.status(200).json({ status: 200, message: `Operation Success`, payload: Obj });


                } catch (err) {
                    return next(err)
                }
            })
        }).on('error', (err) => {
            return console.log(err);
        })
        //return res.status(200).json({ status: 200, message: "Success", data });
    } catch (err) {
        return next(err)
    }
})

module.exports = router;