//importing all neccessary packages.
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");


//middlewares
const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 4500;

//api to sending request to chatgpt api and get neccessary stuff and send to frontend
app.post("/completions", async (req, res) => {
    const options = {
        method:"POST",
        headers:{
            "Authorization" : `Bearer ${process.env.API_KEY}`,
            "Content-Type" : "application/json",
        },
        body :JSON.stringify({
            model : "gpt-3.5-turbo",
            messages : [{ role: "user", content:req.body.message}],
            max_tokens : 100,
        })
    }
    try {
        //making request to chatGPT for required by giving prompt
        const response = await fetch('https:api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong with ChatGPT" });
    }
});

//starting server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});