import React, { useEffect, useState } from "react";
import "animate.css";
import { Link } from "react-router-dom";
import slugify from "slugify";

const SingleCard = ({ data, setData }) => {
  //   const [data, setData] = useState([]);
  const [openPop, setOpenPop] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };
  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(), // unikal ID üçün
      price: parseFloat(price),
      title: title,
      category: category,
      description: description,
    };

    setData([newProduct, ...data]);
    setOpenPop(false); // popup-u bağla
    setTitle(""); // sahələri təmizlə
    setPrice("");
    setCategory("");
    setDescription("");
  };

  const renderStars = (stars) => {
    const totalStars = 5;
    const roundedStars = Math.round(stars); // yaxud Math.floor, istəyə görə
    let starsArray = [];
    for (let i = 0; i < totalStars; i++) {
      starsArray.push(
        <svg
          key={i}
          width="20"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z"
            fill={i < roundedStars ? "#EBB041" : "none"}
            stroke={i < roundedStars ? "none" : "#EBB041"}
            strokeWidth="0.5"
          />
        </svg>
      );
    }

    return starsArray;
  };
  return (
    <>
      <h1 className="title name">Fake Store</h1>
      <button
        className="back add"
        onClick={() => {
          setOpenPop(!openPop);
        }}
      >
        Add Product
      </button>
      {openPop && (
        <div className="open-pop">
          <div>
            <h1>Add Product</h1>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              step="0.1"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddProduct}>Add</button>
          </div>
        </div>
      )}
      <div className="single-card">
        {data.map((item, index) => (
          <div className="card animate__animated animate__fadeInUp" key={index}>
            <img src={item.image} alt="" />
            <h1>{item.title.slice(0, 16)}...</h1>
            <h3>${item.price}</h3>
            <div className="rating">
              <div>{renderStars(item.rating.rate)}</div>
              <p>{item.rating.rate}</p>
            </div>
            <div className="buttons">
              <Link
                to={`/product-detail/${slugify(item.title || "", {
                  lower: true,
                })}`}
              >
                <button>Details</button>
              </Link>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleCard;
