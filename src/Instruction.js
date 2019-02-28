import React, { Component } from 'react';
import './App.scss';
import { Router, Route, Switch } from 'react-router'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fetchMessage} from './actions/actions'
import smileBal from './assets/balloon-smile.png'
import sillyBal from './assets/silly-balloon.png'
import disBal from './assets/dissapointed-balloon.png'
import scarredBal from './assets/scared-balloon.png'
import scarredTwoBal from './assets/scared-balloon-2.png'

import $ from 'jquery'

const history = createBrowserHistory();

// Get the current location.
const location = history.location;

var interval = ''
class Instruction extends Component {

  state = {
    hideInstructions: false,
    disableInstructions: false,
    closeInstructions: ''
  }

  removeInstruction = () =>{
    this.props.closedInstructions(this.state.closeInstructions)
  }

  componentDidMount = () =>{
    this.setState({
      disableInstructions: this.props.disable,
      closeInstructions: location.pathname.split('/')[location.pathname.split('/').length - 1]
    })
  }

  // componentDidUpdate = (prevProps, prevState)=>{
  //    if (prevProps.num !== this.props.num){
  //      this.setState({
  //        count: parseInt(this.props.num)
  //      }, ()=>{
  //        this.updateCount(this.state.count)
  //      })
  //   }
  // }

  render() {

    return(

      <div className='instructionOuterContainer'>
          <div className='instructionModalBackground'></div>
          <div className='bubbleContainer'>
          <div className="speech-bubble">
            <p>{this.props.message}</p>
          </div>
          </div>
          <div className='instructionContainer'>
            <img className="balloonBuddy" src={smileBal} onClick={this.removeInstruction}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    disableInstructions: state.appReducer.disableInstructions,
    closedInstructions: state.appReducer.closeInstructions,
    changeInstructions: state.appReducer.changeInstructions,
    message: state.appReducer.message,
    location: state.appReducer.location
  }

}

export default withRouter(connect(mapStateToProps, { fetchMessage })(Instruction))
