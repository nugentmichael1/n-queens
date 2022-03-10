import queenChessPiece from '../images/queen.png';
import { Link } from 'react-router-dom'

const Home = () => {
  console.log("Home Page Called")
  return <>
    <h1>N-Queens</h1>
    <img src={queenChessPiece} alt="Queen chess piece" id="homeQueen" />
    <h2>Solved by Evolutionary Algorithm</h2>

    <h3>Instructions</h3>
    <ol>
      <li>Use the <Link to="/options">"Options" page</Link> to set the parameters of the experiment.
      </li>
      <li>Click run to see the final population set ordered by permutation score.</li>
      <li>Select a member of the final population set to see what the queen positions look like on a chess board.</li>
      <li>
        Go back to the <Link to="/options">"Options" page</Link> anytime to run another experiment.
      </li>
    </ol>

  </>;
};

export default Home;
