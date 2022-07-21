import React, { Component } from "react";
import './App.css';
import FetchFelonData from "./components/FetchFelonData";
import FetchCelebData from "./components/FetchCelebData";
import Header from "./components/Header";
import Preface from "./components/Preface";
import LikeButton from "./components/LikeButton";
import NextButton from "./components/NextButton";

var CELEBJSXLENGTH = 150
var FELONJSXLENGTH = 34
var componentOne = 0
var componentTwo = 1


class App extends Component {

    constructor(props) {
      super(props)

      this.state = {
        leftClicked: false,
        rightClicked: false,
        celebJsxLength: 104, 
        felonJsxLength: 35,
        celebIndex: Math.floor(Math.random() * CELEBJSXLENGTH),
        felonIndex: Math.floor(Math.random() * FELONJSXLENGTH),
        compOne: null,
        compTwo: null,
        clickedComp: null
      };
    }
    
    checkLeftClick = () => {
      this.setState({
        leftClicked: true,
        clickedComp: componentOne
      })
    }

    checkRightClick = () => {
      this.setState({
        rightClicked: true,
        clickedComp: componentTwo
      })
    }

    randomise = () => {
        componentOne = Math.floor(Math.random() * 2)
        componentTwo = null

        for (var i = 0; i < 2; i++) {
          if (i != componentOne) {
            componentTwo = i;
            break
          }
        }
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
      var nextButton = <div class="footer-colour">hello</div>
      
      if (this.state.leftClicked == true || this.state.rightClicked == true) {
        likeButton = null
        nextButton = <NextButton clicked={this.next}></NextButton>
      } else {
        likeButton = <LikeButton></LikeButton>
        nextButton = <div class="footer-colour"></div>
      }

      var components = [

        <FetchFelonData  felonIndex={this.state.felonIndex} leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked} clickedComp={this.state.clickedComp}></FetchFelonData>,
        <FetchCelebData celebIndex={this.state.celebIndex} leftClicked={this.state.leftClicked} rightClicked={this.state.rightClicked} clickedComp={this.state.clickedComp}></FetchCelebData>
      
      ]

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
                  {components[componentOne]}
                </div>
                <div className="footer-leftside d-flex justify-content-center align-items-center" onClick={this.checkLeftClick}>
                    {likeButton}
                </div>
            </div>
            <div className='col-md-6 no-gutters'>
                <div className='rightside d-flex justify-content-center align-items-center'>
                   {components[componentTwo]}                     
                </div>
                <div className="footer-rightside d-flex justify-content-center align-items-center" >
                    <div onClick={this.checkRightClick} >{likeButton} </div>
                </div>
            </div>
            <div className='col-md-12 no-gutters footer-colour' onClick={this.randomise}>
                  {(this.state.leftClicked == true || this.state.rightClicked == true) ? <NextButton clicked={this.next}></NextButton> : <div class='temp-space'></div>}
            </div>
          </div>
        </div>
      );
    }
  
}

export default App;
