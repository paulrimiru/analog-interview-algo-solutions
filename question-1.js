const witnesses = (heights) => {
  let greater = []
  let lesser = []
  let sortPivot = heights[(heights.length / 2) - 1]

  // sorting the array
  for (const height of heights) {
    if (height >= sortPivot) {
      greater = [...greater, height];
    } else {
      lesser = [...lesser, height];
    }
  }

  const sorted = [...greater, ...lesser];

  let witnessCounter = 0;

// getting the number of witnesses
  for (let i = 0; i < sorted.length; i++) {
    // if its the last witness accept the witness
    if (i === sorted.length -1) {
      witnessCounter += 1
    }

    // if its the the witness is taller than the next witness accept the witness
    if ((i +1) < sorted.length && sorted[i] > sorted[i + 1]) {
      witnessCounter += 1
    }
  }

  return witnessCounter;
}

// complexity o(n)

console.log(witnesses([3, 6, 3, 4, 1, 10, 9, 3, 4, 6, 2, 7, 1]))
