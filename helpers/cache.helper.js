// CACHE DB - SAVE & RETIRIVE FONTS (URL) CLASS

// IMPORT MODELS 
const Urls = require('../models/url.model');

class CacheDB {
    // SAVE THE GIVEN URL's FONTS - METHOD
    createFonts = async (ENTRY, CB) => {
        console.log(ENTRY) //CONSOLE LOG DATA 

        // CREATE NEW SCHEMA OBJECT
        const newURL = new Urls({
            id: ENTRY.id,
            state: ENTRY.state,
            progress: ENTRY.progress,
            fonts: ENTRY.fonts
        })

        try {
            await newURL.save((err, payload) => {
                if (err) return CB(err, null)
                console.log(' NEW URL HAS BEEN CACHED TO DATABASE');
                console.log(payload);
            });

        } catch (err) {
            return CB(err, null)
        }
    }
}

// EXPORTS 
module.exports = CacheDB;