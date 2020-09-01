const LinkedList = () => {
  let linkedList;
  
  const add = (value) => {
    const node = {
      value,
      next: linkedList ? { ...linkedList } : undefined
    }

    linkedList = node;
  }

  const toArray = () => {
    if (!linkedList) {
      return [];
    }

    return convertLinkedListToArray(linkedList);
  }

  const convertLinkedListToArray = (node) => {
    let isDone = false;
    let currentNode = node;
    let convertedArray = [];

    while(!isDone) {
      if (!currentNode.next) {
        convertedArray =  [...convertedArray, currentNode.value];
        isDone = true;
      } else {
        convertedArray = [...convertedArray, currentNode.value];
        currentNode = currentNode.next;
      }
    }

    return convertedArray;
  }

  const reverse = () => {
    let currentNode = linkedList;
    let nextNode;
    let previousNode;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }

    linkedList = previousNode;

    return linkedList;
  }

  return {
    add,
    toArray,
    reverse,
    list: () => linkedList
  }
}

const linkedListA = LinkedList();
linkedListA.add(2);
linkedListA.add(4);
linkedListA.add(3);

linkedListA.reverse();

const linkedListB = LinkedList();
linkedListB.add(5);
linkedListB.add(6);
linkedListB.add(4);

linkedListB.reverse();

const addLinkedList = (listA, listB) => {
  listA.reverse();
  const arrayListA = listA.toArray()
  listB.reverse();
  const arrayListB = listB.toArray()

  const valueA = parseInt(arrayListA.join(''), 10);
  const valueB = parseInt(arrayListB.join(''), 10);

  const sum = valueA + valueB;

  const sumList = LinkedList();
  sum.toString().split('').forEach(num => sumList.add(num));
  return sumList;
}

console.log(addLinkedList(linkedListA, linkedListB).toArray())
