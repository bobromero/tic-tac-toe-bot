import React, { useState } from 'react';
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
function currentPlayer(){
    return turn ? 'x' : 'o';
}
let scores = {
    x: 10,
    o: -10,
    tie: 0
}
function minimax(board, depth, isMaxing){
    let result = checkWinner(board);
    if (result !== null){
        // return scores[result];
        if(isMaxing){
            //checking o
            return scores[result]+depth;
        }
        else{
            //checking x
            return scores[result]-depth;
        }
    }
    if(isMaxing){
        let BestScore = -Infinity
        for (let i = 0; i < 9; i++){
            if(board[i]==null){
                board[i] = 'x';
                let score = minimax(board, depth + 1, false);
                board[i] = null;
                if(score > BestScore){
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
                board[i] = 'o';
                let score = minimax(board, depth + 1, true);
                board[i] = null;
                if(score < BestScore){
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
}

const Grid = (array) =>{
    const [playBot, setPlayBot] = useState(true);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    const [played] = useState([]);
    let game = [];
    function playMove(index){
        
        if (played.includes(index)){
            return;
        }
        array.array[index] = turn ? 'x' : 'o';
        turn = !turn
        setMoves(moves + 1);
        played.push(index);
        let hasWon = checkWinner(array.array, played);
        if (hasWon === 'x' || hasWon === 'o'){
            console.log(`${hasWon} Won!`);
            setGameOver(true);
            setPlayBot(false);
        }
        if (hasWon === 'tie'){
            console.log("Game Over: Draw");
            setGameOver(true);
            setPlayBot(false);
        }
    }
    function play(index){
        if(gameOver){
            return;
        }
        checkWinner(array.array)
        playMove(index);
        if(playBot === false){
            return;
        }
    }
    function BotMove(){
        if(playBot === false){
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
                    console.log(BestScore)
                    let score = minimax(array.array, 0, false)
                    array.array[i] = null;
                    if (score > BestScore) {
                        BestScore = score;
                        BestMove = i;
                    }
                }
            }
            play(BestMove);
            return;
        }
        let BestScore = Infinity;
        for (let i = 0; i < 9; i++){
            if (array.array[i] == null){
                possibleMove.push(i);
                array.array[i] = 'o';
                console.log(BestScore)
                let score = minimax(array.array, 0, true)
                array.array[i] = null;
                if (score < BestScore) {
                    BestScore = score;
                    BestMove = i;
                }
            }
        }
        play(BestMove);
    }
    
    for(let i = 0; i < array.array.length; i++){
        let cubeStyle = {
            height: "300px",
            width: "300px",
            color: 'white',
            margin:0,
            display:"grid",
            fontSize: '200px',
            backgroundColor: i % 2 === 0 ? '#222222' : '#000000',
        }
        game.push(<div onClick={() => play(i)} style={cubeStyle}>{array.array[i]}</div>);
    }
    return(
        <div className="grid">
            {game}
            <button onClick={BotMove}>make bot move</button>
            <button onClick={console.log(array.array)}>console the board</button>
        </div>
    );
}

export default Grid