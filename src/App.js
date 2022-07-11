import React, { Component } from "react";
import './App.css';
import FetchData from "./components/FetchData";

class App extends Component {

  render() {
    return (
      <div className="App">
        <FetchData></FetchData>
      </div>
    );
  }
}

export default App;
