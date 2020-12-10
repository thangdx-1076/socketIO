import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
const endpoint = "http://localhost:4000";

function App() {
  let [response, setResponse] = useState("");
  let [response1, setResponse1] = useState("");
  const pageEnd = useRef();
  

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("newclientconnect", (data) => {
      setResponse(data.description);
    });
    socket.on("newclientconnect1", (data) => {
      setResponse1(data.description);
    });
    console.log(pageEnd.current);
  }, []);

  return (
    <div ref={pageEnd} className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {response}
        </a>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {response1}
        </a>
      </header>
    </div>
  );
}

export default App;
