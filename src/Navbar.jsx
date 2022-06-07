import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  width: 90%;
  height: 50px;
  a {
    margin-left: 60px;
  }
`;
export const Navbar = () => {
  const link = [
    { name: "home", to: "/" },
    { name: "user", to: "/user" },
    { name: "products", to: "/products" },
  ];
  return (
    <Nav>
      {link.map((e) => (
        <Link to={e.to}>{e.name}</Link>
      ))}
    </Nav>
  );
};
