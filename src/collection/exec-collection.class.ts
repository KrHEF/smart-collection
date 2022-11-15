import {AbstractCollection} from './abstract-collecion.class';

type TCallFunc<T> = (value: T) => void;
type TFilterFunc<T> = (value: T) => boolean;

interface ICallMethod<T> {
    filter?: TFilterFunc<T>;
    call: TCallFunc<T>;
}

export abstract class ExecCollection<T> extends AbstractCollection<T> {

    /**
     * Returns new filtered collection
     */
    public filter(filterFunc: TFilterFunc<T>): this {
        const filteredValues: T[] = this._values.filter((value: T) => filterFunc(value));
        //@ts-ignore
        return new this.constructor(filteredValues);
    }

    public call(callFunc: TCallFunc<T>): this;
    public call(callFunc: ICallMethod<T>): this;
    public call(callFunc: TCallFunc<T> | ICallMethod<T>): this {
        if (!callFunc) { return this; }

        if (typeof(callFunc) === 'function') {
            this._values
                .forEach((value: T) => callFunc(value));
        } else if (typeof(callFunc.filter) === 'function') {
            this._values
                .filter((value: T) => callFunc.filter(value))
                .forEach((value: T) => callFunc.call(value));
        } else {
            this._values
                .forEach((value: T) => callFunc.call(value));
        }

        return this;
    }

    public first(callFunc: TCallFunc<T>): this {
        if (this.length) {
            callFunc(this._values[0]);
        }

        return this;
    }

    public last(callFunc: TCallFunc<T>): this {
        if (this.length) {
            callFunc(this._values[this.length - 1]);
        }

        return this;
    }

    public do(callFunc: () => void): this {
        callFunc();

        return this;
    }
}
