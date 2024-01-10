import { application } from 'express';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [team, setTeam] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [teamAnalysis, setTeamAnalysis] = useState(null);

  const handlePokemonNameChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleTeamChange = (event) => {
    // Assume the team is entered as a comma-separated string
    const teamArray = event.target.value.split(',').map(pokemon => pokemon.trim());
    setTeam(teamArray);
  };

  const getPokemonInfo = async () => {
    try {
      const response = await fetch(`/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemonInfo(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error.message);
    }
  };

  const processTeam = async () => {
    try {
      const response = await fetch('/pokemon/team-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team }),
      });
      const data = await response.json();
      setTeamAnalysis(data);
    } catch (error) {
      console.error('Error processing team:', error.message);
    }
  };

  useEffect(() => {
    if (pokemonName) {
      getPokemonInfo();
    }
  }, [pokemonName]);

  return (
    <div>
      <h1>Pokemon Information Center</h1>

      <div>
        <label htmlFor="pokemonName">Pokemon Name or ID:</label>
        <input
          type="text"
          id="pokemonName"
          value={pokemonName}
          onChange={handlePokemonNameChange}
        />
        <button onClick={getPokemonInfo}>Get Pokemon</button>
      </div>

      {pokemonInfo && (
        <div>
          <h2>{pokemonInfo.name}</h2>
          {/* Display other Pokemon information */}
        </div>
      )}

      <hr />

      <h1>Pokemon Team Analyzer</h1>

      <div>
        <label htmlFor="team">Enter Pokemon Team (comma-separated):</label>
        <input
          type="text"
          id="team"
          value={team.join(', ')}
          onChange={handleTeamChange}
        />
        <button onClick={processTeam}>Process Team</button>
      </div>

      {teamAnalysis && (
        <div>
          <h2>Team Analysis</h2>
          {/* Display team analysis information */}
        </div>
      )}
    </div>
  );
};

export default App
