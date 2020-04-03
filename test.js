const { LinkedList } = require('./build/LinkedList');

const sampleArr = [1, 2, 3, 4, 5];

test('enque back or front', () => {
  const list = new LinkedList(...sampleArr);
  list.enqueue(30);
  list.enqueue(35, 'front');

  const { size, head, tail } = list;

  expect(size).toBe(7);
  expect(head.value).toBe(35);
  expect(tail.value).toBe(30);
});

test('insert test', () => {
  const list = new LinkedList(...sampleArr);
  list.insert(35, 0);
  list.insert(45, list.size - 1, 'front');

  const { size, head, tail } = list;

  expect(size).toBe(7);
  expect(head.value).toBe(1);
  expect(tail.value).toBe(5);
  expect(list.get(1)).toBe(35);
  expect(list.get(list.size - 2)).toBe(45);
});

test('swap value', () => {
  const list = new LinkedList(...sampleArr);
  list.enqueue(30);
  list.enqueue(35, 'front');

  list.swap(0, list.size - 1);

  const value1 = list.get(1);
  const value4 = list.get(4);
  list.swap(1, 4);

  const { size, head, tail } = list;

  expect(size).toBe(7);
  expect(head.value).toBe(30);
  expect(tail.value).toBe(35);
  expect(list.get(1)).toBe(value4);
  expect(list.get(4)).toBe(value1);
});
