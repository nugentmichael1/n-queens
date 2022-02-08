import XAxisLabels from './XAxisLabels'
import BoardRow from './BoardRow'

const Board = ({ size }) => {
    var board = [];
    board.push(<XAxisLabels key={size+1} n={size} />)
    for (let i = size; i > 0; i--) {
        // let odd = (i % 2 === 0) ? true : false
        board.push(<BoardRow key={i} label={i} rowNum={i} n={size} />)
    }
    board.push(<XAxisLabels key={size+2} n={size}/>)

    return <table><tbody>{board}</tbody></table>

    // return <table>
    //     <XAxisLabels n={size} />
    //     <BoardRow label={2} odd={true} n={size} />
    //     <XAxisLabels n={size} />
    // </table>;
};

export default Board;
