import {SmartCollection} from '../collection/smart-collection.class';
import {Person} from './person.class';

export class PersonCollection extends SmartCollection<Person> {

    public showName(): this {
        this._values.map((p: Person) => p.showName());
        return this;
    }

    public getNames(): string[] {
        return this._values.map((p: Person) => p.getName());
    }
}
