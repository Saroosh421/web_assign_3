import React from 'react';
import './product.css';

function ProductDescription() {
  const productId = window.location.pathname.split('/')[2];
  const [product, setProduct] = React.useState({});
  const [color, setColor] = React.useState('black');
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState('medium');

  const getData = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await response.json();
    setProduct(product);
  };

  React.useEffect(() => {
      getData();
  }, []);

  const handleColorChange = (color) => {
    setColor(color);
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  }

  const handleSizeChange = (size) => {
    setSize(size);
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      color: color,
      size: size,
      quantity: quantity
    };
    // add cartItem to cart using your cart state
  }

  return (
    <div className="product-description-container">
      <div className="product-description-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-description-info">
        <h1 className="product-description-title">{product.title}</h1>
        <p className="product-description-price">Price: ${product.price}</p>
        <p className="product-description-description">{product.description}</p>
        <div className="product-description-options">
          <p>Color:</p>
          <div className="color-options">
            <button className={color === 'black' ? 'active' : ''} onClick={() => handleColorChange('black')}>Black</button>
            <button className={color === 'white' ? 'active' : ''} onClick={() => handleColorChange('white')}>White</button>
            <button className={color === 'blue' ? 'active' : ''} onClick={() => handleColorChange('blue')}>Blue</button>
            <button className={color === 'red' ? 'active' : ''} onClick={() => handleColorChange('red')}>Red</button>
            <button className={color === 'green' ? 'active' : ''} onClick={() => handleColorChange('green')}>Green</button>
          </div>
          <span>
            <p>Quantity: &nbsp;&nbsp;
              <select onChange={handleQuantityChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </p>
          </span>
          <span>
            <p>Size: &nbsp;&nbsp;
              <select onChange={(e) => handleSizeChange(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </p>
          </span>
          <button className="add-to-cart-product" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
