import React from "react";
import next from "../assets/next.png";

export default class NextButton extends React.Component {
  render() {
    return (
      <footer className="App-footer">
        <div onClick={this.props.clicked} class="circle ">
            <img src={next} class="heart-img"></img>
        </div>
      </footer>
    );
  }
}