import React from 'react';
import Grid from './Grid';
let array = [null,null,null,null,null,null,null,null,null];
const GameManager = () =>{
    return(
        <div className="game">
            <Grid
                array = {array}
            />

        </div>
    )
}

export default GameManager;