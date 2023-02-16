// GLOBAL VALIDATOR

class Validator {

    // VALIDATE INPUTS 
    isValidURL(URL) {
        const pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

        // CHECK URL VALIDATION
        if (URL.match(pattern)) {
            return true;
        } else {
            return false;
        }

    }

}


// EXPORTS 
module.exports = Validator;