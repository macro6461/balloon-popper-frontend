
import React, { Component } from 'react';
import './App.scss';

class TurnNumIntExperimental extends Component {

  constructor() {
    super();
    this.state = {
      count: 0,
      list: [9.1, 8.1, 7.1, 6.1, 5.1, 4.1, 3.1, 2.1, 1.1, 0.1, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0, 0.0, 9.2, 8.2, 7.2, 6.2, 5.2, 4.2, 3.2, 2.2, 1.2, 0.2,9.3, 8.3, 7.3, 6.3, 5.3, 4.3, 3.3, 2.3, 1.3, 0.3],
      direction: null,
      current: 0,
      targ: 0,
      top: -760,
      transitionDuration: '0.3s',
      allEls: document.getElementsByClassName('normInt'),
      containerTop: '',
      letter: ''
    };
  }

  componentDidMount = () =>{
    this.setState({
      allEls: document.getElementsByClassName('normInt'),
      letter: this.props.letter
    })
  }

  componentWillReceiveProps = (nextProps) =>{
    if (nextProps.num !== this.props.num){
      this.updateCount(nextProps.hash.bool, nextProps.num)
    }
  }


  calcCurrent = (x) =>{
    var num
    if (x + this.state.current > 9 || x + this.state.current < 0 ){
      num = (x + this.state.current).toString().split("")[(x + this.state.current).toString().split("").length - 1]
      num = parseInt(num)
    } else {
      num = this.state.current + x
    }
    return num
  }

  isElementInViewport = (el) => {

   let contTop = document.getElementsByClassName('intContainer')[0].getBoundingClientRect().top

   let elTop = el.getBoundingClientRect().top

   let nombre = elTop < 0 ? contTop + elTop : contTop - elTop

   console.log(nombre)

   if (Math.abs(nombre) > 0 && Math.abs(nombre) < 3 ){
     let id1=el.id.split('-')[0]
     let id2=el.id.split('-')[1]
     debugger
     this.setState({
       targ: id1 + '-' + Math.round(parseInt(id2))
     }, ()=>{
        debugger
     })
   }
  }

  updateCount = (y, x) =>{
    console.log("in updateCount: " + parseInt(x))
    let newX = y ? parseInt(x) : -parseInt(x)
    let newCurr = this.calcCurrent(newX)
    var old = this.state.current
    this.setState({
      transitionDuration: '0.3s',
      direction: y,
      current: newCurr,
    })
   let num = y ? this.state.top + (newCurr*35) : this.state.top + (-newCurr*35)

   this.setState({
     top: num
   }, ()=>{
     this.scrollToNum()
   })
  }

  scrollToNum = () =>{
    setTimeout(()=>{

    for (let i =0; i < this.state.allEls.length; i++){

      this.isElementInViewport(this.state.allEls[i])
    }
      this.setState({
      transitionDuration: '0s',
      top: -760 + (this.state.targ*35)
    })
    }, 400)
  }

  render() {

    const self = this;
    let className
    if (this.props.hash && this.props.hash.bool === true && this.props.hash.color === 'green'){
      className = 'greenIntUp'
    } else if (this.props.hash && this.props.hash.bool === true && this.props.hash.color === 'red') {
      className = 'redIntUp'
    } else if (this.props.hash && this.props.hash.bool === false && this.props.hash.color === 'green') {
      className = 'greenIntDown'
    } else if (this.props.hash && this.props.hash.bool === false && this.props.hash.color === 'red') {
      className = 'redIntDown'
    } else {
      className = 'normInt'
    }

    return (
      <div className="intContainer">
        <div className='numContainer' style={{ top: this.state.top, transitionDuration: this.state.transitionDuration}}>
          {this.state.list.map((int, i)=>{
            return <p key={i} id={this.state.letter + "-" + int.toString()} className={className}>{Math.round(int)}</p>
            })}
        </div>
      </div>
    );

  }
}

export default TurnNumIntExperimental;
