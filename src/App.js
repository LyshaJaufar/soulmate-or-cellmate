import React, { Component } from "react";
import './App.css';
import FetchFelonData from "./components/FetchFelonData";
import FetchCelebData from "./components/FetchCelebData";
import Header from "./components/Header";
import Preface from "./components/Preface";

class App extends Component {

  render() {
    async function myFunction(){
        var x = null
        fetch("http://127.0.0.1:5000/")
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("Server responds with error!")
                    const jsonData= require('./data.json'); 
                    console.log(jsonData);
                }
                return res.json()
            })
            .then(res => {
                console.log(res)
            },
            // Error handling
                err => {
                    console.log(err)
                    const jsonData= require('./data.json'); 
                })
    }
    return (
      <div className='App' onLoad={myFunction}>
        <Header
          title={"Matchmaking: Soulmates or Cellmates?"}
        />
        <Preface
          preface={"Time to judge your awful taste in people. One is a celebrity. One is a criminal."}
        />
        <div className='App row no-gutters'>
          <div className='col-md-6 no-gutters'>
              <div className='leftside d-flex justify-content-center align-items-center'>
                  <FetchFelonData></FetchFelonData>
              </div>
          </div>
          <div className='col-md-6 no-gutters'>
              <div className='rightside d-flex justify-content-center align-items-center'>
                  <FetchCelebData></FetchCelebData>
              </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
