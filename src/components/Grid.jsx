import React, { useState } from 'react';
let winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
function checkWin(game, player){
    return winCombinations.some(combination=>{
        return combination.every(index =>{
            return game[index] == player;
        })
    })
}
function getOccurrence(array, value) {
    var count = 0;
    for (let i = 0; i < array.length; i++){
        if (array[i] == value){
            i++;
        }
        count = i;
    }
    return count;
}
function checkWinner(board){
    let winner = null;
    //horizontal check
    for(let i = 0; i < 9; i+=3){
        if(board[0 + i] == board[1 + i] && board[0 + i] == board[2 + i]){
            if(board[0 + i] !== null){
                winner = board[0 + i]
            }
        }
    }
    //verticle, check
    for(let i = 0; i < 3; i++){
        if(board[0 + i] == board[3 + i] && board[0 + i] == board[6 + i]){
            if(board[0 + i] !== null){
                winner = board[0 + i]
            }
        }
    }
    //diagonal check
    if(board[0] == board[4] && board[0] == board[8]){
        if(board[0] !== null){
            winner = board[0]
        }
    }else if(board[2] == board[4] && board[2] == board[6]){
        if(board[2] !== null){
            winner = board[2]
        }
    }
    if (winner == null && getOccurrence(board.length, 'x') == 5){
        return 'tie';
    }
    // console.log(`winner: ${winner}`);
    return winner;
}
let scores = {
    x: 1,
    o: -1,
    tie: 0
}
function minimax(board, depth, isMaxing){
    let result = checkWinner(board);
    if (result !== null){
        return scores[result];
    }
    if (isMaxing){
        let BestScore = -Infinity;
        for (let i = 0; i < 9; i++){
            if (board[i] == null){
                board[i] = 'x';
                let score = minimax(board, depth + 1, false)
                board[i] = null;
                if (score > BestScore) {
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
    else{
        let BestScore = Infinity;
        for (let i = 0; i < 9; i++){
            if (board[i] == null){
                board[i] = 'o';
                let score = minimax(board, depth + 1, true)
                board[i] = null;
                if (score < BestScore) {
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
}
let gameStatus = null;
const Grid = (array) =>{
    const [playBot, setPlayBot] = useState(true);
    const [moves, setMoves] = useState(0);
    const [turn, setTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false)
    const [played] = useState([]);
    let game = [];
    
    
    function playMove(index){
        
        if (played.includes(index)){
            return;
        }
        array.array[index] = turn ? 'x' : 'o';
        
        setTurn(!turn);
        setMoves(moves + 1);
        played.push(index);
        let hasWon = checkWin(array.array, turn ? "x" : "o");
        if (hasWon){
            console.log('win');
            gameStatus = turn ? "x" : "o";
            setGameOver(true);
            setPlayBot(false);
        }
        if (played.length == array.array.length && hasWon == false){
            console.log("Game Over Draw");
            gameStatus = "tie";
            setGameOver(true);
            setPlayBot(false);
        }
    }
    function play(index){
        if(gameOver){
            return;
        }
        playMove(index);
        checkWinner(array.array)
        if(playBot == false){
            return;
        }
    }
    function BotMove(){
        if(playBot == false){
            return;
        }
        let BestMove;
        let possibleMove = [];
        if (turn){
            let BestScore = -Infinity;
            for (let i = 0; i < 9; i++){
                if (array.array[i] == null){
                    possibleMove.push(i);
                    array.array[i] = 'x';
                    let score = minimax(array.array, 0, false)
                    array.array[i] = null;
                    if (score > BestScore) {
                        BestScore = score;
                        BestMove = i;
                    }
                }
            }
        }
        else{
            let BestScore = Infinity;
            for (let i = 0; i < 9; i++){
                if (array.array[i] == null){
                    possibleMove.push(i);
                    array.array[i] = 'o';
                    let score = minimax(array.array, 0, true)
                    array.array[i] = null;
                    if (score < BestScore) {
                        BestScore = score;
                        BestMove = i;
                    }
                }
            }
        }
        if (played.includes(BestMove)){
            BotMove();
        }
        playMove(BestMove);
    }
    
    for(let i = 0; i < array.array.length; i++){
        let cubeStyle = {
            height: "300px",
            width: "300px",
            color: 'white',
            margin:0,
            display:"grid",
            fontSize: '200px',
            backgroundColor: i % 2 == 0 ? '#222222' : '#000000',
        }
        game.push(<div onClick={() => play(i)} style={cubeStyle}>{array.array[i]}</div>);
    }
    return(
        <div className="grid">
            {game}
            <button onClick={BotMove}>make bot move</button>
        </div>
    );
}

export default Grid