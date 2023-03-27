import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/shop.jpg';
import './home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [numItems, setNumItems] = useState(1);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const cartObject = {};
        data.forEach(product => {
          cartObject[product.id] = 0;
        });
        setCart(cartObject);
        setProducts(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

  const handleAddToCart = (productId, quantity) => {
  const newCart = {...cart};
  newCart[productId] += quantity;
  setCart(newCart);
  
  const product = products.find(product => product.id === productId);
  const cartItem = {
    id: product.id,
    image: product.image,
    quantity: quantity,
    price: product.price
  };
  
  localStorage.setItem(`cart-${product.id}`, JSON.stringify(cartItem));
}

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const searchedProducts = searchTerm ? filteredProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredProducts;

  return (
    <div>
      <nav>
        <div className="navbar-logo">
          <img src={logoImage} alt="hello" />
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search" onChange={handleSearch} />
        </div>
        <div className="navbar-cart">
          <Link to="/Cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{Object.values(cart).reduce((total, count) => total + count, 0)}</span>
          </Link>
        </div>
      </nav>
      <div className="navbar-sections">
        <button className="section-button" onClick={() => handleCategoryClick(null)}>All</button>
        <button className="section-button" onClick={() => handleCategoryClick("men's clothing")}>Male</button>
        <button className="section-button" onClick={() => handleCategoryClick("women's clothing")}>Female</button>
        <button className="section-button" onClick={() => handleCategoryClick("jewelery")}>Jewelery</button>
        <button className="section-button" onClick={() => handleCategoryClick("electronics")}>Electronics</button>
      </div>
      <div className="content-container">
        {searchedProducts.map(product => (
          <div className="product" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img className="product-image" src={product.image} alt="" />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.id}`}>
                <h2 className="product-title">{product.title}</h2>
              </Link>
              <p className="product-price">${product.price}</p>
              <p className="product-stock">{product.quantity} In Stock: </p>
              <div className="add-to-cart">
                <input type="number" min="1" defaultValue="1" onChange={(e) => setNumItems(parseInt(e.target.value))} />
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.id, numItems)}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;