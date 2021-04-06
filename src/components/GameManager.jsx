import {useState} from 'react';
import Grid from './Grid';
let array = [null,null,null,null,null,null,null,null,null];
const GameManager = () =>{
    const [player2, setPlayer2] = useState(true);
    const [turn, setTurn] = useState(true);
    return(
        <div>
            <Grid
                array = {array}
                player2 = {player2}
            />
        </div>
    )
}

export default GameManager;