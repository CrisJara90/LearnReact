import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// CLASS COMPONENT
// class Square extends React.Component {
    
//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={()=>this.props.handleClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
// }

// FUNCTION COMPONENT

function Square(props) {
    return(
        <button 
            className='square' 
            onClick={props.handleClick3}
        >
            {props.value}
        </button>
    )
}
  
class Board extends React.Component {


    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                handleClick3={() => this.props.handleClick2(i)}
            />
        );
    }

    render() {     
        return (
        <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            step:0,
            player: 'X',
        };
    }


    handleClick1(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.player;
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            player: (this.state.player === 'X') ? 'O' : 'X',
        });
    }

    jumpTo(step) {
        const history = this.state.history;
        this.setState({
            history: history.slice(0, step + 1),
            step:step
        })
    }


    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const btnLabel = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{btnLabel}</button>
                </li>
            )
        })


        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        }else{
            status = `Next player: ${this.state.player}`;
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                handleClick2={(i) => this.handleClick1(i)}
            />
            </div>
            <div className="game-info">
            <div className="status">{ status }</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}

// ========================================

function calculateWinner(squares) {
    const  winner_lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winner_lines.length; i++) {
        const [a, b, c] = winner_lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
            
        }
    }

    return null
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);