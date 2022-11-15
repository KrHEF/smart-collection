export class Collection<T> implements Iterable<T> {

    protected _values: T[];

    public constructor();
    public constructor(values: T | T[]);
    public constructor(values?: T | T[]) {
        this._values = this.toArray(values);
    }

    public get size(): number {
        return this._values.length;
    }

    public get length(): number {
        return this.size;
    }

    public get values(): T[] {
        return [...this._values];
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._values[Symbol.iterator]();
    };

    public lpush(values: T | T[]): this {
        const newValues: T[] = this.toArray(values);
        this._values.unshift(...newValues);

        return this;
    }

    public rpush(values: T | T[]): this {
        const newValues: T[] = this.toArray(values);
        this._values.push(...newValues);

        return this;
    }

    public lpop(): T | null;
    public lpop(count: number): T[];
    public lpop(count?: number): null | T | T[] {
        if (count === undefined) {
            return this._values.shift() ?? null;
        }
        if (count <= 0) { return []; }

        return this._values.splice(0, count);
    }

    public rpop(): T | null;
    public rpop(count: number): T[];
    public rpop(count: number = 1): null | T | T[] {
        if (count === undefined) {
            return this._values.pop() ?? null;
        }
        if (count <= 0) { return []; }

        return this._values.splice(-count).reverse();
    }

    public insert(value: T, index: number): this;
    public insert(values: T[], index: number): this;
    public insert(values: T | T[], index: number): this {
        const insertValues: T[] = this.toArray(values);
        this._values.splice(index, 0, ...insertValues);

        return this;
    }

    public delete(value: T): this;
    public delete(values: T[]): this;
    public delete(values: T | T[]): this {
        if (!this.size) { return this; }

        const deleteValues: T[] = this.toArray(values);
        this._values = this._values.filter((val: T) => !deleteValues.includes(val));

        return this;
    }

    public clear(): this {
        this._values.length = 0;

        return this;
    }

    public has(value: T): boolean {
        return this._values.includes(value);
    }

    public sort(): this;
    public sort(compareFunc: (a: T, b: T) => number): this;
    public sort(compareFunc?: (a: T, b: T) => number): this {
        if (compareFunc) {
            this._values.sort(compareFunc);
        } else {
            this._values.sort();
        }

        return this;
    }

    protected toArray(values?: T | T[]): T[] {
        if (values === undefined || values === null) { return []; }

        return (Array.isArray(values)) ? values : [values];
    }
}
