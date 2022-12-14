import {SmartCollection} from './smart-collection.class';

export class UniqueCollection<T> extends SmartCollection<T> {

    public constructor();
    public constructor(value: T | T[]);
    public constructor(values?: T | T[]) {
        super();

        if (values) {
            const newValues: T[] = this.toArray(values);
            this.rpush(newValues);
        }
    }

    public override lpush(values: T | T[]): this {
        this.toArray(values)
            .reverse()
            .forEach((value: T) => {
                if (!this.has(value)) {
                    this._values.unshift(value);
                }
            });

        return this;
    }

    public override rpush(values: T | T[]): this {
        this.toArray(values)
            .forEach((value: T) => {
                if (!this.has(value)) {
                    this._values.push(value);
                }
            });

        return this;
    }

    public override insert(values: T | T[], index: number): this {
        this.toArray(values)
            .reverse()
            .forEach((value: T) => {
                if (!this.has(value)) {
                    this._values.splice(index, 0, value);
                }
            });

        return this;
    }

}
