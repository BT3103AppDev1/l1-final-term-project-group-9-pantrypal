const express = require('express');
const cors = require('cors');
let fetch;
(async () => {
  const nodeFetch = await import('node-fetch');
  fetch = nodeFetch.default;
})();
const bodyParser = require('body-parser');
const chatGptController = require('./chatGpt.controller');

const functions = require('firebase-functions');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chatbot', chatGptController.askToChatGpt);
app.post('/initial-recipe', chatGptController.generateInitialRecipe);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/fetch-image', async (req, res) => {
  const imageUrl = req.query.url; 

  try {
    const response = await fetch(imageUrl); 
    const imageBuffer = await response.buffer(); 

    res.type(response.headers.get('content-type'));
    res.send(imageBuffer); 
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Failed to fetch image');
  }
});

exports.api = functions.https.onRequest(app);