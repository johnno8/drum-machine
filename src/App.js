import React, { Component } from 'react';
import './App.css';

const notes = [{
    keyCode: 81,
    name: 'heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },{
    keyCode: 87,
    name: 'heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },{
    keyCode: 69,
    name: 'heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },{
    keyCode: 65,
    name: 'heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },{
    keyCode: 83,
    name: 'heater-6',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },{
    keyCode: 68,
    name: 'punchy-kick-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },{
    keyCode: 90,
    name: 'kick-n-hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },{
    keyCode: 88,
    name: 'kick-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },{
    keyCode: 67,
    name: 'h1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  }];

const notes1 = [{
    keyCode: 81,
    name: 'Dsc_Oh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },{
    keyCode: 87,
    name: 'side_stick_1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },{
    keyCode: 69,
    name: 'Cev_H2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },{
    keyCode: 65,
    name: 'Chord_1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },{
    keyCode: 83,
    name: 'Chord_2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },{
    keyCode: 68,
    name: 'Chord_3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },{
    keyCode: 90,
    name: 'Give_us_a_light',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },{
    keyCode: 88,
    name: 'Dry_Ohh',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },{
    keyCode: 67,
    name: 'Brk_Snr',
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
      color: mode1Color
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    console.log(this.state.power);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleClick = (event) => {
    console.log(event.target.value);
    this.playSound(event.target.value);
  }

  handleKeyPress = (event) => {
    this.playSound(event.keyCode);
  }

  playSound = (key) => {
    console.log(key);
    const currentNotes = this.state.mode ? notes : notes1;
    const note = currentNotes.find(obj => obj.keyCode == key);
    if(this.state.power && note !== undefined) {
      console.log(note);
      this.setState({
        displayName: note.name
      });
      const sound = new Audio(note.url);
      sound.volume = this.state.volume;
      sound.play();
    }
  }

  powerToggle = (event) => {
    if(event.target.value === 'power'){
      const powerState = this.state.power;
      const currColor = this.state.color
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
          color: !this.state.mode ? mode1Color : mode2Color
        });    
      } else {
        this.setState({
          mode: !this.state.mode,
          displayName: ''
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
          color={this.state.color}/>
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

class PadContainer extends Component {

  render() {
    return (
      <div className="pad-container">
        <DrumPad id={notes[0].name} url={notes[0].url} value={"Q"} keyCode={81}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[1].name} url={notes[1].url} value={"W"} keyCode={87} 
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[2].name} url={notes[2].url} value={"E"} keyCode={69}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[3].name} url={notes[3].url} value={"A"} keyCode={65}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[4].name} url={notes[4].url} value={"S"} keyCode={83}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[5].name} url={notes[5].url} value={"D"} keyCode={68}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[6].name} url={notes[6].url} value={"Z"} keyCode={90}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[7].name} url={notes[7].url} value={"X"} keyCode={88}
          onClick={this.props.onClick} color={this.props.color}/>
        <DrumPad id={notes[8].name} url={notes[8].url} value={"C"} keyCode={67}
          onClick={this.props.onClick} color={this.props.color}/>
      </div>
    );
  }
}

function DrumPad(props) {

  return (
    <button className="drum-pad" onClick={props.onClick} value={props.keyCode}
      style={{borderColor: props.color, color: props.color}}>
      {props.value}
      <audio src={props.url} type="audio/mpeg"></audio>
    </button>
  );
}

class ControlsContainer extends Component {

  render() {
    return(
      <div className="controls-container">
        <div className="control" id="display"
          style={{borderColor: this.props.color}}>{this.props.name}</div>
        <div className="control" id="power">
          <div>on</div>
          <label className="switch">
            <input type="checkbox" onClick={this.props.onClick} value={'power'}/>
            <span className="slider round" 
              style={{backgroundColor: this.props.color}}></span>
          </label>
          <div>off</div>
        </div>
        <div className="control" id="volume">
          <div>vol</div>
          <input type="range" min="0" max="1" step="0.01" className="volumeSlider" id="myRange"
            value={this.props.volume}
            onChange={this.props.changeVolume}
            style={{backgroundColor: this.props.color,
                    borderLeftColor: this.props.color,
                    borderRightColor: this.props.color}}/>
        </div>
        <div className="control" id="mode">
          <div>mode1</div>
          <label className="switch">
            <input type="checkbox" onClick={this.props.onClick} value={'mode'}/>
            <span className="slider round"
            style={{backgroundColor: this.props.color}}></span>
          </label>
          <div>mode2</div>
        </div>
      </div>
    )
  }
}

export default App;
