const fs = require("fs");
const express = require('express')  // We import the express application
const cors = require('cors'); // Necessary for localhost
const app = express() // Creates an express application in app

const PATH = "./save.json";

app.use(cors())
app.use(express.json())

app.post("/api/save", async (req, res) => {
    let save = req.body;
    console.log("Saving data: ");
    console.log(save);

    fs.writeFile(PATH, JSON.stringify(save), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        res.json({status:"jobs done"})
        console.log('Data written successfully to disk');
    });
})

app.get("/api/load", async (req, res) => {
    fs.readFile(PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Parse the file contents into a JSON object
            const jsonObject = JSON.parse(data);
            console.log('JSON object:', jsonObject);

            res.json(jsonObject)
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
})



const PORT = 3001
// In other environments (e.g., development, production), start the server
let server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});