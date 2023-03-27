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
    <div className="flex flex-col items-center justify-center bg-gray-100 py-10">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {filteredCartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-2xl">
          {filteredCartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-300">
              <img className="w-16 h-16 object-contain mr-4" src={item.image} alt="" />
              <div className="flex-grow">
                <p className="text-lg font-medium">{item.title}</p>
                <p className="text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
              <button className="text-red-600 hover:text-red-800 font-medium" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-lg font-medium">Total: ${cartTotal}</p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
              onClick={() => {
                setCartItems([]);
                  for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith('cart-')) {
                      localStorage.removeItem(key);
                    }
                  }
                }}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
