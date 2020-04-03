import { LinkedList } from './build/LinkedList.js';

const list = new LinkedList(1, 2, 3, 4);
list.insert(3334, 3);
const firstTest = list.search(3334);

list.insert(3432, 0, 'front');
const secondTest = list.search(3432);
const thirdTest = list.size;

const list2 = new LinkedList(1, 2, 3, 4);
list2.swap(1, 3);
const fourthTest = '' + list2.get(1) + list2.get(3);

console.log(
  `
  #1 : ${firstTest === 4}
  #2 : ${secondTest === 0}
  #3 : ${thirdTest === 6}
  #4 : ${fourthTest === '42'}
  `,
);
