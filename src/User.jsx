import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
export const User = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //   const handler = (e) => {
  //     const { name, value } = e.target;
  //     setUser({ ...user, address: value) });
  //   //   };
  //   console.log(user);
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3434/user`).then((data) => setData(data.data));
  }, [update]);
  console.log(data);
  return (
    <UserDiv>
      <div id="create">
        <h1>Create user</h1>
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

        <Button
          variant="contained"
          onClick={() => {
            axios
              .post(`http://localhost:3434/user/create`, user)
              .then((data) => alert("user is created "))
              .then((data) => setUpdate(!update));
          }}
        >
          Create User
        </Button>
      </div>
      <div>
        <h1>Users</h1>
        <table width="80%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
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
                      <th>{e.email}</th>
                      <th>
                        <AddCircleIcon
                          onClick={() => {
                            navigate(`/addresses/${e._id}`);
                          }}
                        />
                      </th>
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
                            axios.delete(`http://localhost:3434/user/${e.id}`);
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
    </UserDiv>
  );
};
