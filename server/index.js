require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const router = require("./routes/routes.js");


app.use(cors({origin: "*"}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);
app.use(cors)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})