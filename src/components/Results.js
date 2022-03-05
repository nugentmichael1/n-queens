const Results = props => {

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
            {props.results.map(({ rank, permutation, score }) => (<tr key={rank} onClick={() => props.setQueens(permutation)}>
                <td>
                    {rank+1}
                </td>
                <td>
                    {permutation.map(character => ( character + " "))}
                </td>
                <td>{score}</td>
            </tr>))}
        </tbody>
    </table>
        : undefined






    return <>
        <h1>Results</h1>
        {rTable ? "A perfect score -- n*(n-1)=" + props.n + "*" + (props.n-1) + "=" + maxScore + " --  indicates a solution.  The selection of any row will show the respective queen positions on the Board page." : "Once a experiment is ran, a table of results will appear here."}
        {rTable ? rTable : ""}
    </>
}

export default Results;