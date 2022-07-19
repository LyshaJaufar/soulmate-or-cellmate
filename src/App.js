import React, { Component } from "react";
import './App.css';
import FetchFelonData from "./components/FetchFelonData";
import FetchCelebData from "./components/FetchCelebData";
import Header from "./components/Header";
import Preface from "./components/Preface";


class App extends Component {

  state = {
    leftClicked: false,
    rightClicked: false
  }
  
  checkLeftClick = () => {
    this.setState({
      leftClicked: true
    })
  }

  checkRightClick = () => {
    this.setState({
      rightClicked: true
    })
  }

  render() {
  
    return (
      
      <div className='App'>
        <Header
          title={"Matchmaking: Soulmates or Cellmates?"}
        />
        <Preface
          preface={"Time to judge your awful taste in people. Who would you rather...?"}
        />
        <div className='App row no-gutters'>
          <div className='col-md-6 no-gutters'onClick={this.checkLeftClick}>
              <div className='leftside d-flex justify-content-center align-items-center'>
                  <FetchFelonData leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked}></FetchFelonData>
              </div>
          </div>
          <div className='col-md-6 no-gutters' onClick={this.checkRightClick}>
              <div className='rightside d-flex justify-content-center align-items-center'>
                  <FetchCelebData leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked}></FetchCelebData>
              </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
