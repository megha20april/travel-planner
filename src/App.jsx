import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TravelForm from "./components/TravelForm";
import React from "react";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TravelForm />
    </>
  );
}

export default App;
