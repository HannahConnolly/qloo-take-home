const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());

const DEBUG = true;
const GEN_1_POKEMON = 151;

// "database" of current pokemon
const pokemonTeam = [];

app.get("/fetch-data/:pokemonID?", async (req, res) => {
  try {
    const pokemonID = Number.parseInt(req.params.pokemonID);

    // handle bad param input
    if (pokemonID === NaN) {
      throw Error("Pokemon ID provided could not be parsed as a number");
    }

    // no pokemon ID provided, call random pokemon
    if (!pokemonID) {
      pokemonID = Math.ceil(Math.random() * GEN_1_POKEMON);
    }

    // Contact the Pokemon API to fetch data
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    );
    const data = response.data;

    if (DEBUG) {
      console.log(`200 : /fetch-data recieved a ${data.name}`);
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Pokemon API:", error.message);
    res.status(500).json({ error: "Error Reaching PokemonAPI" });
  }
});

// add pokemon to team
app.post("/process-data", (req, res) => {
  try {
    // Process the data received in the request body
    const { id, name, types } = req.body;

    let typeNames = types.map((type) => type.type.name);

    const parsedPokemon = {
      name,
      id,
      types: typeNames,
    };

    // a team can only have 6 pokemon - remove oldest
    if (pokemonTeam.length > 5) {
      pokemonTeam.shift();
    }

    pokemonTeam.push(parsedPokemon);

    if (DEBUG) {
      console.log(`200 : /process-data received a ${name}`);
      console.log(pokemonTeam);
    }

    res.json({ message: "Pokemon processed successfully", team: pokemonTeam });
  } catch (error) {
    console.error(
      `500 : /process-data - Error processing data: `,
      error.message
    );
    res.status(500).json({ error: "Error processing input Pokemon" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
