import React, { Component, PropTypes } from 'react';
import './Main.css';


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
          <div id="main">
	          <h1 className="white-text" >Welcome to <span>EDTRONICS</span></h1>
	          <p className="white-text" >Our mission is to assemble the world’s education and <br/> put it in service of everyone's empowerment. </p>
          </div>

       );
    }
}



