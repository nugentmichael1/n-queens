import { useNavigate } from "react-router-dom"

const selectCandidate = (candidate, setCurCandidate) => {
    setCurCandidate(candidate)

}

const Results = props => {

    //redirect to board
    let navigate = useNavigate();

    const maxScore = props.n * (props.n - 1)

    const rBody = undefined
    if (props.results) {
        for (let i = 0; i < props.results.length; i++) {

        }
    }

    const id = 0;

    const rTable = props.results ? <table className="results">
        <caption></caption>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Permutation</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {props.results.map((candidate) => (<tr key={candidate.rank} onClick={() => (props.setCurCandidate(candidate), navigate("/board"))}>
                <td>
                    {candidate.rank + 1}
                </td>
                <td>
                    {candidate.permutation.map(character => (character + " "))}
                </td>
                <td>{candidate.score}</td>
            </tr>))}
        </tbody>
    </table>
        : undefined

    return <>
        <h1>Results</h1>
        {rTable ? "A perfect score -- n*(n-1)=" + props.n + "*" + (props.n - 1) + "=" + maxScore + " --  indicates a solution.  The selection of any row will show the respective queen positions on the Board page." : "Once a experiment is ran, a table of results will appear here."}
        {rTable ? rTable : ""}
    </>
}

export default Results;


/*
useNavigate to redirect to the board on result permutation selection.

-----
import {useNavigate} from "react-router-dom"

let navigate = useNavigate();
navigate("/board");
*/