import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import slugify from "slugify";

import "animate.css";

const DetailPage = ({ data }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null); // Tapılan məhsulu saxlayırıq

  const [openPop,setOpenPop] = useState(false)
  useEffect(() => {
    if (data.length > 0) {
      const foundProduct = data.find(
        (item) => slugify(item.title || "", { lower: true }) === slug
      );
      setProduct(foundProduct); // Məhsulu set edirik
    }
  }, [slug, data]);

  if (!product) {
    return <div>Product not found!</div>;
  }
  return (
    <div className="product-detail">
      <Link to={"/"}>
        <h1 className="title">Fake Store</h1>
      </Link>
      <div className="detail animate__animated animate__fadeInLeft">
        <img src={product.image} alt={product.title} />
        <div>
          <h1>{product.title}</h1>
          <span>
            <b>Category</b>: {product.category}
          </span>
          <p className="price">${product.price}</p>
          <div className="buttons">
            <button>Add To Card</button>
            <button>Add To Wishlist</button>
          </div>
          <p>{product.description}</p>
          <div style={{ gap: "20px",display:"flex" }}>
            <Link to={"/"}>
              <button className="back">Back Home</button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
