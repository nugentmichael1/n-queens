const XAxisLabels = ({ n }) => {

  var row = [];

  // empty cell
  row.push(<td key={n+1}></td>)

  for (let i = 0; i < n; i++) {
    // letters
    let letter = String.fromCharCode(65+i)
    row.push(<td key={i}>{letter}</td>)
  }

  // empty cell
  row.push(<td key={n+2}></td>)

  return <tr>
    {row}
  </tr>
}

//   return <tr>

//     <td></td>

//     <td>A</td>
//     <td>B</td>
//     <td>C</td>
//     <td>D</td>
//     <td>E</td>
//     <td>F</td>
//     <td>G</td>
//     <td>H</td>

//     <td></td>


//   </tr>
// }

export default XAxisLabels;
