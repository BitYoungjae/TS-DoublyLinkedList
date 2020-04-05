# TS-DoublyLinkedList

타입스크립트로 구현한 이중 연결 리스트 및 덱

## API

```js
const list = new LinkedList();

list.enqueue(3);
list.enqueue(4);
list.enqueue(5);

list.dequeue(); // 3
list.dequeue(); // 4
list.dequeue(); // 5
```

```js
const list = new LinkedList();

list.enqueue(3);
list.enqueue(4);

list.enqueue(5, 'back');
list.dequeue('back'); // 5

list.enqueue(6, 'front');
list.dequeue('front'); // 6
```

```js
const list = new LinkedList(1, 2, 3);

list.clear();
list.size; // 0
```

```js
const list = new LinkedList(1, 2, 3);

list.insert(4, 1, 'back');
list.get(2); // 4

list.insert(5, 1, 'front');
list.get(1); // 5
```

```js
const list = new LinkedList(1, 2, 3);
list.swap(0, 2);

list.get(0); // 3
list.get(2); // 1
```

## Scripts

```bash
npm run start:build
npm run start:test
npm start
```
