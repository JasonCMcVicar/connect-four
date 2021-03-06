"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x]) // grabbing location?
 * 1. does - creates matrix, board
 * 2. take -  width height variables
 * 3. update global variable board (array matrix)
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //create matrix with y = columns, x = rows
  for (let y = 0; y < HEIGHT; y++) {
    board.push([]);
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(null); //changed 'null' to null
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops.
 * 1. creating html board
 * 2. take global consts width height
 * 3. update html dom
 */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  //variable top grabs element id 'tr' (table row, td = table data tag, th = header tag)
  const top = document.createElement("tr");
  //adds "id"=column-top to element tr and makes it clickable
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: creating the top row (headcell) where we can select where we will drop piece
  // and appending it to the DOM
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    let row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      let cell = document.createElement("td");

      // TODO: add an id, y-x, to the above table cell element
      // you'll use this later, so make sure you use y-x
      cell.setAttribute("id", `${y}-${x}`);

      // TODO: append the table cell to the table row
      row.appendChild(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.appendChild(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  console.log("findSpotForCol function being called");
  // TODO: write the real version of this, rather than always returning 5
  for (let y = HEIGHT - 1; y >= 0; y--) {
    console.log("y", y);
    if (board[y][x] === null) {
      
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let divPiece = document.createElement("div");
  let cell = document.getElementById(`${y}-${x}`);
  divPiece.className = "piece p1";
  cell.appendChild(divPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  
  let y = findSpotForCol(x);
  
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  
  //change from null to currplayer variable
  //unsure of following line, likely will get deleted
  //currPlayer = board[y][x];
  console.log(currPlayer, 'currPlayer');
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //every function : current value !== null
  //haven't tested yet, but better possible solution?
  if (board[0].every((x) => x !== null)) {
    endGame();
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 2 ? 1 : 2;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    if (cells.every((x) => x === currPlayer)) {
      return true;
    }
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to _win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to _win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      let diagDR = [
        [y, x],
        [y - 1, x + 1],
        [y - 2, x + 2],
        [y - 3, x + 3],
      ];

      // find _winner (only checking each _win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

// const board = [
//     [ null, null, null, null, null, null, null ],
//     [ null, null, null, null, null, null, null ],
//     [ null, null, null, null, null, null, null ],
//     [ null, null, null, null, null, null, null ],
//     [ null, null, null, null, null, null, null ],
//     [ null, null, null, null, null, null, null ],
//   ];
