import {SmartCollection} from '../collection/smart-collection.class';
import {Person} from './person.class';

export class PersonCollection extends SmartCollection<Person> {

    public showName(): this {
        this._values.map((p: Person) => p.showName());
        return this;
    }


    public getNames(): string[];
    public getNames(callFunc: (name: string) => void): this;
    public getNames(callFunc?: (name: string) => void): this | string[] {
        if (callFunc) {
            this._values.forEach((p: Person) => callFunc(p.getName()));
            return this;
        }
        return this._values.map((p: Person) => p.getName());
    }
}
