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
      rightClicked: false,
      celebIndex: Math.floor(Math.random() * this.state.celebJsxLength) + 1,
      felonIndex: Math.floor(Math.random() * this.state.felonJsxLength) + 1,
      celebJsxLength: 104, 
      felonJsxLength: 35
    };
    
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

    next = () => {
        this.setState({
            celebIndex: Math.floor(Math.random() * this.state.celebJsxLength) + 1,
            felonIndex: Math.floor(Math.random() * this.state.felonJsxLength) + 1,
            leftClicked: false,  
            rightClicked: false
        })
    };


    render() {
      var likeButton = <LikeButton></LikeButton>;
      var nextButton = null

      
      if (this.state.leftClicked == true || this.state.rightClicked == true) {
        likeButton = null
        nextButton = <NextButton clicked={this.next}></NextButton>
      } else {
        likeButton = <LikeButton></LikeButton>
        nextButton = null
      }

      //console.log((this.state.celebIndex % CELEBJSXLENGTH))


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
                  <FetchFelonData  felonIndex={this.state.felonIndex} leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked}></FetchFelonData>
                </div>
                <div className="footer-leftside d-flex justify-content-center align-items-center" onClick={this.checkLeftClick}>
                    {likeButton}
                </div>
            </div>
            <div className='col-md-6 no-gutters'>
                <div className='rightside d-flex justify-content-center align-items-center'>
                    <FetchCelebData celebIndex={this.state.celebIndex} leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked}></FetchCelebData>                   
                </div>
                <div className="footer-rightside d-flex justify-content-center align-items-center" >
                    {likeButton}{nextButton}
                </div>
            </div>
          </div>
        </div>
      );
    }
  
}

export default App;
