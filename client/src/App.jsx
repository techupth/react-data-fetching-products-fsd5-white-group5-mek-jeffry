import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [blogPost, setBlogPost] = useState([]);
  const getBlogPost = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setBlogPost(result.data.data);
    console.log(result);
  };

  const delBlogPost = async (index) => {
    try {
      await axios.delete(`http://localhost:4001/products/${blogPost[index].id}`);
      const newBlogPost = [...blogPost];
      newBlogPost.splice(index, 1);
      setBlogPost(newBlogPost);
    } catch (error) {
      console.log("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
    }
  };
  useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {blogPost.map((post, index) => {
          return (
            <div key={index} className="product">
              <div className="product-preview">
                <img
                  src="https://via.placeholder.com/350/350"
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {post.name}</h1>
                <h2>Product price: {post.price} Baht</h2>
                <p>Product description: {post.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  delBlogPost(index);
                }}
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
