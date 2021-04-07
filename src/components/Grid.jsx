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
let gameStatus = null;
const Grid = (array) =>{
    const [playBot, setPlayBot] = useState(true);
    const [moves, setMoves] = useState(0);
    const [turn, setTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false)
    const [played] = useState([]);
    let game = [];
    function checkWinner(){
        let winner = null;
        if (checkWin(array.array, turn ? "x" : "o")){
            winner = turn ? "x" : "o";
        }
        if(gameOver && checkWin(array.array, turn ? "x" : "o") == false){
            winner = 'tie'
        }
        return winner;
    }
    function checkWin(game, player){
        return winCombinations.some(combination=>{
            return combination.every(index =>{
                return game[index] == player;
            })
        })
    }
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
        
        if(playBot == false){
            return;
        }
    }
    function BotMove(){
        if(playBot == false){
            return;
        }
        let BestMove;
        let BestScore = -Infinity;
        let possibleMove = [];
        for (let i = 0; i < array.array.length; i++){
            if (array.array[i] == null){
                possibleMove.push(i);
                array.array[i] = 'x';
                let score = minimax(array.array, 0, turn)
                array.array[i] = null;
                if (score > BestScore) {
                    BestScore = score;
                    BestMove = i;
                }
            }
        }
        if (played.includes(BestMove)){
            BotMove();
        }
        playMove(BestMove);
    }
    function minimax(board, depth, isMaxing){
        let result = checkWin(board, turn ? "x" : "o");
        console.log(result)
        if (result !== null){
            if (result){
                return turn ? 1 : -1;
            }
            return 0;
        }
        // if(played.length == board.length){
        //     return 0;
        // }
        // if(checkWin(board, turn ? "x" : "o") && turn){
        //     return 1;
        // }
        // if(checkWin(board, turn ? "x" : "o") && !turn){
        //     return -1
        // }
        if (isMaxing){
            let BestScore = -Infinity;
            for (let i = 0; i < board.length; i++){
                if (array.array[i] == null){
                    array.array[i] = 'x';
                    let score = minimax(board, depth + 1, false)
                    array.array[i] = null;
                    if (score > BestScore) {
                        BestScore = score;
                    }
                }
            }
            return BestScore;
        }else{
            let BestScore = Infinity;
            for (let i = 0; i < board.length; i++){
                if (array.array[i] == null){
                    array.array[i] = 'o';
                    let score = minimax(board, depth + 1, true)
                    array.array[i] = null;
                    if (score < BestScore) {
                        BestScore = score;
                    }
                }
            }
            return BestScore;
        }
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