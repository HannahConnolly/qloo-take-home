const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/fetch-data', async (req, res) => {
  try {
    // Contact the Pokemon API to fetch data
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/1');
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Pokemon API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/process-data', (req, res) => {
  try {
    // Process the data received in the request body
    const requestData = req.body;
    // Add your processing logic here

    res.json({ message: 'Data processed successfully', processedData: requestData });
  } catch (error) {
    console.error('Error processing data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
