import React, { useEffect, useState } from 'react';
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
const Grid = (array) =>{
    const [playBot, setPlayBot] = useState(true);
    const [moves, setMoves] = useState(0);
    const [turn, setTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false)
    const [played] = useState([]);
    let game = [];
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
            setGameOver(true);
            setPlayBot(false);
        }
        if (played.length == array.array.length && hasWon == false){
            console.log("Game Over Draw");
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
        let possibleMove = []
        for (let i = 0; i < array.array.length; i++){
            if (played.includes(i)){
                console.log(`something at ${i}`)
            }
            else{
                possibleMove.push(i);
            }
        }
        let BestMove = Math.round(Math.random() * possibleMove.length -1);
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