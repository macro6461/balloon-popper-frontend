import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import '../App.scss';
// import style from './App.less'
import RedBalloon from '../balloons/RedBalloon'
import Timer from '../Timer'
import YouLose from '../balloons/YouLose'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchMessage} from '../actions/actions'

import $ from 'jquery'

var interval = ''

class Infant extends Component {

  state ={
    total: 0,
    start: false,
    time: 0,
    finalTime: 0,
    myVar: '',
    timerClass: 'timer',
    lost: false,
    passedTotal: 0,
    underConstruction: true
  }

  startTime = () =>{
    this.setState({
      time: this.runTimer()
    })
  }

  componentDidMount = () =>{

    this.props.fetchMessage('Welcome to Infant Learning!')

  }

  randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  runTimer = () =>{
      this.setState({
        time: this.state.time += 1
      })
  }

  popBalloon = (e) =>{
    var balloon

    if (e.target.className === "balSpanOp" || e.target.className === "balSpanNum" ){
      balloon = e.target.parentElement.parentElement
    } else if (e.target.className === "spanDiv") {
      balloon = e.target.parentElement
    } else if (e.target.tagName === 'svg'){
      balloon = e.target.parentElement.parentElement.parentElement
    } else {
      balloon = e.target
    }

    if (balloon == undefined || balloon.children === undefined || balloon.children[0] === undefined || balloon.children[0].children === undefined || balloon.classList.value.includes('black')){
      this.youLose()
    } else {
      var points = parseInt(balloon.children[0].children[1].innerText)
      var op = balloon.children[0].children[0].innerText
      this.calcPoints(points, op)
    }

  }

  onStart=()=>{
    this.setState({
      start: true,
      total: 0,
      myVar: setInterval(this.runTimer, 1000),
      lost: false,
      timerClass: 'timer pulsate'
    },()=>{setTimeout(()=>{
      this.setState({
        timerClass: 'timer'
      })
      // this.startBubbleMachine()
    }, 2000)})
  }

  youLose = () =>{
    this.setState({
      lost: true,
      passedTotal: this.state.total
    })
    this.restart()
  }

  calcPoints = (x, y) =>{
    if (y === "-" ){
      this.setState({
        total: this.state.total - x
      })
    } else {
      this.setState({
        total: this.state.total + x
      })
    }
  }

  handleOnChange = () =>{
    if (this.state.total > 0){

    }
  }

  restart = () =>{
    var clearTimer = this.state.myVar
    this.setState({
      finalTime: this.calcTime(this.state.time),
      start: false,
      total: 0,
      time: 0,
    }, ()=>{
      clearInterval(clearTimer)
    })
  }

  resetStart = () =>{
    this.setState({
      start: true,
      lost: false,
      passedTotal: 0
    },()=>{setTimeout(()=>{
      this.setState({
        timerClass: 'timer'
      })
    }, 5000)})

  }

  generatePlusOrMinus = () =>{
    return Math.floor(Math.random()* 2 +1)
  }

  calcTime = (data) =>{
    var sec_num = parseInt(data, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  render() {
    var time = this.calcTime(this.state.time)
    var startBtnAction;
    var startBtntext;
    var startClass;
    if (this.state.start){
      startBtnAction = this.restart
      startBtntext = 'Stop'
      startClass = 'startBtn red'
    } else {
      startBtnAction = this.onStart
      startBtntext = 'Start'
      startClass = 'startBtn green'
    }

    return (
      <div className="Infant">

        {this.state.underConstruction
          ? <div><h1>INFANT LEARNING</h1><p>(under construction)</p></div>
          : null
        }
        {this.state.lost
          ? <YouLose finalTime={this.state.finalTime} finalScore={this.state.passedTotal} onClick={this.onStart}/>
          : null
        }

        {!this.state.underConstruction
          ? <div>
          <div style={{height: 100 + 'px', width: 80 + '%', maxWidth: 1500 + 'px', display: 'block', margin: 'auto', position: 'relative' }}>
          <Timer time={time} passedClassName={this.state.timerClass}/>
          <div className="headContainer">
            <div className={startClass} onClick={startBtnAction}>{startBtntext}</div>
            <div className="balTotal" onChange={this.handleOnChange()}>SCORE: {this.state.total}</div>
          </div>
        </div>

        <div className="parentBalContainer">

           <div className="balContainer">
             {this.state.start
               ? <div>
                   <RedBalloon id='balloon1' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon2' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon3' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon4' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon5' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon6' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon7' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>

                </div>
            : null
          }
          </div>

        </div>
        </div>
        : null
      }

      </div>
    );
  }
}

export default withRouter(connect(null, { fetchMessage })(Infant))
//
// <RedBalloon id='balloon2' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon3' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon4' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon5' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon6' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon7' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
