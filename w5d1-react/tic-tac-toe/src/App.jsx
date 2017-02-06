import React, {Component} from 'react';

// state

const state = {
  squares: [null, null, null,
            null, null, null,
            null, null, null]
};

const nextMove = () => {
  const nullCount = state.squares.filter((s) => {return s == null}).length;
  return nullCount % 2 == 0 ? "X" : "O"
}

// transactions

const play = (index) => {
  if(!state.squares[index]){
    state.squares[index] = nextMove();
    window.render()
  }
}

// views

class Instruction extends Component {
  render() {
    return (
      <div className="instruction">
        {nextMove()} plays next
      </div>
    )
  }
}

class Square extends Component {
  render() {
    return (
      <div className="square" onClick={function() { play(this.props.index) }.bind(this)}>
      {this.props.value}
      </div>
    )
  }
}

class Board extends Component {
  render() {
    return (
     <div className="board">
       { state.squares.map( (value, i) => { return <Square index={i} value={value} /> } ) }
     </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <Instruction />
        <Board />
      </div>
    );
  }
}

export default App;
