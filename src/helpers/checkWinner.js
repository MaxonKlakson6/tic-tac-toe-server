const checkHorizontal = (fields, symbol) => {
  return (
    (fields[0] === symbol && fields[1] === symbol && fields[2] === symbol) ||
    (fields[3] === symbol && fields[4] === symbol && fields[5] === symbol) ||
    (fields[6] === symbol && fields[7] === symbol && fields[8] === symbol)
  );
};

const checkVertical = (fields, symbol) => {
  return (
    (fields[0] === symbol && fields[3] === symbol && fields[6] === symbol) ||
    (fields[1] === symbol && fields[4] === symbol && fields[7] === symbol) ||
    (fields[2] === symbol && fields[5] === symbol && fields[8] === symbol)
  );
};

const checkDiagonal = (fields, symbol) => {
  return (
    (fields[0] === symbol && fields[4] === symbol && fields[8] === symbol) ||
    (fields[2] === symbol && fields[4] === symbol && fields[6] === symbol)
  );
};

const checkWinner = (fields, symbol) => {
  return (
    checkHorizontal(fields, symbol) ||
    checkVertical(fields, symbol) ||
    checkDiagonal(fields, symbol)
  );
};

module.exports = checkWinner;
