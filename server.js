import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';  // Import the cors package

const app = express();
const PORT = 3000;

app.use(cors());  // Enable CORS
app.use(bodyParser.json());

app.post('/search', async (req, res) => {
    const word = req.body.word;
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            return res.json({ word, meaning: "Not found" });
        }
        const data = await response.json();
        if (data.title === "No Definitions Found") {
            res.json({ word, meaning: "Not found" });
        } else {
            const meaning = data[0].meanings[0].definitions[0].definition;
            res.json({ word, meaning });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
