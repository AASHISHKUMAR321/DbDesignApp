import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
export const Products = () => {
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

  //   const handler = (e) => {
  //     const { name, value } = e.target;
  //     setproducts({ ...products, address: value) });
  //   //   };
  //   console.log(products);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3434/products`)
      .then((data) => setData(data.data));
  }, [update]);
  console.log(data);
  return (
    <ProductsDiv>
      <div id="create">
        <h1>Create products</h1>
        <input
          type="text"
          placeholder="Enter your Product name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your Price"
          name="price"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your CategoryId"
          name="categoryId"
          onChange={inputHandler}
        />

        <Button
          variant="contained"
          onClick={() => {
            axios
              .post(`http://localhost:3434/products/create`, products)
              .then((data) => alert("products is created "))
              .then((data) => setUpdate(!update));
          }}
        >
          Create products
        </Button>
      </div>
      <div>
        <h1>productss</h1>
        <table width="80%">
          <thead>
            <tr>
              <th>Products Name</th>
              <th>Price</th>
              <th>category</th>
              <th>Edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((e) => {
                  return (
                    <tr>
                      <th>{e.name}</th>
                      <th>{e.price}</th>
                      <th>{e.categoryId}</th>
                      <th>
                        <EditIcon
                          onClick={() => {
                            navigate(`/products/${e._id}`);
                          }}
                        />
                      </th>
                      <th>
                        <DeleteIcon
                          onClick={() => {
                            axios.delete(
                              `http://localhost:3434/products/${e.id}`
                            );
                            setUpdate(!update);
                          }}
                        />
                      </th>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </ProductsDiv>
  );
};
