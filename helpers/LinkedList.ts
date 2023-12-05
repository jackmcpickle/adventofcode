export class DoublyLinkedListNode<Type> {
    public value: Type | null = null;
    public next: DoublyLinkedListNode<Type> | null = null;
    public prev: DoublyLinkedListNode<Type> | null = null;
}

export class DoublyLinkedList<Type> {
    private source: DoublyLinkedListNode<Type> | null;
    private destination: DoublyLinkedListNode<Type> | null;

    private name: string;
    private size: number;

    constructor(name: string) {
        this.name = name;
        this.source = null;
        this.destination = null;
        this.size = 0;
    }

    public getName(): string {
        return this.name;
    }

    public length(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size <= 0;
    }

    public contains(value: Type): boolean {
        if (this.isEmpty()) {
            return false;
        }
        let tmp = this.source;
        while (tmp != null) {
            if (tmp.value === value) {
                return true;
            }
            tmp = tmp.next;
        }
        return false;
    }

    public get(index: number): any {
        if (index > this.size || this.isEmpty()) {
            throw new RangeError('Index out of range.');
        }

        if (index > this.size / 2) {
            let i = this.size - 1 - index;
            let tmp = this.destination;
            while (i > 0) {
                tmp = tmp.prev;
                i--;
            }
            return tmp.value;
        } else {
            let tmp = this.source;
            for (let i = 0; i < index; i++) {
                tmp = tmp.next;
            }
            return tmp.value;
        }
    }

    public getFirst(): Type | null {
        if (this.source != null) {
            return this.source.value;
        }
        return null;
    }

    public getLast(): Type | null {
        if (this.destination != null) {
            return this.destination.value;
        }
        return null;
    }

    public addLast(value: Type) {
        if (this.isEmpty()) {
            let tmp = new DoublyLinkedListNode<Type>();
            this.source = tmp;
            this.destination = tmp;
            this.size++;
            return;
        } else {
            let tmp = new DoublyLinkedListNode<Type>();
            tmp.next = null;
            tmp.prev = this.destination;
            tmp.value = value;

            this.destination.next = tmp;

            this.destination = tmp;
            this.size++;
        }
    }

    public addFirst(value: Type) {
        if (this.isEmpty()) {
            let tmp = new DoublyLinkedListNode<Type>();
            tmp.value = value;
            this.source = tmp;
            this.destination = tmp;
            this.size++;
        } else {
            let tmp = new DoublyLinkedListNode<Type>();
            tmp.next = this.source;
            tmp.prev = null;
            tmp.value = value;

            this.source.prev = tmp;

            this.source = tmp;
            this.size++;
        }
    }

    public remove(value: any) {
        if (this.isEmpty()) {
            return;
        }
        let tmp = this.source;
        while (tmp != null) {
            if (tmp.value === value) {
                if (tmp.prev != null) {
                    tmp.prev.next = tmp.next;
                } else {
                    this.source = tmp.next;
                }
                if (tmp.next != null) {
                    tmp.next.prev = tmp.prev;
                } else {
                    this.destination = tmp.prev;
                }
                this.size--;
                return;
            }

            tmp = tmp.next;
        }
    }

    public removeFirst() {
        if (this.isEmpty()) {
            return;
        }
        if (this.size == 1) {
            this.source = null;
            this.destination = null;
            this.size--;
        } else {
            this.source = this.source.next;
            this.source.prev = null;
            this.size--;
        }
    }

    public removeLast() {
        if (this.isEmpty()) {
            return;
        }
        if (this.size == 1) {
            this.source = null;
            this.destination = null;
            this.size--;
        } else {
            this.destination = this.destination.prev;
            this.destination.next = null;
            this.size--;
        }
    }

    public indexOf(value: Type) {
        if (this.isEmpty()) {
            return -1;
        }
        let index = 0;
        let tmp = this.source;
        while (tmp != null) {
            if (tmp.value === value) {
                return index;
            }
            tmp = tmp.next;
            index++;
        }
        return -1;
    }
}
