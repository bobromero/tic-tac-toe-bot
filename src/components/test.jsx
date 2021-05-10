import React, { useState } from 'react';
let board = ['O','X','X',null,"O","O","X","O","X"];
let played = [1, 7, 2, 0, 6, 4, 8, 5];
function checkWinner(board, playedBoard = 0){
    //!idea for checking how a game was finished from WebDevSimplified and The Coding train
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
    if (winner == null && board.length === played.length){
        return 'tie';
    }
    return winner;
}
function minimax(board, playedGame = [], depth, isMaxing){
    //!minimax algorithmn inspired by coding train on youtube
    let result = checkWinner(board, playedGame);
    if (result !== null){
        if(result == 'X'){
            return 10 - depth;
        }
        if(result == 'O'){
            return -10 + depth;
        }
        return 0;
    }
    //!minimax algorithmn inspired by coding train on youtube
    if(isMaxing){
        let BestScore = Infinity
        for (let i = 0; i < 9; i++){
            if(board[i]==null){
                board[i] = "O";
                playedGame.push(i);
                let score = minimax(board, playedGame, depth + 1, false);
                board[i] = null;
                playedGame.pop();
                if(score < BestScore && score != Infinity){
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
    //!minimax algorithmn inspired by coding train on youtube
    else{
        let BestScore = -Infinity
        for (let i = 0; i < 9; i++){
            if(board[i]==null){
                board[i] = 'X';
                playedGame.push(i);
                let score = minimax(board, playedGame, depth + 1, true);
                board[i] = null;
                playedGame.pop();
                if(score > BestScore && score != -Infinity){
                    BestScore = score;
                }
            }
        }
        return BestScore;
    }
}
function Test() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={()=>{console.log(minimax(board, played, 0, false))}}>{count}</button>
            
        </div>
    );
}

export default Test;