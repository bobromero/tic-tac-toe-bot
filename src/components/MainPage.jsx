import {Link} from 'react-router-dom';

const MainPage = () =>{
    return(
        <div>
            <h1>Tic tac toe</h1>
            <Link to="/Game"><button>Play</button></Link>
            <Link to="/Game1"><button>Play1</button></Link>
        </div>
    );
}
export default MainPage;