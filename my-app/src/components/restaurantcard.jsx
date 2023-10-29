import React from 'react';
import '../App.css';
import RestaurantImage from '../assets/restaurant.jpg';


function RestaurantCard({item}) {
  return (
    <div className='cardBox'>
      <div className='left'>
        <h1 className='resName'>{item.name}</h1>
        <p className='cus'>{item.cuisine}</p>
        <p className='des'>{item.description}</p>

      </div>
      <div className='right'>
        <img className='resImg' src={item.image}/>
      </div>
    </div>
  );
};

export default RestaurantCard;