import React, { useState } from 'react';
import WinScreen from './WinScreen'
let turn = true;
function checkWinner(board, playedBoard = 0){
    let winner = null;
    //horizontal check
    for(let i = 0; i < 9; i+=3){
        if(board[0 + i] === board[1 + i] && board[0 + i] === board[2 + i]){
            if(board[0 + i] !== null){
                winner = board[0 + i]
            }
        }
    }
    //verticle, check
    for(let i = 0; i < 3; i++){
        if(board[0 + i] === board[3 + i] && board[0 + i] === board[6 + i]){
            if(board[0 + i] !== null){
                winner = board[0 + i]
            }
        }
    }
    //diagonal check
    if(board[0] === board[4] && board[0] === board[8]){
        if(board[0] !== null && board[4] !== null){
            winner = board[0]
        }
    }
    else if(board[2] === board[4] && board[2] === board[6]){
        if(board[2] !== null && board[4] !== null){
            winner = board[2]
        }
    }
    if (winner == null && board.length === playedBoard.length){
        return 'tie';
    }
    return winner;
}
let scores = {
    X: 10,
    O: -10,
    tie: 0
}
function minimax(board, depth, isMaxing, maxingPlayer){
    let result = checkWinner(board);
    if (result !== null){
        if(result == 'X'){
            return scores[result]-depth;
        }
        if(result == 'O'){
            return scores[result]+depth;
        }
        
    }
    if(isMaxing){
        let BestScore = -Infinity
        for (let i = 0; i < 9; i++){
            if(board[i]==null){
                board[i] = maxingPlayer ? 'X' : 'O';
                let score = minimax(board, depth + 1, false, !maxingPlayer);
                board[i] = null;
                if(score > BestScore && score != -Infinity){
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
    else{
        let BestScore = Infinity
        for (let i = 0; i < 9; i++){
            if(board[i]==null){
                board[i] = maxingPlayer ? 'X' : 'O';
                let score = minimax(board, depth + 1, true, !maxingPlayer);
                board[i] = null;
                if(score < BestScore && score != Infinity){
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
}
const Grid = (array) =>{
    const [moves, setMoves] = useState(0);
    const [isShowing, setIsShowing] = useState(false);
    const [isTie, setIsTie] = useState(false);
    let [played] = useState([]);
    const [winner, setWinner] = useState('');
    let game = [];
    let style = {
        display: isShowing ? 'grid' : 'none'
    }
    function undoMove(tieClean){
        if(moves <= 0){
            return;
        }
        playMove(played[played.length-1], true, tieClean);
        played.pop(played[played.length-1]);
        setMoves(moves - 1);
        return;
    }
    function reset(){
        for(let i = 0; i < 9; i++){
            undoMove(true);
        }
        setMoves(0);
        setWinner('');
        setIsShowing(false);
        turn = true;
        setIsTie(false);
    }
    function displayWinner(winnerP){
        setWinner(winnerP);
        setIsShowing(true);
    }
    function playMove(index, undo = false, tieClean = false){
        if (played.includes(index) && undo == false){
            return;
        }
        array.array[index] = turn ? 'X' : 'O';
        if(undo){
            array.array[index] = null;
        }
        turn = !turn
        if(!undo){
            played.push(index);
        }
        setMoves(moves + 1);
        let hasWon = checkWinner(array.array, played);
        if (hasWon === 'X' || hasWon === 'O'){
            setTimeout(function(){ displayWinner(hasWon); }, 1000)
            // console.log(`${hasWon} Won!`);
        }
        if (hasWon === 'tie' && !tieClean){
            setIsTie(true)
            setTimeout(function(){ displayWinner(hasWon); }, 1000)
            // console.log("Game Over: Draw");
            return;
        }
        
    }
    function play(index){
        if(checkWinner(array.array) !== null){
            return;
        }
        playMove(index);
    }
    function BotMove(){
        let BestMove;
        let possibleMove = [];
        
        if (turn){
            
            let BestScore = -Infinity;
            for (let i = 0; i < 9; i++){
                if (array.array[i] == null){
                    possibleMove.push(i);
                    array.array[i] = 'X';
                    let score = minimax(array.array, 0, false, false);
                    array.array[i] = null;
                    if (score > BestScore && score != -Infinity) {
                        BestScore = score;
                        BestMove = i;
                    }
                }
            }
            play(BestMove);
            return;
        }
        if(array.array[4] == null){
            play(4);
            return;
        }
        let BestScore = Infinity;
        for (let i = 0; i < 9; i++){
            if (array.array[i] == null){
                possibleMove.push(i);
                array.array[i] = 'O';
                let score = minimax(array.array, 0, false, true)
                array.array[i] = null;
                if (score < BestScore && score != Infinity) {
                    BestScore = score;
                    BestMove = i;
                }
            }
        }
        play(BestMove);
    }
    for(let i = 0; i < array.array.length; i++){
        let cubeStyle = {
            margin:0,
            backgroundColor: i % 2 === 0 ? '#222222' : '#000000',
        }
        game.push(<div key={i} className="square" onClick={() => play(i)} style={cubeStyle}><div className="textDiv"><p>{array.array[i]}</p></div></div>);
    }
    return(
        <div>
            <h1>React Tic Tac Toe With AI!</h1>
            <h3>CLICK TO START</h3>
            <div>
                <h1>Moves: {moves}</h1>
                <div className="MoveButtons">
                    <button onClick={BotMove}>Make Bot Move</button>
                    <button onClick={undoMove}>Undo Move</button>
                    <button onClick={reset}>Reset</button>
                </div>
            </div>
            <div className="grid">
                {game}
                
            </div>
            <div style={style}>
                <WinScreen
                    winner={winner}
                    reset={reset}
                    isTie={isTie}
                />
            </div>
        </div>
    );
}

export default Grid