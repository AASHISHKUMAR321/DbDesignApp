import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";

const CategoryDiv = styled.div`
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
export const CategoryEdit = () => {
  const { id } = useParams();
  const [category, setcategory] = useState({
    name: "",
    productsId: [],
  });

  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setcategory({ ...category, [name]: value });
  };
  const prodHandler = (e) => {
    const { value } = e.target;
    setcategory({ ...category, productsId: [value] });
  };

  return (
    <CategoryDiv>
      <div id="create">
        <h1>Update categorys</h1>
        <input
          type="text"
          placeholder="Enter your category name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your Products Id"
          name="productsId"
          onChange={prodHandler}
        />

        <Button
          variant="contained"
          onClick={() => {
            axios
              .patch(`http://localhost:3434/categories/${id}/edit`, category)
              .then((data) => alert("category is updated "))
              .then((data) => navigate("/category"));
          }}
        >
          Update categorys
        </Button>
      </div>
    </CategoryDiv>
  );
};
