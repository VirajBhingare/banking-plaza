const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, { autoIndex: false })
        .then(() => console.log("Connected to MongoDB Successfully."))
        .catch(err => console.log("Could not connect to MongoDB", err))
}

module.exports = connectToMongo