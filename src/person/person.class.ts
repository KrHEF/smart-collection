import {IPersonData} from '../interfaces/person.interface';

export class Person {

    protected _name: string;
    protected _age: number;

    constructor(people: IPersonData) {
        this._name = people.name;
        this._age = people.age;
    }

    public showName(): void {
        console.log(this._name);
    }

    public getName(): string {
        return this._name;
    }

    public get age(): number {
        return this._age;
    }
}
