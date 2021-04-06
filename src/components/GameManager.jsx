import React,{useState} from 'react';
import Grid from './Grid';
let array = [null,null,null,null,null,null,null,null,null];
const GameManager = () =>{
    const [player2, setPlayer2] = useState(true);
    
    return(
        <div>
            <Grid
                array = {array}
                
            />

        </div>
    )
}

export default GameManager;