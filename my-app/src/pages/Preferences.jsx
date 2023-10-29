import React, { useState } from 'react';
import './Preferences.css';

function Preferences() {
  const goBackToMainPage = () => {
    <a href="/"></a>
  }

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [favoriteFoods, setFavoriteFoods] = useState('');
  const [favoriteFoodsList, setFavoriteFoodsList] = useState([]);
  const [dislikedFoods, setDislikedFoods] = useState('');
  const [dislikedFoodsList, setDislikedFoodsList] = useState([]);
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState([]);

  const cuisines = ['Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'American'];
  const dietaryRestrictions = ['Vegan', 'Vegetarian', 'Halal', 'Nut Allergies', 'Gluten-Free', 'No Beef', 'No Pork'];

  const removeFromFoodsList = (index) => {
    const newFavoriteFoodsList = [...favoriteFoodsList];
    newFavoriteFoodsList.splice(index, 1);
    setFavoriteFoodsList(newFavoriteFoodsList);
  }

  const removeFromDislikedFoodsList = (index) => {
    const newDislikedFoodsList = [...dislikedFoodsList];
    newDislikedFoodsList.splice(index, 1);
    setDislikedFoodsList(newDislikedFoodsList);
  }

  const handleCuisineChange = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleDietaryRestrictionChange = (restriction) => {
    if (selectedDietaryRestrictions.includes(restriction)) {
      setSelectedDietaryRestrictions(selectedDietaryRestrictions.filter(r => r !== restriction));
    } else {
      setSelectedDietaryRestrictions([...selectedDietaryRestrictions, restriction]);
    }
  };

const handleFavoriteFoodsSubmit = (e) => {
  console.log(e)
  e.preventDefault();
  if (favoriteFoods) {
    setFavoriteFoodsList([...favoriteFoodsList, favoriteFoods]);
    setFavoriteFoods('');
  }
};

const handleDislikedFoodsSubmit = (e) => {
  e.preventDefault();
  if (dislikedFoods) {
    setDislikedFoodsList([...dislikedFoodsList, dislikedFoods]);
    setDislikedFoods('');
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here (e.g., send to server, log in console, etc.)
    console.log({
      selectedCuisines,
      priceRange,
      favoriteFoods,
      selectedDietaryRestrictions,
      dislikedFoods
    });
  };

  return (
    <div className="favorite-cuisine-form">
      <button
        onClick={() => goBackToMainPage}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '5px',
          backgroundColor: '#f9f9f9',
          color: 'black',
          borderColor: 'black',
        }}
      >
        Back to Main
      </button>
      <h2>Your Preferences</h2>
      <div>
        <div className="form-group">
          <label>Favorite Cuisines:</label>
          {cuisines.map((cuisine) => (
            <div key={cuisine} className="checkbox-group">
              <input
                type="checkbox"
                id={`cuisine-${cuisine}`}
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => handleCuisineChange(cuisine)}
              />
              <label htmlFor={`cuisine-${cuisine}`}>{cuisine}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Dietary Restrictions:</label>
          {dietaryRestrictions.map((restriction) => (
            <div key={restriction} className="checkbox-group">
              <input
                type="checkbox"
                id={`restriction-${restriction}`}
                checked={selectedDietaryRestrictions.includes(restriction)}
                onChange={() => handleDietaryRestrictionChange(restriction)}
              />
              <label htmlFor={`restriction-${restriction}`}>{restriction}</label>
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Price Range:</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Favorite Foods:</label>
          <form onSubmit={handleFavoriteFoodsSubmit}>
            <input
              type="text"
              value={favoriteFoods}
              onChange={(e) => setFavoriteFoods(e.target.value)}
              placeholder="Type food and press enter"
            />
          </form>
          <div>
            {favoriteFoodsList.map((food, index) => (
              <button key={index} onClick={() => removeFromFoodsList(index)} 
              style={{display:'inline', margin:'1px', backgroundColor: '#f9f9f9', color: 'black', padding: '4px', borderColor: 'black'}}>
                {food}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Foods You Dislike:</label>
          <form onSubmit={handleDislikedFoodsSubmit}>
            <input
              type="text"
              value={dislikedFoods}
              onChange={(e) => setDislikedFoods(e.target.value)}
              placeholder="Type food and press enter"
            />
          </form>
          <div>
            {dislikedFoodsList.map((food, index) => (
              <button key={index} onClick={() => removeFromDislikedFoodsList(index)} 
              style={{display:'inline', margin:'1px', backgroundColor: '#f9f9f9', color: 'black', padding: '4px', borderColor: 'black'}}>
                {food}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Preferences;