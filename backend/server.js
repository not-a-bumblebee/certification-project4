const express = require('express')  // We import the express application
const cors = require('cors'); // Necessary for localhost
const app = express() // Creates an express application in app
const apiRoute = require("./routes/api")
const mongoose = require('mongoose');
require('dotenv').config()


const uri = process.env.MONGO_URI

mongoose.connect(uri)
    .then(() => console.log('Connected!'));
const PATH = "./save.json";

app.use(cors())
app.use(express.json())

app.use("/api", apiRoute)



const PORT = 3001
// In other environments (e.g., development, production), start the server
let server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
if (process.env.NODE_ENV === 'test') {
    // In test environment, export the app instance for testing
    module.exports = { server, mongoose };
}