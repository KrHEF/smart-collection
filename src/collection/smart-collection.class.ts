import {ExecCollection} from "./exec-collection.class";

export class SmartCollection<T> extends ExecCollection<T> implements Iterable<T> {

    public [Symbol.iterator](): Iterator<T> {
        return this._values[Symbol.iterator]();
    };

    /**
     * Adds values to the start of the collection
     */
    public lpush(values: T | T[]): this {
        const newValues: T[] = this.toArray(values);
        this._values.unshift(...newValues);

        return this;
    }

    /**
     * Adds values to the end of the collection
     */
    public rpush(values: T | T[]): this {
        const newValues: T[] = this.toArray(values);
        this._values.push(...newValues);

        return this;
    }

    /**
     * Removes value from the start of the collection and returns it.
     * 
     * If the collection is empty, null is returned.
     */
    public lpop(): T | null;
    /**
     * Removes `count` values from the start of the collection ant returns them.
     * 
     * If the collection is empty, null is returned.
     * 
     * If `count` less than length of collection, returns `length` values.
     */
    public lpop(count: number): T[];
    public lpop(count?: number): null | T | T[] {
        if (count === undefined) {
            return this._values.shift() ?? null;
        }
        if (count <= 0) { return []; }

        return this._values.splice(0, count);
    }

    /**
     * Removes value from the end of the collection and returns it.
     * 
     * If the collection is empty, null is returned.
     */
    public rpop(): T | null;
    /**
     * Removes `count` values from the end of the collection ant returns them.
     * 
     * If the collection is empty, null is returned.
     * 
     * If `count` less than length of collection, returns `length` values.
     */
    public rpop(count: number): T[];
    public rpop(count: number = 1): null | T | T[] {
        if (count === undefined) {
            return this._values.pop() ?? null;
        }
        if (count <= 0) { return []; }

        return this._values.splice(-count).reverse();
    }

    /**
     * Adds values to the collection starting at the `index`
     */
    public insert(values: T | T[], index: number): this {
        const insertValues: T[] = this.toArray(values);
        this._values.splice(index, 0, ...insertValues);

        return this;
    }

    /**
     * Removes values from the collection
     */
    public delete(values: T | T[]): this {
        if (!this.size) { return this; }

        const deleteValues: T[] = this.toArray(values);
        this._values = this._values.filter((val: T) => !deleteValues.includes(val));

        return this;
    }

    /**
     * Clears the collection
     */
    public clear(): this {
        this._values.length = 0;

        return this;
    }

    /**
     * Checks if the collection has the value.
     * @returns {boolean} `true` if the collection has the value, otherwise `false`.
     */
    public has(value: T): boolean {
        return this._values.includes(value);
    }

    /**
     * Sorts the collection.
     */
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
}
