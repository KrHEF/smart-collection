export abstract class AbstractCollection<T> {

    protected _values: T[];

    public constructor();
    public constructor(values: T | T[]);
    public constructor(values?: T | T[]) {
        this._values = this.toArray(values);
    }

    /**
     * Gets length of collection.
     */
    public get length(): number {
        return this._values.length;
    }

    /**
     * Gets length of collection.
     * 
     * Same as `length` property.
     */
    public get size(): number {
        return this.length;
    }

    /**
     * Gets values of collection.
     *  
     * @returns {T[]} copies of values  
     */
    public get values(): T[] {
        return [...this._values];
    }

    protected toArray(values?: T | T[]): T[] {
        if (values === undefined || values === null) { return []; }

        return (Array.isArray(values)) ? [...values] : [values];
    }
}