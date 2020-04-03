class Vertex<T> {
  public next?: Vertex<T>;
  public prev?: Vertex<T>;
  public value: T;

  constructor(value: T) {
    this.value = value;
  }
}

type direction = 'front' | 'back';

export class LinkedList<T> {
  public head?: Vertex<T>;
  public tail?: Vertex<T>;
  private internalSize: number = 0;

  public constructor(...args: T[]) {
    for (const value of args) {
      this.enqueue(value);
    }
  }

  public get size(): number {
    return this.internalSize;
  }

  public clear(): void {
    delete this.head;
    delete this.tail;
    this.internalSize = 0;
  }

  public enqueue(value: T, to?: direction) {
    const newVertex = new Vertex(value);

    switch (to) {
      case 'back':
        this.enqueueToTail(newVertex);
        break;
      case 'front':
        this.enqueueToHead(newVertex);
        break;
      default:
        this.enqueueToTail(newVertex);
    }

    this.internalSize++;
  }

  public dequeue(from?: direction) {
    switch (from) {
      case 'back':
        return this.dequeueFromTail();
      case 'front':
        return this.dequeueFromHead();
      default:
        return this.dequeueFromTail();
    }
  }

  public get(index: number): T {
    let vertex = this.getVertex(index);
    return vertex.value;
  }

  public search(value: T): number {
    if (!this.head) return -1;

    let index = 0;
    let now = this.head;

    while (now) {
      if (now.value === value) return index;
      if (!now.next) break;
      now = now.next;
      index++;
    }

    return -1;
  }

  public insert(value: T, index: number, direction?: direction) {
    if (index > this.internalSize - 1 || index < 0)
      throw new Error(`Wrong Index : ${index}`);

    const vertex = new Vertex(value);
    let nowVertex = this.getVertex(index);

    switch (direction) {
      case 'back':
        this.insertAfter(nowVertex, vertex);
        break;
      case 'front':
        this.insertBefore(nowVertex, vertex);
        break;
      default:
        this.insertAfter(nowVertex, vertex);
    }

    this.internalSize++;
  }

  public toArray(): T[] {
    const result: T[] = [];

    let nowVertex = this.head;
    while (nowVertex) {
      result.push(nowVertex.value);
      nowVertex = nowVertex.next;
    }

    return result;
  }

  public *[Symbol.iterator](): Generator<T> {
    let index = 0;
    let nowVertex: Vertex<T>;

    while (index < this.internalSize && (nowVertex = this.getVertex(index++))) {
      yield nowVertex.value;
    }
  }

  static from<T>(iterable: Iterable<T>): LinkedList<T> {
    const newList = new LinkedList<T>();

    for (const one of iterable) {
      newList.enqueue(one);
    }

    return newList;
  }

  protected enqueueToTail(vertex: Vertex<T>): void {
    if (!this.tail) {
      this.head = vertex;
      this.tail = this.head;
      return;
    }

    vertex.prev = this.tail;
    this.tail.next = vertex;
    this.tail = vertex;
  }

  protected enqueueToHead(vertex: Vertex<T>): void {
    if (!this.head) {
      this.head = vertex;
      this.tail = this.head;
      return;
    }

    const temp = this.head;
    this.head = vertex;
    vertex.next = temp;
    temp.prev = vertex;
  }

  protected dequeueFromTail(): T | null {
    if (!this.head || !this.tail) return null;

    const temp = this.tail.value;

    if (!this.tail.prev) {
      this.clear();
      return temp;
    }

    this.tail = this.tail.prev;
    delete this.tail.next;
    this.internalSize -= 1;

    return temp;
  }

  protected dequeueFromHead(): T | null {
    if (!this.head || !this.tail) return null;

    const temp = this.head.value;

    if (!this.head.next) {
      this.clear();
      return temp;
    }

    this.head = this.head.next;
    delete this.head.prev;

    this.internalSize -= 1;
    return temp;
  }

  protected getVertex(index: number) {
    if (index > this.internalSize - 1 || index < 0)
      throw new Error(`Wrong Index : ${index}`);

    let nowVertex = this.head as Vertex<T>;

    while (index-- && nowVertex.next) {
      nowVertex = nowVertex.next;
    }

    return nowVertex;
  }

  protected insertAfter(to: Vertex<T>, vertex: Vertex<T>) {
    if (to.next) {
      to.next.prev = vertex;
      vertex.next = to.next;
    } else {
      this.tail = vertex;
    }

    to.next = vertex;
    vertex.prev = to;
  }

  protected insertBefore(to: Vertex<T>, vertex: Vertex<T>) {
    if (to.prev) {
      to.prev.next = vertex;
      vertex.prev = to.prev;
    } else {
      this.head = vertex;
    }

    to.prev = vertex;
    vertex.next = to;
  }
}
