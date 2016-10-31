import React, {Component} from 'react';

// Normally, we would split components across files
// State can also be stored within components
// (but, there are many approaches to this)

// STATE:

window.state = {
  squares: [null, null, null,
            null, null, null,
            null, null, null]
}

// DERIVED STATE:

const nextTurn = () => {
  const countNull = state.squares.filter((s) => { return s == null }).length;
  return countNull % 2 == 0 ? "X" : "O";
}

// TRANSACTIONS:

const play = (index) => {
  if(!state.squares[index]){
    state.squares[index] = nextTurn();
    render();
  }
}

// COMPONENTS:

class Square extends Component {
  render() {
    return (
      <div className="square"
           onClick={function() {
                     play(this.props.index)
                   }.bind(this)}>
          {this.props.value}
      </div>
    );
  }
}

class Board extends Component {
  render() {
    return (
      <div className="board">
        { state.squares.map( (value, i) => <Square value={value} index={i} key={i}/> ) }
      </div>
    );
  }
}

class Instruction extends Component {
  render() {
    return (
      <div className="instruction">
        {nextTurn()} is playing next
      </div>
    );
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
