import React from "react";


export default class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="title">{this.props.title}</h1>
      </header>
    );
  }
}