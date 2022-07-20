import React, { Component } from "react";
import './App.css';
import FetchFelonData from "./components/FetchFelonData";
import FetchCelebData from "./components/FetchCelebData";
import Header from "./components/Header";
import Preface from "./components/Preface";
import LikeButton from "./components/LikeButton";
import NextButton from "./components/NextButton";

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
    var likeButton = <LikeButton></LikeButton>;
    var nextButton = null;
    
    if (this.state.leftClicked == true || this.state.rightClicked == true) {
      likeButton = null
      nextButton = <NextButton></NextButton>
    }

    return (
      
      <div className='App'>
        <Header
          title={"Matchmaking: Soulmates or Cellmates?"}
        />
        <Preface
          preface={"Time to judge your awful taste in people. Who would you rather...?"}
        />
        <div className='App row no-gutters'>
          <div className='col-md-6 no-gutters'>
              <div className='leftside d-flex justify-content-center align-items-center'>
                  <FetchFelonData leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked}></FetchFelonData>
              </div>
              <div className="footer-leftside d-flex justify-content-center align-items-center" onClick={this.checkLeftClick}>
                  {likeButton}
              </div>
          </div>
          <div className='col-md-6 no-gutters'>
              <div className='rightside d-flex justify-content-center align-items-center'>
                  <FetchCelebData leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked}></FetchCelebData>
              </div>
              <div className="footer-rightside d-flex justify-content-center align-items-center" onClick={this.checkRightClick}>
                  {likeButton}{nextButton}
              </div>
          </div>

        </div>
      </div>
    );
  }
  
}

export default App;
