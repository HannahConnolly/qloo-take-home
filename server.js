const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

const DEBUG = true
const GEN_1_POKEMON = 151

app.get('/fetch-data/:pokemonID?', async (req, res) => {
  try {
    let pokemonID = Number.parseInt(req.params.pokemonID)

    // handle bad param input
    if(pokemonID === NaN){ 
      throw Error("Pokemon ID provided could not be parsed as a number")
    }
    
    if(!Number.isInteger(pokemonID)){
      throw Error("PokemonID must be an integer")
    }

    // no pokemon ID provided, call random pokemon
    if(!pokemonID){
      pokemonID = Math.ceil(Math.random() * GEN_1_POKEMON)
    }
    
    // Contact the Pokemon API to fetch data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = response.data;

    if(DEBUG){ console.log(`200 : /fetch-data recieved a ${data.name}`) }

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
    const {id, name, types} = req.body;

    let typeNames = requestData.types.map(type => type.type.name)

    parsedPokemon = {
      name,
      id,
      types: typeNames
    }

    if(pokemon_team.length > 5) {
      pokemonList.shift()
    }

    pokemonList.push(parsedPokemon)

    if(DEBUG){ 
      console.log(`200 : /process-data recieved a ${name}`)
      console.log(pokemonList) 
    }

    res.json({ message: 'Pokemon processed successfully', team: pokemonList });
  } catch (error) {
    console.error(`400 : /process-data - Error processing data:', error.message`);
    res.status(400).json({ error: 'Error processing input Pokemon' });
  }
});

// "database" of current pokemon
const pokemon_team = []

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
