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


// import React from 'react';
// import '../App.css';

// const RestaurantCard = ({ name, cuisine, description, imageSrc }) => {
//   return (
//     <div className="cardStyle">
//       <img className="imageStyle" src={imageSrc} alt={name} />
//       <div className="contentStyle">
//         <h3>{name}</h3>
//         <p>{cuisine}</p>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// };
// // {/* <div className="restaurant-card">
// //       <div className="restaurant-info">
// //         <p className="title">{name}</p>
// //         <p className="cuisine">{cuisine}</p>
// //         <p className="description">{description}</p>
// //       </div> */}

// export default RestaurantCard;