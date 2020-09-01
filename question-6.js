const search = (arr, word) => {
  const stack = (word) => {
    const nodes = word.split('').reverse();

    return {
      pop: () =>  nodes.pop(),
      peek: () => nodes[nodes.length - 1],
      isEmpty: () => nodes.length <= 0,
      view: () => nodes
    }
  }

  const wordStack = stack(word);
  let searchCoordinatesTracker = { lastCorrect: [], direction: 'initial' };

  const isSameCellBlock = (row, col) => {
    if (searchCoordinatesTracker.direction === 'row') {
      const [lRow, lCol] = searchCoordinatesTracker.lastCorrect;
      return lRow === row && lCol + 1 === col
    }

    if (searchCoordinatesTracker.direction === 'col') {
      const [lRow, lCol] = searchCoordinatesTracker.lastCorrect;
      return  lRow + 1 === row && lCol === col
    }

    if (searchCoordinatesTracker.lastCorrect.length && searchCoordinatesTracker.direction === 'initial') {
      const [lRow, lCol] = searchCoordinatesTracker.lastCorrect;
      return lCol === col || lRow === row;
    }

    return true
  }

  for (let i = 0; i < arr.length; i++) {
    if (wordStack.isEmpty()) {
      break;
    }

    for (let j = 0; j < arr[i].length; j++) {
      if (wordStack.isEmpty()) {
        break;
      }

      if (wordStack.peek() === arr[i][j]) {
        const isSameBlock = isSameCellBlock(i, j);

        if (!searchCoordinatesTracker.lastCorrect.length || isSameBlock) {
          searchCoordinatesTracker = {
            lastCorrect: [i, j],
            direction: searchCoordinatesTracker.lastCorrect.length
              ? searchCoordinatesTracker.direction === 'initial'
                ? searchCoordinatesTracker.lastCorrect[0] === i
                  ? 'row' : 'col'
                : 'initial'
              : 'initial'
          }
          wordStack.pop()
        }
      }
    }
  }

  return wordStack.isEmpty();
}

const matrix = [['F', 'A', 'C', 'I'],
['O', 'B', 'Q', 'P'],
['A', 'N', 'O', 'B'],
['M', 'A', 'S', 'S']]

console.log(search(matrix, 'FOAM'))
