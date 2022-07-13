import React, { Component } from "react";
import './App.css';
import FetchData from "./components/FetchData";
import Header from "./components/Header";
import Preface from "./components/Preface";

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Header
          title={"Matchmaking: Soulmates or Cellmates?"}
        />
        <Preface
          preface={"Time to judge your awful taste in people. One is a celebrity. One is a criminal."}
        />
        <div className='App row no-gutters'>
          <div className='col-md-6 no-gutters'>
              <div className='leftside d-flex justify-content-center align-items-center'>
                  <FetchData></FetchData>
              </div>
          </div>
          <div className='col-md-6 no-gutters'>
              <div className='rightside d-flex justify-content-center align-items-center'>
                  <FetchData></FetchData>
              </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
