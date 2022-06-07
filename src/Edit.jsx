import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";

const UserDiv = styled.div`
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
export const Edit = () => {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <UserDiv>
      <div id="create">
        <h1>Update user</h1>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your address"
          name="address"
          onChange={inputHandler}
        />
        <Button
          variant="contained"
          onClick={() => {
            axios
              .patch(`http://localhost:3434/${id}`, user)
              .then(alert("user is updated "));
            navigate("/user");
          }}
        >
          Update User
        </Button>
      </div>
    </UserDiv>
  );
};
