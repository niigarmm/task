import React, { useState } from "react";
import SingleCard from "./components/SingleCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SingleCard data={data} setData={setData} />}
          />
          <Route
            path="/product-detail/:slug"
            element={<DetailPage data={data} setData={setData} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
