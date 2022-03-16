
const XAxisLabels = ({ n }) => {

    var row = [];

    // empty cell
    row.push(<td key={n + 1}></td>)

    for (let i = 0; i < n; i++) {
        // letters
        let letter = String.fromCharCode(65 + i)
        row.push(<td key={i}>{letter}</td>)
    }

    // empty cell
    row.push(<td key={n + 2}></td>)

    return <tr>
        {row}
    </tr>
}

const BoardRow = ({ label, rowNum, n, queen }) => {
    // console.log(rowNum,queen)
    var tds = [];
    tds.push(<td key={n + 1}>{label}</td>)
    for (var i = 0; i < n; i++) {
        var darkLight = rowNum % 2 === 0 ?
            (i % 2 === 0 ? 'dark' : 'light') :
            (i % 2 === 0 ? 'light' : 'dark')
        var id = String.fromCharCode(i + 65) + '-' + rowNum;
        darkLight += (queen == i + 1) ? " selected" : ""
        tds.push(<td className={darkLight} id={id} key={i}>
        </td>)
    }
    tds.push(<td key={n + 2}>{label}</td>)

    return <tr>{tds}</tr>
};

const Board = ({ size, curCandidate }) => {
    // console.log(curCandidate)
    // console.log(curCandidate == undefined)
    var board = [];
    board.push(<XAxisLabels key={size + 1} n={size} />)
    for (let i = size; i > 0; i--) {
        // let odd = (i % 2 === 0) ? true : false

        let j = 0;
        //find row number's queen positions
        if (curCandidate) {
            while (j < size && curCandidate.permutation[j] != i) j++
            console.log("i,j+1", i, j + 1)
        }

        board.push(<BoardRow key={i} label={i} rowNum={i} n={size} queen={curCandidate ? (curCandidate.permutation ? j + 1 : -1) : -1} />)
    }
    board.push(<XAxisLabels key={size + 2} n={size} />)

    let heading = curCandidate ? <h2>Permutation: {curCandidate.permutation}</h2>: <p>Select a combination from the results section to see its physical representation.</p>
    return <>
        {heading}
        {/* <h2>Permutation: {curCandidate ? curCandidate.permutation : ""}</h2> */}
        <table className="board">
            <tbody>
                {board}
            </tbody>
        </table>
    </>
};

export { Board }
