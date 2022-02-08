const BoardRow = ({ label, rowNum, n }) => {
    var tds = [];
    tds.push(<td key={n+1}>{label}</td>)
    for (var i = 0; i < n; i++) {
        var darkLight = rowNum % 2 === 0 ?
            (i % 2 === 0 ? 'dark' : 'light') :
            (i % 2 === 0 ? 'light' : 'dark')
        var id = String.fromCharCode(i+65) + '-' + rowNum;
        tds.push(<td className={darkLight} id={id} key={i}>
            </td>)
    }
    tds.push(<td key={n+2}>{label}</td>)

    return <tr>{tds}</tr>
};

export default BoardRow;
