const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

DEBUG = true

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

    if(DEBUG){ console.log(`${res.status} : /fetch-data recieved a ${req.body.name}`) }

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

    let types = req.body.types.map(type => type.type.name)

    parsedPokemon = {
      name: req.body.name,
      id: req.body.id,
      types: types
    }

    if(pokemonList.length > 5) {
      pokemonList.shift()
    }

    pokemonList.push(parsedPokemon)

    if(DEBUG){ 
      console.log(`200 : /process-data recieved a ${req.body.name}`)
      console.log(pokemonList) 
    }

    res.json({ message: 'Pokemon processed successfully', processedData: requestData });
  } catch (error) {
    console.error(`400 : /process-data - Error processing data:', error.message`);
    res.status(400).json({ error: 'Error processing input Pokemon' });
  }
});

// "database" of current pokemon
pokemonList = []

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
