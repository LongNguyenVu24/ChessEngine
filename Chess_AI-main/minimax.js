
function makeBestMove() {
  if (game.game_over()) { //const game = new Chess(); (script.js)
    alert('Game over');
  }
  let depth = document.getElementById("depth-select");
  let depth_Select = depth.options[depth.selectedIndex].value;

  const bestMove = minimaxRoot(game, depth_Select, true); // depth of program 4
  game.move(bestMove);
  board.position(game.fen());
  if (game.game_over()) {
    alert('Game over');
  }
}



function minimax(game, depth, alpha, beta, maximizingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(game.board());
  }

  const moves = game.moves();

  if (maximizingPlayer) {
    let bestMove = -Infinity;
    for (const move of moves) {
      game.move(move);
      const value = minimax(game, depth-1, alpha, beta, false);
      bestMove = Math.max(bestMove, value);
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        game.undo();
        break;
      }
      game.undo();
    }
    return bestMove;
  } else {
    let bestMove = +Infinity;
    for (const move of moves) {
      game.move(move);
      const value = minimax(game, depth-1, alpha, beta, true);
      bestMove = Math.min(bestMove, value);
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        game.undo();
        break;
      }
      game.undo();
    }
    return bestMove;
  }
}

function minimaxRoot(game, depth, maximizingPlayer) { // tra ve best move found
  const moves = game.moves();
  let bestMove = -Infinity;
  let bestMoveFound = null;

  for (const move of moves) {
    game.move(move);
    const value = minimax(game, depth-1, -Infinity, Infinity, !maximizingPlayer);
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = move;
    }
  }
  console.log(bestMoveFound);
  return bestMoveFound;
}

function evaluateBoard(board) {
  let totalEvaluation = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      totalEvaluation += getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
}

function getPieceValue(piece, x, y) {
  if (piece === null) {
    return 0;
  }
  let absoluteValue;
  if (piece.type === 'p') {
    absoluteValue = 10 + (piece.color ? pawnEvalWhite[x][y] : pawnEvalBlack[x][y]);
  } else if (piece.type === 'n') {
    absoluteValue = 30 + knightEval[x][y];
  } else if (piece.type === 'b') {
    absoluteValue = 30 + (piece.color ? bishopEvalWhite[x][y] : bishopEvalBlack[x][y]);
  } else if (piece.type === 'r') {
    absoluteValue = 50 + (piece.color ? rookEvalWhite[x][y] : rookEvalBlack[x][y]);
  } else if (piece.type === 'q') {
    absoluteValue = 90 + queenEval[x][y];
  } else if (piece.type === 'k') {
    absoluteValue = 900 + (piece.color ? kingEvalWhite[x][y] : kingEvalBlack[x][y]);
  } else {
    throw Error(`Unknown piece type: ${piece.type}`);
  }

  return piece.color === 'w' ? absoluteValue : -absoluteValue;
}

const pawnEvalWhite =
  [
    [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [ 5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [ 1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [ 0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [ 0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [ 0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [ 0.5,  1.0,  1.0, -2.0, -2.0,  1.0,  1.0,  0.5],
    [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
  ];

const pawnEvalBlack = reverseArray(pawnEvalWhite);

const knightEval =
  [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
  ];

const bishopEvalWhite =
  [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [-1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [-1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [-1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [-1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [-1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
  ];

const bishopEvalBlack = reverseArray(bishopEvalWhite);

const rookEvalWhite =
  [
    [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [ 0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [-0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ 0.0,  0.0,  0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
  ];

const rookEvalBlack = reverseArray(rookEvalWhite);

const queenEval =
  [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [-1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [-0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ 0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [-1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [-1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
  ];

const kingEvalWhite =
  [
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [ 2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
    [ 2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0]
  ];

const kingEvalBlack = reverseArray(kingEvalWhite);

function reverseArray(array) {
  return array.slice().reverse();
}