interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    private storage: T[] = [];
    private ID: number = 0;

    constructor(private capacity: number = Infinity) {}

    setId(value: number) {
        this.ID = value;
    }

    getId() {
        return this.ID;
    }

    flip() {
        this.storage.reverse();
    }

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error(
                'Stack has reached max capacity, you cannot add more items',
            );
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
}
