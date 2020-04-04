const { LinkedList } = require('./build/LinkedList');

test('basic enque and deque', () => {
  const list = new LinkedList();

  list.enqueue(3);
  list.enqueue(4);
  list.enqueue(5);

  expect(list.dequeue()).toBe(3);
  expect(list.dequeue()).toBe(4);
  expect(list.dequeue()).toBe(5);
});

test('enque back or front', () => {
  const list = new LinkedList();

  list.enqueue(3, 'back');
  list.enqueue(4, 'back');
  list.enqueue(5, 'back');
  list.enqueue(6, 'front');

  expect(list.dequeue('back')).toBe(5);
  expect(list.dequeue('front')).toBe(6);
  expect(list.dequeue('back')).toBe(4);
  expect(list.dequeue('back')).toBe(3);
});

test('Insert test', () => {
  const list = new LinkedList(1, 2, 3);
  list.insert(4, 1, 'front');
  list.insert(5, list.size - 1, 'back');
  list.insert(6, list.size - 1, 'front');

  expect(list.get(1)).toBe(4);
  expect(list.get(list.size - 1)).toBe(5);
  expect(list.get(list.size - 2)).toBe(6);

  list.insert(7, 0, 'front');
  expect(list.head.value).toBe(7);
  list.insert(8, list.size - 1, 'back');
  expect(list.tail.value).toBe(8);
});

test('Swap test', () => {
  const list = new LinkedList(1, 2, 3);
  list.swap(0, 2);

  expect(list.get(0)).toBe(3);
  expect(list.get(2)).toBe(1);
});
