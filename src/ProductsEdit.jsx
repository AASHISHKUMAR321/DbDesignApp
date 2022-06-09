import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";

const ProductsDiv = styled.div`
  width: 100%;
  input {
    padding: 10px;
  }
  #create {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    gap: 10px;
  }
  table {
    margin: auto;
  }
  table th {
    border: 1px solid black;
    cursor: pointer;
  }
  tr {
    border: 1px solid black;
  }
`;
export const ProductsEdit = () => {
  const { id } = useParams();
  console.log(id);
  const [products, setproducts] = useState({
    name: "",
    price: "",
    categoryId: "",
  });
  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setproducts({ ...products, [name]: value });
  };

  return (
    <ProductsDiv>
      <div id="create">
        <h1>Update products</h1>
        <input
          type="text"
          placeholder="Enter your Product name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your Price"
          name="email"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your CategoryId"
          name="address"
          onChange={inputHandler}
        />
        <Button
          variant="contained"
          onClick={() => {
            axios
              .patch(`http://localhost:3434/products/${id}/edit`, products)
              .then(alert("products is updated "));
            navigate("/products");
          }}
        >
          Update products
        </Button>
      </div>
    </ProductsDiv>
  );
};
