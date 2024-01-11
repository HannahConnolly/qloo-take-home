import React, { useState } from 'react';
import './App.css';
const axios = require('axios');

// Card Component
// Card Component
const Card = ({ id, title, content, onClear }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{content}</p>
    <button onClick={() => onClear(id)}>Clear</button>
  </div>
);


// Main App Component
const App = () => {
  const [inputText, setInputText] = useState('');
  const [cards, setCards] = useState([
    { title: 'Card 1', content: 'Content for Card 1' },
    { title: 'Card 2', content: 'Content for Card 2' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 4', content: 'Content for Card 4' },
    { title: 'Card 5', content: 'Content for Card 5' },
    { title: 'Card 6', content: 'Content for Card 6' },
  ]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {

    const response = axios.get(`https://localhost:3001/fetch-data`);
    // Add a new card with the input text
    setCards([...cards, { title: `Card ${cards.length + 1}`, content: inputText }]);
    // Clear the input field
    setInputText('');
  };
  
  const handleClear = (id) => {
    // Remove the specified card from the array
    setCards((prevCards) => prevCards.filter((_, index) => index !== id));
  };

  return (
    <div className="App">
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={index}
            title={card.title}
            content={card.content}
            onClear={handleClear}
          />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter pokeID..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
