const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// START BUILDING URL SCHEMA
const URLSchema = new Schema({
    id: {
        type: String,
        trim: true,
        index: true,
        required: [true, 'ID required :(']
    },
    state: {
        type: String,
        trim: true,
        default: "Inactive",
        index: true
    },
    progress: {
        type: Number,
        default: 0,
        trim: true,
        index: true,
    },
    fonts: []

}, { timestamps: true })

// EXPORTS MODEL 
module.exports = mongoose.model('urls', URLSchema);