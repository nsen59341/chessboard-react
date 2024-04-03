import './App.css';

function App() {
  const rendeSqr = () => {
    let sqrs = [];
    for (let row = 0; row < 8; row++) {
      const rowSquares = [];
      for (let col = 0; col < 8; col++) {
        const squareColor = (row + col) % 2 === 0 ? 'white' : 'black'; // Alternate colors
        rowSquares.push(
          <td key={`${row}-${col}`} id={`${row}-${col}`} className={`box ${squareColor}`} 
          onMouseOver={(e) => showPath(e)}
          onMouseLeave={(e) => leaveMouse(e)}></td>
        );
      }
      sqrs.push(<tr key={row}>{rowSquares}</tr>);
    }
    return sqrs;
  }

  let storageOfPossibleMoves = [];

  const showPath = (e) => {
    // console.log(e.target.id);
    let id = e.target.id;

    if(id===undefined){
      return;
    }

    let [curr_row, curr_col] = id.split("-").map(idx => idx);

    let directionVector = getDirectionVector('queen');
    let maxRadius = getMaxiumRadius('queen');
    storageOfPossibleMoves = possibleMoves(parseInt(curr_row), parseInt(curr_col), 8, 8, directionVector, maxRadius);
    colorMyPossibleMoves(storageOfPossibleMoves, e.target);
  }

  const leaveMouse = (e) => {
    console.log(storageOfPossibleMoves);
    for(const [k,v] of Object.entries(storageOfPossibleMoves)){
      document.getElementById(k).classList.remove("yellow");
    }
  }

  return (
    <div className="App">
      <table id='table' className='table'>
        <tbody>
          {rendeSqr()}
        </tbody>
      </table>
    </div>
  );
}



function getDirectionVector(player) {
  if (player === "king") {
      return [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [1, 0], [0, -1], [-1, 0]];
  } else if (player === "bishop") {
      return [[1, 1], [-1, 1], [1, -1], [-1, -1]];
  } else if (player === "queen") {
      return [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, 1], [1, 0], [0, -1], [-1, 0]]
  } else if (player === "knight") {
      return [[-2, -1], [-1, -2], [1, -2], [2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1]];
  } else if (player === "rook") {
      return [[-1,0],[1,0],[0,-1],[0,1]];
  }
}

function getMaxiumRadius(player) {
  if (player === 'king') {
      return 1;
  } else if (player === "bishop") {
      return 7;
  } else if (player === "queen") {
      return 7;
  } else if (player === "knight") {
      return 1;
  } else if (player === "rook") {
      return 7
  }
}
function possibleMoves(curr_row, curr_col, N, M, direction, maxRadius) {
  let storageOfPossibleMoves = {};
  for (let dir of direction) {
      for (let radius = 0; radius <= maxRadius; radius++) {
          let r = curr_row + (radius * dir[0]);
          let c = curr_col + (radius * dir[1]);

          if (r >= 0 && c >= 0 && r < N && c < M) {
              let dataIndex = `${r}-${c}`;
              storageOfPossibleMoves[dataIndex] = true;
          } else {
              break;
          }
      }
  }
  
  return storageOfPossibleMoves;
}

function colorMyPossibleMoves(storageOfPossibleMoves, box) {

    for(const [k,v] of Object.entries(storageOfPossibleMoves)) {
        document.getElementById(k).classList.add("yellow");
    }

}

export default App;
