import React, { useState, useEffect } from 'react';
import "./cart.css"

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('cart-')) {
        cart[key.slice(5)] = JSON.parse(localStorage.getItem(key));
      }
    }
    setCartItems(Object.values(cart));
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCart);
    localStorage.removeItem(`cart-${itemId}`);
  }

  const handleAddToCart = (item) => {
    const newCart = { ...cartItems };
    const index = newCart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      newCart[index].quantity++;
    } else {
      newCart.push({ ...item, quantity: 1 });
    }
    setCartItems(newCart);
    localStorage.setItem(`cart-${item.id}`, JSON.stringify(item));
  }

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  const filteredCartItems = cartItems.filter(item => item.category !== "men's clothing");

  return (
    <div>
      <h1>Shopping Cart</h1>
      {filteredCartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {filteredCartItems.map(item => (
            <div key={item.id}>
              <img class = "cart-image" src={item.image} alt="" />
              <p>{item.quantity} x {item.title} - ${item.price.toFixed(2)}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${cartTotal}</h2>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
