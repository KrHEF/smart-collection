import {ExecCollection} from '../collection/exec-collection.class';
import {Person} from './person.class';

export class PersonCollection extends ExecCollection<Person> {

    public showName(): this {
        this._values.map((p: Person) => p.showName());
        return this;
    }

    public getNames(): string[] {
        return this._values.map((p: Person) => p.getName());
    }
}
