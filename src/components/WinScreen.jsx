const WinScreen = ({winner , reset, isTie}) =>{
    return(
        <div className="winScreen">
            <h1>{isTie ? "Draw" : `Winner: ${winner}`}</h1>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

export default WinScreen;