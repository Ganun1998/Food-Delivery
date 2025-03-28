import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({
      ...data,
      [name]: value
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart'); // Navigate to cart if not authenticated or cart is empty
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input 
            type='text' 
            name='firstName' 
            placeholder='First name' 
            value={data.firstName} 
            onChange={onChangeHandler} 
            required 
          />
          <input 
            type='text' 
            name='lastName' 
            placeholder='Last name' 
            value={data.lastName} 
            onChange={onChangeHandler} 
            required 
          />
        </div>
        <input 
          type='email' 
          name='email' 
          placeholder='Email address' 
          value={data.email} 
          onChange={onChangeHandler} 
          required 
        />
        <input 
          type='text' 
          name='street' 
          placeholder='Street' 
          value={data.street} 
          onChange={onChangeHandler} 
          required 
        />
        <div className="multi-fields">
          <input 
            type='text' 
            name='city' 
            placeholder='City' 
            value={data.city} 
            onChange={onChangeHandler} 
            required 
          />
          <input 
            type='text' 
            name='state' 
            placeholder='State' 
            value={data.state} 
            onChange={onChangeHandler} 
            required 
          />
        </div>
        <div className="multi-fields">
          <input 
            type='text' 
            name='zipcode' 
            placeholder='Zip code' 
            value={data.zipcode} 
            onChange={onChangeHandler} 
            required 
          />
          <input 
            type='text' 
            name='country' 
            placeholder='Country' 
            value={data.country} 
            onChange={onChangeHandler} 
            required 
          />
        </div>
        <input 
          type='text' 
          name='phone' 
          placeholder='Phone' 
          value={data.phone} 
          onChange={onChangeHandler} 
          required 
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee:</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total:</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;