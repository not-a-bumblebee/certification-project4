const express = require('express')  // We import the express application
const cors = require('cors'); // Necessary for localhost
const app = express() // Creates an express application in app
const apiRoute = require("./routes/api")
const mongoose = require('mongoose');

const uri = "mongodb+srv://bilbo:dildo@charlie-cluster-7.ynbsj0r.mongodb.net/final-project?retryWrites=true&w=majority&appName=Charlie-Cluster-7"

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