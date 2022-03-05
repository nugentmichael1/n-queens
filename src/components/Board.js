
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

const BoardRow = ({ label, rowNum, n }) => {
    var tds = [];
    tds.push(<td key={n + 1}>{label}</td>)
    for (var i = 0; i < n; i++) {
        var darkLight = rowNum % 2 === 0 ?
            (i % 2 === 0 ? 'dark' : 'light') :
            (i % 2 === 0 ? 'light' : 'dark')
        var id = String.fromCharCode(i + 65) + '-' + rowNum;
        tds.push(<td className={darkLight} id={id} key={i}>
        </td>)
    }
    tds.push(<td key={n + 2}>{label}</td>)

    return <tr>{tds}</tr>
};

const Board = ({ size }) => {
    var board = [];
    board.push(<XAxisLabels key={size + 1} n={size} />)
    for (let i = size; i > 0; i--) {
        // let odd = (i % 2 === 0) ? true : false
        board.push(<BoardRow key={i} label={i} rowNum={i} n={size} />)
    }
    board.push(<XAxisLabels key={size + 2} n={size} />)

    return <table><tbody>{board}</tbody></table>

    // return <table>
    //     <XAxisLabels n={size} />
    //     <BoardRow label={2} odd={true} n={size} />
    //     <XAxisLabels n={size} />
    // </table>;
};

export default Board;
