import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./Navbar";
import { Routes, Route } from "react-router-dom";
import { User } from "./User";
import { Edit } from "./Edit";
import { Address } from "./Address";
import { EditAddress } from "./EditAddress";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/addresses" element={<Address />} />
        <Route path="/addresses/:id" element={<Address />} />
        <Route path="/" element={""} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/editaddress/:id" element={<EditAddress />} />
      </Routes>
    </div>
  );
}

export default App;
