/** 
 * since an optimal solution is given in the question I have decided to use a stack to evaluate the expression, from the question the assumption that a well
 * formed expression has been provided has been stated therefore checks for invalid expressions have not been included in this expression, from the sample input
 * provided is is assumed that the characters in the expression are seperated by a single space
 * **/

const calculator = (expression) => {
  // creating a stack
  const stack = () => {
    const nodes = []

    return {
      pop: () => nodes.pop(),
      push: (value) => nodes.push(value),
      peek: () => nodes[nodes.length - 1],
      isEmpty: () => nodes.length <= 0
    }
  }

  // declaring and initializing two stacks one for the operands and the other for the operators
  const operatorStack = stack();
  const operandStack = stack();

  // this is a string with the supported operators
  const operators = '(+-*/)';

  // creating an array of characters from the expression
  const infixExpressionArray = expression.split(' ');

  // this is a function to provide us with the precedence of an operator
  const precedence = (op) => { 
    if(op === '+'||op === '-') 
      return 1; 
    if(op === '*'||op === '/') 
      return 2; 
    return 0; 
  }

  // function with reusable code to apply a certain operator
  const applyOperation = (val1, val2, operator) => {
    if (!val1 && operator === '-') {
      return -1 * val2
    }

    switch(operator){ 
        case '+': return val1 + val2; 
        case '-': return val1 - val2; 
        case '*': return val1 * val2; 
        case '/': return val1 / val2; 
    } 
  }

  for (let char of infixExpressionArray) {
    // if the current character is an operator
    if (operators.includes(char)) {
      // if the operators stack is is empty just push the operator and move on to the next character 
      if (operatorStack.isEmpty()) {
        operatorStack.push(char);
        continue;
      }

      // for ( just push them into the stack
      if (char === '(') {
        operatorStack.push(char)
        continue;
      }

      // if ) evalutate all the operators in the operatorStack stack until you find the (
      if (char === ')') {
        while (!operatorStack.isEmpty() && operatorStack.peek() !== '(') {
          const value1 = operandStack.pop();
          const value2 = operandStack.pop();

          operandStack.push(applyOperation(value2, value1, operatorStack.pop()));
        }

        if (!operatorStack.isEmpty()) {
          operatorStack.pop();
        }
      } else {
        while (precedence(operandStack.peek()) >= precedence(char)) {
          const value1 = operandStack.pop();
          const value2 = operandStack.pop();

          operandStack.push(applyOperation(value2, value1, operatorStack.pop()));
        }

        operatorStack.push(char)
      }
    } else {
      // if its not an operator convert it to a number and push it to the array
      const integerValue = parseInt(char, 10);
      operandStack.push(integerValue);
    }
  }

  // if there are remaining un evaluated operators evaluate them all
  while(!operatorStack.isEmpty()) {
    const value1 = operandStack.pop();
    const value2 = operandStack.pop();

    operandStack.push(applyOperation(value2, value1, operatorStack.pop()));
  }


  return operandStack.pop();
}

console.log(calculator('- ( 3 + ( 2 - 1 ) + ( 9 / 3 ) / ( 4 * 9 ) )'))
