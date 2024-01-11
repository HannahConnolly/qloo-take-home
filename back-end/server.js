const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

app.get('/fetch-data/:pokemonID?', async (req, res) => {
  try {
    pokemonID = Number.parseInt(req.params.pokemonID)

    // no pokemon ID provided, call random pokemon
    if(!pokemonID){
      pokemonID = Math.ceil(Math.random() * 151)
    }

    // handle bad param input
    if(!Number.isInteger(pokemonID)){
      throw Error("PokemonID must be an integer")
    }
    
    // Contact the Pokemon API to fetch data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Pokemon API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add pokemon to team
app.post('/process-data', (req, res) => {
  try {
    // Process the data received in the request body
    const requestData = req.body;

    parsedPokemon = {
      name: req.body.name,
      id: req.body.id
    }

    if(pokemonList.length > 5) {
      pokemonList.shift()
    }

    pokemonList.push(parsedPokemon)
    
    console.log(pokemonList)

    res.json({ message: 'Pokemon processed successfully', processedData: requestData });
  } catch (error) {
    console.error('Error processing data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// "database" of current pokemon
pokemonList = []

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
