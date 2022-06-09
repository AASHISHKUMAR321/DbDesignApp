import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
export const Brands = () => {
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
  console.log(brand);

  //   const handler = (e) => {
  //     const { name, value } = e.target;
  //     setbrand({ ...brand, address: value) });
  //   //   };
  //   console.log(brand);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3434/brands`)
      .then((data) => setData(data.data));
  }, [update]);
  console.log(data);
  return (
    <BrandDiv>
      <div id="create">
        <h1>Create Brands</h1>
        <input
          type="text"
          placeholder="Enter your Brandname"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your Products ids"
          name="products"
          onChange={prodHandler}
        />

        <Button
          variant="contained"
          onClick={() => {
            axios
              .post(`http://localhost:3434/brands/create`, brand)
              .then((data) => alert("brand is created "))
              .then((data) => setUpdate(!update));
          }}
        >
          Create Brands
        </Button>
      </div>
      <div>
        <h1>Brands</h1>
        <table width="80%">
          <thead>
            <tr>
              <th>Name</th>
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
                      <th>{e.productsId[0]}</th>

                      <th>
                        <EditIcon
                          onClick={() => {
                            navigate(`/edit/${e._id}`);
                          }}
                        />
                      </th>
                      <th>
                        <DeleteIcon
                          onClick={() => {
                            axios.delete(
                              `http://localhost:3434/brands/${e.id}`
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
    </BrandDiv>
  );
};
