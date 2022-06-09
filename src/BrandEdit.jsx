import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";

const BrandDiv = styled.div`
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
export const BrandEdit = () => {
  const { id } = useParams();
  const [brand, setbrand] = useState({
    name: "",
    productsId: [],
  });

  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setbrand({ ...brand, [name]: value });
  };
  const prodHandler = (e) => {
    const { value } = e.target;
    setbrand({ ...brand, productsId: [value] });
  };

  return (
    <BrandDiv>
      <div id="create">
        <h1>Update Brands</h1>
        <input
          type="text"
          placeholder="Enter your Brand name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your Brands Ids"
          name="email"
          onChange={inputHandler}
        />

        <Button
          variant="contained"
          onClick={() => {
            axios
              .patch(`http://localhost:3434/brands/${id}/edit`, brand)
              .then((data) => alert("brand is updated "))
              .then((data) => navigate("/brands"));
          }}
        >
          Update Brands
        </Button>
      </div>
    </BrandDiv>
  );
};
