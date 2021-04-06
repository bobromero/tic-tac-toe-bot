import {Link} from 'react-router-dom';

const MainPage = () =>{
    return(
        <div>
            <h1>Tic tac toe</h1>
            <Link to="/Game"><button>Play</button></Link>
        </div>
    );
}
export default MainPage;