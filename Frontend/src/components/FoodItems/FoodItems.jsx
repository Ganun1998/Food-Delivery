import React, { useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './FoodItems.css';
import { assets } from '../../assets/assets'; 
import { StoreContext } from '../../context/StoreContext';

const FoodItems = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
      <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
        {
          !cartItems[id]
           ?<img
              className='add'
              onClick={() => addToCart(id)} 
              src={assets.add_icon_white}
              alt="Add"
            />
           :<div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)} 
                src={assets.remove_icon_red}
                alt="Remove"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)} 
                src={assets.add_icon_green}
                alt="Add"
              />
            </div>
        }
      </div>

      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

// PropTypes validation
FoodItems.propTypes = {
  id: PropTypes.number.isRequired,      
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItems;