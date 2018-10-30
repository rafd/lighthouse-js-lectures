import React, {Component} from 'react';

// Normally, we would split components across files
// State can also be stored within components
// (but, there are many approaches to this)

// STATE:

const state = {
  squares: [null, null, null,
            null, null, null,
            null, null, null]
};


// DERIVED STATE:

const nextTurn = () => {
  const nullCount = state.squares.filter((s) => {return s == null}).length;
  return nullCount % 2 == 0 ? "X" : "O"
}


// TRANSACTIONS:

const play = (index) => {
  if(!state.squares[index]){
    state.squares[index] = nextTurn();
    window.render()
  }
}


// VIEWS:

class Square extends Component {
  render() {
    return (
      <div className="square" onClick={() => { play(this.props.index) }}>
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

class Instruction extends Component {
  render() {
    return (
      <div className="instruction">
        {nextTurn()} plays next
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
