import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CategoriesDiv = styled.div`
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
export const Category = () => {
  const [categories, setcategories] = useState({
    name: "",
    productsId: "",
  });

  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setcategories({ ...categories, [name]: value });
  };
  console.log(categories);

  //   const handler = (e) => {
  //     const { name, value } = e.target;
  //     setcategories({ ...categories, address: value) });
  //   //   };
  //   console.log(categories);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3434/categories`)
      .then((data) => setData(data.data));
  }, [update]);
  console.log(data);
  return (
    <CategoriesDiv>
      <div id="create">
        <h1>Create categories</h1>
        <input
          type="text"
          placeholder="Enter your Category name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your Products Id"
          name="productsId"
          onChange={inputHandler}
        />

        <Button
          variant="contained"
          onClick={() => {
            axios
              .post(`http://localhost:3434/categories/create`, categories)
              .then((data) => alert("categories is created "))
              .then((data) => setUpdate(!update));
          }}
        >
          Create categories
        </Button>
      </div>
      <div>
        <h1>categoriess</h1>
        <table width="80%">
          <thead>
            <tr>
              <th>categories Name</th>
              <th>Products Id</th>
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
                      <th>{e.productsId}</th>

                      <th>
                        <EditIcon
                          onClick={() => {
                            navigate(`/category/${e._id}`);
                          }}
                        />
                      </th>
                      <th>
                        <DeleteIcon
                          onClick={() => {
                            axios.delete(
                              `http://localhost:3434/categories/${e.id}`
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
    </CategoriesDiv>
  );
};
