const maxStack = () => {
  // create nomal stack nomal
  const stack = () => {
    const nodes = [];

    return {
      pop: () =>  nodes.pop(),
      push: (value) =>  nodes.push(value),
      peek: () => nodes[nodes.length - 1],
      isEmpty: () => nodes.length <= 0,
    }
  }

  // create main stack to store our values and tracker to track our maximum value
  const mainStack = stack();
  const trackerStack = stack();

  const push = (value) => {
    if (mainStack.isEmpty()) {
      mainStack.push(value);
      trackerStack.push(value);
      return;
    }

    if (value > trackerStack.peek()) {
      trackerStack.push(value)
    }

    mainStack.push(value)
  }

  const pop = () => {
    const value = mainStack.pop();

    if (value === trackerStack.peek()) {
      trackerStack.pop()
    }

    return value;
  }

  const max = () => {
    return trackerStack.peek();
  }

  return {
    push,
    pop,
    max
  }
}



const myStack = maxStack();

myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(2);

console.log(myStack.max())

myStack.pop();
myStack.pop();

console.log(myStack.max())