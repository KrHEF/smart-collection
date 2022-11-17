import {IPersonData} from './src/interfaces/person.interface';
import {Person} from './src/person/person.class';
import {PersonCollection} from './src/person/person.collection';
import {UniqueCollection} from './src/collection/unique-collection.class';
import { SmartCollection } from './src/collection/smart-collection.class';

const personsData: IPersonData[] = [
    {name: 'Vladlen', age: 25},
    {name: 'Elena', age: 17},
    {name: 'Ivan', age: 18},
    {name: 'Igor', age: 14},
    {name: 'Lisa', age: 32},
    {name: 'Irina', age: 23},
    {name: 'Oleg', age: 20},
];
const persons: Person[] = personsData.map((people: IPersonData): Person => new Person(people));


console.log('%c %s', 'font-weight: bold;', 'SmartCommection / Умная коллекция');
// Отсортировать по возврасту, показать имена и возвраст всех, затем только имена для 18+
const pc: PersonCollection = new PersonCollection(persons);
pc
.sort((a: Person, b: Person) => a.age - b.age)
.call((person: Person) => { console.log(`${person.getName()} - ${person.age}`)} )
.filter((person: Person) => person.age >= 18)
.showName()
.do(() => console.log(''));


console.log('%c %s', 'font-weight: bold;', 'SmartCommection / Умная коллекция');
// Тоже самое, без урезания коллекции
const pc1: PersonCollection = new PersonCollection(persons);
pc1
.sort((a: Person, b: Person) => a.age - b.age)
.call((person: Person) => { console.log(`${person.getName()} - ${person.age}`)} )
.call({
    filter: ((person: Person) => person.age >= 18),
    call: (person: Person) => { person.showName(); },
})
.do(() => console.log(''));


console.log('%c %s', 'font-weight: bold;', 'SmartCommection / Умная коллекция');
// Тоже самое через цикл for..of (без сортировки)
const pc2: PersonCollection = new PersonCollection(persons);
for (const person of pc2) {
    console.log(`${person.getName()} - ${person.age}`);
}
for (const person of pc2) {
    if (person.age >= 18) {
        person.showName();
    }
}
console.log('');


// UniqueCommection / Уникальная коллекция
console.log('%c %s', 'font-weight: bold;', 'UniqueCommection / Уникальная коллекция');
const uc: UniqueCollection<Person> = new UniqueCollection(persons);
uc
.rpush(persons)
.rpush(persons)
.call((person: Person) => { person.showName(); })
.do(() => console.log(''));


// SmartCommection с примитивами
console.log('%c %s', 'font-weight: bold;', 'SmartCommection с примитивами');
const scNumber: SmartCollection<number> = new SmartCollection([6, 5, 4]);
console.log(scNumber.values.toString());
scNumber.lpush([7, 8, 9]);
console.log(scNumber.values.toString());
scNumber.rpush([3, 2, 1]);
scNumber.rpush(0);
console.log(scNumber.values.toString());
console.log(
    scNumber
        .filter((value: Number) => value > 0)
        .sort()
        .values.toString(),
);
