const climbStairs = (n) => {
  return fibonacci(n + 1);
}

let cache = {};

const fibonacci = (n) => {
  let value;
  if (cache[n]) {
    return cache[n]
  }

  if (n <= 1) {
    value = n
  } else {
    value = fibonacci(n-1) + fibonacci(n-2)
  }

  cache[n] = value;
  return value;
}

console.log(climbStairs(5))