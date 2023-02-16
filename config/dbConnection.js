const mongoose = require('mongoose');

// START MONGODB CONNECTION
const dbConnection = async () => {
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(process.env.MONGO_URI_DEV, mongoOptions, (err) => {
            if (err) return console.log(err.message);
            console.log("DB connected successfully 100%");
        })
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}


// EXPORTS DB CONNECTION MODULE
module.exports = dbConnection;
