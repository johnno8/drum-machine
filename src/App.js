import React, { Component } from 'react';
import './App.css';

const notes = [{
    name: 'heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },{
    name: 'heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },{
    name: 'heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },{
    name: 'heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },{
    name: 'heater-6',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },{
    name: 'punchy-kick-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },{
    name: 'kick-n-hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },{
    name: 'kick-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },{
    name: 'h1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  }];

class App extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = (event) => {
    console.log(event.target.value);
    this.playSound(event.target.value);
  }

  playSound = (url) => {
    const sound = new Audio(url).play();
  }

  render() {
    return (
      <div className="App" id="drum-machine">
        <PadContainer 
          className="pad-container"
          onClick={this.handleClick}/>
      </div>
    );
  }
}

class PadContainer extends Component {

  render() {
    return (
      <div className="pad-container">
        <DrumPad id={notes[0].name} url={notes[0].url} value={"Q"} 
          onClick={this.props.onClick}/>
        <DrumPad id={notes[1].name} url={notes[1].url} value={"W"} 
          onClick={this.props.onClick}/>
        <DrumPad id={notes[2].name} url={notes[2].url} value={"E"}
          onClick={this.props.onClick}/>
        <DrumPad id={notes[3].name} url={notes[3].url} value={"A"}
          onClick={this.props.onClick}/>
        <DrumPad id={notes[4].name} url={notes[4].url} value={"S"}
          onClick={this.props.onClick}/>
        <DrumPad id={notes[5].name} url={notes[5].url} value={"D"}
          onClick={this.props.onClick}/>
        <DrumPad id={notes[6].name} url={notes[6].url} value={"Z"}
          onClick={this.props.onClick}/>
        <DrumPad id={notes[7].name} url={notes[7].url} value={"X"}
          onClick={this.props.onClick}/>
        <DrumPad id={notes[8].name} url={notes[8].url} value={"C"}
          onClick={this.props.onClick}/>
      </div>
    );
  }
}

function DrumPad(props) {

  return (
    <button className="drum-pad" onClick={props.onClick} value={props.url}>
      {props.value}
      <audio src={props.url} type="audio/mpeg"></audio>
    </button>
  );
}

export default App;
