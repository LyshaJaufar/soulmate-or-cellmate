import React from "react";
import heart from "../assets/heart.png";

export default class LikeButton extends React.Component {
  render() {
    return (

        <div class="circle" >
            <img class="heart-img" src={heart}></img>
        </div>

    );
  }
}