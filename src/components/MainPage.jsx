import {Link} from 'react-router-dom';

const MainPage = () =>{
    return(
        <div>
            <h1>Tic tac toe</h1>
            <Link to="/1PlayerGame"><button>1 player</button></Link>
            <Link to="/2PlayerGame"><button>2 players</button></Link>
        </div>
    );
}
export default MainPage;