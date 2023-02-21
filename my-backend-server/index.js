const express = require('express');
const cors = require ('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome to Evergreen")
})

const port = process.env.PORT || 5000

console.log("Starting server...")

app.listen(port, console.log(`server running on port ${port}`));
