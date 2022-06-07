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
export const EditAddress = () => {
  const { id } = useParams();
  const [address, setAddress] = useState({
    city: "",
    country: "",
    pincode: "",
  });

  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <UserDiv>
      <div id="create">
        <h1>Update Address</h1>
        <input
          type="text"
          placeholder="Enter your City name"
          name="city"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your country Name"
          name="country"
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Enter your pincode"
          name="pincode"
          onChange={inputHandler}
        />
        <Button
          variant="contained"
          onClick={() => {
            axios
              .post(
                `http://localhost:3434/user/${id}/addresses/create`,
                address
              )
              .then(alert("Address is created "))
              .then(setUpdate(!update));
            navigate("/addresses");
          }}
        >
          Update Address
        </Button>
      </div>
    </UserDiv>
  );
};
