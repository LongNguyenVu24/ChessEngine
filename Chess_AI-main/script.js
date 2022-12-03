const config = {
  draggable: true,
  position: '',
  onDragStart: onDragStart,
  onDrop: onDrop,
  moveSpeed: 'slow',
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  sparePieces: true,
  onSnapEnd: onSnapEnd
}

const game = new Chess();
const board = Chessboard('myBoard', config);
$('#startBtn').on('click', board.start)

document.getElementById("startBtn").addEventListener('click', ()=>{
  board.clear;
  document.getElementById("startBtn").style.display= 'none';
  document.getElementById("restartBtn").style.display= 'block'
});
document.getElementById("restartBtn").addEventListener('click', ()=>{
   window.location = "index.html";
   document.getElementById("restartBtn").style.display= 'block';
});



// $('#clearBtn').on('click', board.clear) // suazz
$('#flipOrientationBtn').on('click', board.flip)
let undo = document.getElementById("undo");

undo.addEventListener("click",()=>{
     takeback();
});


  function takeback() { 
    game.undo();//undo chi doi nua nuoc chay 2x undo doi 1 nuoc
    game.undo();
    board.position(game.fen());
    updateStatus(); }
  
  


function onDragStart(source, piece, position, orientation) {
  if (game.game_over()) return false;

  if ( 
  (piece.search(/^b/) !== -1) ||
  (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
  (game.turn() === 'w' && piece.search(/^b/) !== -1)
    ) {
    return false;
  }
}

function onDrop(source, target) {
  removeGreySquares();
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  setTimeout(makeBestMove, 50);
}

function onSnapEnd() {
  board.position(game.fen());
}








// show move
var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

function removeGreySquares () {
  $('#myBoard .square-55d63').css('background', '')
}

function greySquare (square) {
  var $square = $('# .square-' + square)

  var background = whiteSquareGrey
  if ($square.hasClass('black-3c85d')) {
    background = blackSquareGrey
  }

  $square.css('background', background)
}

function onMouseoverSquare (square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  })

  // exit if there are no moves available for this square
  if (moves.length === 0) return

  // highlight the square they moused over
  greySquare(square)

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to)
  }
}
function onMouseoutSquare (square, piece) {
  removeGreySquares()
}
