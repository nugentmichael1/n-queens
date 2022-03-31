import { useNavigate } from "react-router-dom"

const Results = props => {

    //redirect to board
    let navigate = useNavigate();

    const maxScore = props.n * (props.n - 1)

    if (props.results) {
        for (let i = 0; i < props.results.length; i++) {
        }
    }

    const rTable = props.results ? <table className="results">
        <caption></caption>
        <thead>
            <tr>
                <th>Rank</th>
                <th>State</th>
                <th>Score</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            {props.results.map((candidate) => (<tr key={candidate.rank} className={(candidate.score / maxScore === 1) ? "solution": "notSolution"} onClick={() => (props.setCurCandidate(candidate), navigate("/board"))}>
                <td>
                    {candidate.rank + 1}
                </td>
                <td>
                    {candidate.present().map(val => (val + " "))}
                    {/* {candidate.state.map(character => (character + " "))} */}
                </td>
                <td>{candidate.score}</td>
                <td>{(candidate.score / maxScore * 100).toFixed(2)} %</td>
            </tr>))}
        </tbody>
    </table>
        : undefined


    let pScore = <><p>Maximum Score Formula: f(n) = n * ( n - 1 )</p> <p> f({props.n}) = {+ props.n + " * " + (props.n - 1)} = {maxScore}</p></>

    let heading = rTable ? <ul> <li><p>A perfect state score indicates a solution.</p></li><li>{pScore}</li> <li><p>The selection of any row will show the respective queen positions on the Board page.</p></li></ul> : <p>Once an experiment is ran, a table of results will appear here.</p>

    return <>
        {/* <h1>Results</h1> */}
        {heading}
        {rTable ? rTable : ""}
    </>
}

export default Results;


/*
useNavigate to redirect to the board on result state selection.

-----
import {useNavigate} from "react-router-dom"

let navigate = useNavigate();
navigate("/board");
*/