import React from "react";


export default class Header extends React.Component {
  render() {
    return (
        <div className='prefaceBG'>
            <h1 className="preface">{this.props.preface}</h1>
        </div>
    );
  }
}