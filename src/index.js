import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FacebookRoute from './facebooklogin'


const Square = ({onClick, value}) => 
<button className="square" onClick={onClick}>
{value}
</button>

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: !null,
      startTimes:[],
      timeDiff: null
    };
  }

  handleClick=(i)=> {

    const copyOfSquares = this.state.squares.slice();
    if (calculateWinner(copyOfSquares) || copyOfSquares[i]) {
      return;
    }
    copyOfSquares[i]= this.state.xIsNext ? 'X' : 'O';

    let startTime= Date.now();
    this.state.startTimes.push(startTime);
    console.log(this.state.startTimes)
    this.setState({
      squares: copyOfSquares,
      xIsNext: !this.state.xIsNext
    });
   

  }

   

  renderSquare(i) {
    // passing in value
    return <Square value= {this.state.squares[i]}
                  onClick={() => this.handleClick(i)}/>;
  }

  render() {
    console.count("render board");
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      let timeDiffs=this.state.startTimes[this.state.startTimes.length-1]-this.state.startTimes[0]
      status = `Winner:  ${winner} ${Math.floor(timeDiffs/1000)} seconds`;
    }  
     else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  
}

class Game extends React.Component {
  constructor(){
    super();
    this.state= {
      highScores:[]
    }
  }

  getHighScores = async () => {
    const url ='https://ftw-highscores.herokuapp.com/tictactoe-dev'
    const resp= await fetch(url)
    let json= await resp.json()
    this.setState({
      highScores:json.items
    })
  }

  componentDidMount(){
    this.getHighScores();
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        <p>High Scores</p>
          {this.state.highScores.map(item => <li>{item.player}: {item.score}</li>)}
        </div>
        <FacebookRoute/>
      </div>
    );
  }

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
