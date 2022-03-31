
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

const BoardRowPerm = ({ label, rowNum, n, queen }) => {

    var tds = [];

    tds.push(<td key={n + 1}>{label}</td>)

    for (var i = 0; i < n; i++) {

        var classNames = rowNum % 2 === 0 ?
            (i % 2 === 0 ? 'dark' : 'light') :
            (i % 2 === 0 ? 'light' : 'dark')

        var id = String.fromCharCode(i + 65) + '-' + rowNum;

        if (queen == i + 1) {
            classNames += " selected";
        }

        tds.push(<td className={classNames} id={id} key={i}>
        </td>)
    }

    tds.push(<td key={n + 2}>{label}</td>)

    return <tr>{tds}</tr>
};

const BoardRow2DArr = ({ label, rowNum, n, queen }) => {

    var tds = [];

    tds.push(<td key={n + 1}>{label}</td>)

    for (var i = 0; i < n; i++) {

        var classNames = rowNum % 2 === 0 ?
            (i % 2 === 0 ? 'dark' : 'light') :
            (i % 2 === 0 ? 'light' : 'dark')

        var id = String.fromCharCode(i + 65) + '-' + rowNum;

        // classNames += (queen.includes(i + 1)) ? " selected" : ""
        if (queen.includes(i + 1)) {
            classNames += " selected";
        }

        tds.push(<td className={classNames} id={id} key={i}>
        </td>)
    }

    tds.push(<td key={n + 2}>{label}</td>)

    return <tr>{tds}</tr>
};

const BoardRowEmpty = ({ label, rowNum, n }) => {

    var tds = [];

    tds.push(<td key={n + 1}>{label}</td>)

    for (var i = 0; i < n; i++) {

        var classNames = rowNum % 2 === 0 ?
            (i % 2 === 0 ? 'dark' : 'light') :
            (i % 2 === 0 ? 'light' : 'dark')

        var id = String.fromCharCode(i + 65) + '-' + rowNum;

        tds.push(<td className={classNames} id={id} key={i}>
        </td>)
    }

    tds.push(<td key={n + 2}>{label}</td>)

    return <tr>{tds}</tr>
};

const Board = ({ size, curCandidate }) => {

    var board = [];
    console.log("test");

    board.push(<XAxisLabels key={size + 1} n={size} />)

    if (curCandidate) {
        if (typeof (curCandidate.state[0]) === "object") {
            console.log("2darray")
            //2d array representation

            for (let i = size; i > 0; i--) {

                let queens = []

                for (let j = 0; j < size; j++) {
                    if (curCandidate.state[j][1] === i) queens.push(curCandidate.state[j][0])
                }

                board.push(<BoardRow2DArr key={i} label={i} rowNum={i} n={size} queen={queens} />)

            }
        }
        else {
            console.log("perm");
            //permutation representation

            for (let i = size; i > 0; i--) {

                // //find i row number's j column queen position
                // let j = 0;
                // while (j < size && curCandidate.state[j] != i) j++
                // console.log("i,j+1", i, j + 1)

                let j = curCandidate.state.indexOf(i) + 1;

                board.push(<BoardRowPerm key={i} label={i} rowNum={i} n={size} queen={j} />)
            }
        }
    }
    else {
        for (let i = size; i > 0; i--) {
            board.push(<BoardRowEmpty key={i} label={i} rowNum={i} n={size} queen={-1} />)
        }
    }

    board.push(<XAxisLabels key={size + 2} n={size} />)

    let state = curCandidate ? curCandidate.present().map(character => (character + " ")) : ""

    let heading = curCandidate ? <h2>State: {state}</h2> : <p>Select a combination from the results section to see its physical representation.</p>

    return <>

        {heading}

        {/* <h2>state: {curCandidate ? curCandidate.state : ""}</h2> */}

        <table className="board">

            <tbody>

                {board}

            </tbody>

        </table>

    </>
};

export { Board }
