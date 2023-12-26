import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productInfo, setProductInfo] = useState([]);

  const getProductInfo = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductInfo(result.data.data);
  };

  const deleteProductInfo = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getProductInfo();
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productInfo.map((item) => {
          return (
            <div key={item.id} className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                onClick={() => {
                  deleteProductInfo(item.id);
                }}
                className="delete-button"
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
