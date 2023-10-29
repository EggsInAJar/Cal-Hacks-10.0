import React from 'react';
import '../App.css';
import './restaurantcard.css';
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
      {/* <div className='additionalCard'>
        <div className='gridRow'>
          <div className='gridColumn'>
            <img src={item.additionalImages[0]} alt="Additional View 1"/>
            <p>Text for Image 1</p>
          </div>
          <div className='gridColumn'>
            <img src={item.additionalImages[1]} alt="Additional View 2"/>
            <p>Text for Image 2</p>
          </div>
        </div>
        <div className='gridRow'>
          <div className='gridColumn'>
            <img src={item.additionalImages[2]} alt="Additional View 3"/>
            <p>Text for Image 3</p>
          </div>
          <div className='gridColumn'>
            <img src={item.additionalImages[3]} alt="Additional View 4"/>
            <p>Text for Image 4</p>
          </div>
        </div>
      </div> */}
      <div className='additionalCard'>
        <div className='additionalContent'>
          <img src={item.image} alt="Description 1"/>
          <p>Description 1</p>
          {/* <img src={item.image} alt="Description 2"/>
          <p>Description 2</p>
          <img src={item.image} alt="Description 3"/>
          <p>Description 3</p>
          <img src={item.image} alt="Description 4"/>
          <p>Description 4</p> */}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;