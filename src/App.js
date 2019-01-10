import React, { Component } from 'react';
import './App.css';

const notes = [{
    triggerKey: 'Q',
    keyCode: 81,
    name: 'heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },{
    triggerKey: 'W',
    keyCode: 87,
    name: 'heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },{
    triggerKey: 'E',
    keyCode: 69,
    name: 'heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },{
    triggerKey: 'A',
    keyCode: 65,
    name: 'heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },{
    triggerKey: 'S',
    keyCode: 83,
    name: 'heater-6',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },{
    triggerKey: 'D',
    keyCode: 68,
    name: 'punchy-kick-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },{
    triggerKey: 'Z',
    keyCode: 90,
    name: 'kick-n-hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },{
    triggerKey: 'X',
    keyCode: 88,
    name: 'kick-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },{
    triggerKey: 'C',
    keyCode: 67,
    name: 'h1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  }];

const notes1 = [{
    triggerKey: 'Q',
    keyCode: 81,
    name: 'dsc_Oh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },{
    triggerKey: 'W',
    keyCode: 87,
    name: 'side_stick_1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },{
    triggerKey: 'E',
    keyCode: 69,
    name: 'cev_h2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },{
    triggerKey: 'A',
    keyCode: 65,
    name: 'chord_1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },{
    triggerKey: 'S',
    keyCode: 83,
    name: 'chord_2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },{
    triggerKey: 'D',
    keyCode: 68,
    name: 'chord_3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },{
    triggerKey: 'Z',
    keyCode: 90,
    name: 'give_us_a_light',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },{
    triggerKey: 'X',
    keyCode: 88,
    name: 'dry_ohh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },{
    triggerKey: 'C',
    keyCode: 67,
    name: 'brk_snr',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }];

const mode1Color = '#b3ff51';
const mode2Color = '#ff6800';
const offColor = '#ccc';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      power: true,
      mode: true,
      volume: .5,
      color: mode1Color,
      currentNotes: notes
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyUp);
    console.log(this.state.power);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleClick = (event) => {
    console.log(event.target.value);
    this.playSound(event.target.value);
  }

  handleKeyPress = (event) => {
    this.playSound(event.keyCode);
    const key = this.state.currentNotes.find(obj => obj.keyCode == event.keyCode);
    if(this.state.power && key !== undefined) {
      console.log('key: ' + JSON.stringify(key, null, 2));
      document.getElementById(key.name).style.opacity = .7;  
    }
  }

  handleKeyUp = (event) => {
    const key = this.state.currentNotes.find(obj => obj.keyCode == event.keyCode);
    if(this.state.power && key !== undefined) {
      console.log('key: ' + JSON.stringify(key, null, 2));
      document.getElementById(key.name).style.opacity = 1;
    }
  }

  playSound = (key) => {
    console.log(key);
    const note = this.state.currentNotes.find(obj => obj.keyCode == key);
    if(this.state.power && note !== undefined) {
      console.log(note);
      this.setState({
        displayName: note.name
      });
      const sound = new Audio(note.url);
      sound.volume = this.state.volume;
      sound.currentTime = 0;
      sound.play();
    }
  }

  powerToggle = (event) => {
    if(event.target.value === 'power'){
      this.setState({
        power: !this.state.power,
        displayName: '',
        color: this.setColorPower(this.state.power, this.state.color, this.state.mode)
      });
    } else {
      if(this.state.power) {
        this.setState({
          mode: !this.state.mode,
          displayName: '',
          color: !this.state.mode ? mode1Color : mode2Color,
          currentNotes: !this.state.mode ? notes : notes1
        });    
      } else {
        this.setState({
          mode: !this.state.mode,
          displayName: '',
          currentNotes: !this.state.mode ? notes : notes1
        });
      }
    }
  }

  changeVolume = (event) => {
    this.setState({
      volume: event.target.value
    });
  }

  setColorPower = (power, currentColor, mode) => {
    if(!power && mode) {return mode1Color;}
    else if(!power && !mode) {return mode2Color;}
    else if(power){return offColor;}
  }

  render() {
    return (
      <div className="App" id="drum-machine"
        style={{borderColor: this.state.color, color: this.state.color}}>
        <PadContainer 
          className="pad-container"
          onClick={this.handleClick}
          color={this.state.color}
          notes={this.state.currentNotes}/>
        <ControlsContainer 
          name={this.state.displayName}
          onClick={this.powerToggle}
          changeVolume={this.changeVolume}
          volume={this.state.volume}
          color={this.state.color}/>
      </div>
    );
  }
}

function PadContainer(props) {

  return (
    <div className="pad-container">
      {props.notes.map((note, i) => {
          return(
            <DrumPad
              id={note.name}
              url={note.url}
              value={note.triggerKey}
              keyCode={note.keyCode}
              onClick={props.onClick}
              color={props.color}
            />
          )
        })
      }
    </div>
  );
}

function DrumPad(props) {

  return (
    <button className="drum-pad" id={props.id} onClick={props.onClick} value={props.keyCode}
      style={{borderColor: props.color, color: props.color}}>
      {props.value}
      <audio src={props.url} type="audio/mpeg"></audio>
    </button>
  );
}

function ControlsContainer(props) {

  return(
    <div className="controls-container">
      <div className="control" id="display"
        style={{borderColor: props.color}}>{props.name}</div>
      <div className="control" id="power">
        <div>on</div>
        <label className="switch">
          <input type="checkbox" onClick={props.onClick} value={'power'}/>
          <span className="slider round" 
            style={{backgroundColor: props.color}}></span>
        </label>
        <div>off</div>
      </div>
      <div className="control" id="volume">
        <div>vol</div>
        <input type="range" min="0" max="1" step="0.01" className="volumeSlider" id="myRange"
          value={props.volume}
          onChange={props.changeVolume}
          style={{backgroundColor: props.color,
                  borderLeftColor: props.color,
                  borderRightColor: props.color}}/>
      </div>
      <div className="control" id="mode">
        <div>mode1</div>
        <label className="switch">
          <input type="checkbox" onClick={props.onClick} value={'mode'}/>
          <span className="slider round"
          style={{backgroundColor: props.color}}></span>
        </label>
        <div>mode2</div>
      </div>
    </div>
  )
}

export default App;
