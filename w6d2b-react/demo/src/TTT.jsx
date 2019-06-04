import React, {Component} from 'react';

const Cell = (props) => {
  return <div className='cell'
              style={{border: "1px solid black", 
                      width: "2em", height: "2em",
                      verticalAlign: "top", 
                      boxSizing: "border-box", 
                      display: "inline-block"}}
              onClick={function() {
                props.play(props.index)
              }
            }>
            {props.value}
          </div>
}

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {grid: ["x","x",null,
                         null,"o",null,
                         null,null,null]}
  }

  // helpers

  emptyCellCount = () => {
    return this.state.grid.filter((x) => x === null ).length;
  }

  nextPlayer = () => {
    return this.emptyCellCount() % 2 === 0 ? "o" : "x";
  }

  gameOver = () => {
    return this.emptyCellCount() === 0;
  }


  // events 
  
  playAtLocation = (index) => {
    if(this.state.grid[index] === null) {
      const grid = this.state.grid
      grid[index] = this.nextPlayer();
      this.setState({grid: grid});
    }
  }

  reset = () => {
    this.setState({grid: [null,null,null,
                          null,null,null,
                          null,null,null]})
  }


  render() {
    return (
      <div>
        <div className="board" style={{width:"6em"}}>
          {this.state.grid.map((v,i) => 
            <Cell key={i} value={v}
                  index={i}
                  play={this.playAtLocation}/>)}
        </div>
        { this.gameOver() && <button onClick={this.reset}>reset</button>  }
      </div>
    )
  }
}

export default App;
